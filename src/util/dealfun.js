import * as d3 from 'd3'
import { defaultConfigs } from './defaultConfig'
import * as assign from 'assign-deep'
import { getInsertPosition } from './dnetChart.js'
import * as _ from 'lodash'
import G6 from '@antv/g6'
import { dsvFormat } from 'd3'
export const _intersection = (setA, setB) => {
    let intersection = new Set(setA)
    for (let elem of setA) {
        if (!setB.has(elem)) {
            intersection.delete(elem)
        }
    }
    return intersection
}
// setA 减去 setB
export const _difference = (setA, setB) => {
    let difference = new Set(setA)
    for (let elem of setB) {
        difference.delete(elem)
    }
    return difference
}
export const _union = (setA, setB) => {
    let union = new Set(setA)
    for (let elem of setB) {
        union.add(elem)
    }
    return union
}
export const getTimeId = (graphs, times) => {
    window.d3 = d3
    let timeGraphs = {}
    let nodeSet = new Set()
    let linkSet = new Set()
    let timeGraphSet = {}
    let sumGraphs = { nodes: {}, links: {} }
    const l = Object.keys(times).length

    graphs.forEach((graph) => {
        const time = graph.time
        const timeIndex = times[time]
        timeGraphSet[time] = { nodes: new Set(), links: new Set() }
        timeGraphs[time] = { nodes: {}, links: {} }
        let node2degree = {}
        graph.nodes.forEach((node) => {
            const id = node.id
            const timeId = `${time}-${id}`
            const type = node.type ? node.type : 'ele'
            timeGraphs[time].nodes[id] = {
                ...node,
                type,
                id,
                timeId,
                time,
                status: [],
                timeIndex,
                style: {}
            }
            timeGraphSet[time].nodes.add(id)
            nodeSet.add(id)
            if (!sumGraphs.nodes[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.nodes[id] = {
                    ...node,
                    id,
                    type,
                    existTimeIndex,
                    existTimes,
                    existStatus,
                    style: {}
                }
            }
            sumGraphs.nodes[id].existTimeIndex[times[time]] = 1
            sumGraphs.nodes[id].existTimes[times[time]] = time
        })
        graph.links.forEach((link) => {
            let { source, target } = link
            if (link.source < link.target) {
                source = link.target
                target = link.source
            }
            if (node2degree[source] == undefined) {
                node2degree[source] = 1
            } else {
                node2degree[source]++
            }
            if (node2degree[target] == undefined) {
                node2degree[target] = 1
            } else {
                node2degree[target]++
            }
            const id = `${source}-${target}`
            const timeId = `${time}-${id}`
            const type = link.type ? link.type : 'ele'
            const sourceTimeId = timeGraphs[time].nodes[source].timeId
            const targetTimeId = timeGraphs[time].nodes[target].timeId
            timeGraphs[time].links[id] = {
                id,
                type,
                timeId,
                source,
                target,
                sourceTimeId,
                targetTimeId,
                time,
                timeIndex,
                status: [],
                style: {}
            }
            linkSet.add(id)
            timeGraphSet[time].links.add(id)
            if (!sumGraphs.links[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.links[id] = {
                    id,
                    type,
                    source,
                    target,
                    existTimeIndex,
                    existTimes,
                    existStatus,
                    style: {}
                }
            }
            sumGraphs.links[id].existTimeIndex[times[time]] = 1
            sumGraphs.links[id].existTimes[times[time]] = time
        })
        // 给节点赋予度数属性
        for (let nodeId in timeGraphs[time].nodes) {
            timeGraphs[time].nodes[nodeId].degree = node2degree[nodeId]
        }
    })
    return { timeGraphs, nodeSet, linkSet, timeGraphSet, sumGraphs }
}

export function adjustLayout2Svg(nodes, links, width, height) {
    let minX = width,
        maxX = -1,
        minY = height,
        maxY = -1,
        ratio
    const margin = 10
    // ratio取x轴和y轴比较小的
    // 找到比例后，先调整节点的坐标，并记录映射值，再调整链接坐标
    nodes.forEach((node) => {
        if (node.x < minX) {
            minX = node.x
        }
        if (node.x > maxX) {
            maxX = node.x
        }
        if (node.y < minY) {
            minY = node.y
        }
        if (node.y > maxY) {
            maxY = node.y
        }
    })
    const ratioX = (maxX - minX) / (width - margin * 2)
    const ratioY = (maxY - minY) / (height - margin * 2)
    ratio = ratioX > ratioY ? ratioX : ratioY
    const translateX = minX - margin
    const translateY = minY - margin
    const nodeId2Coord = {}
    // console.log("ratioX,ratioY, ratio,minX,maxX,minY, maxY", ratioX,ratioY, ratio,minX,maxX,minY, maxY)
    nodes.forEach((node) => {
        // 平移
        node.x -= translateX
        node.y -= translateY
        // 放缩
        node.x = (node.x - margin) / ratio + margin
        node.y = (node.y - margin) / ratio + margin
        nodeId2Coord[node.id] = {
            x: node.x,
            y: node.y
        }
    })
    links.forEach((link) => {
        link.source.x = nodeId2Coord[link.source.id].x
        link.source.y = nodeId2Coord[link.source.id].y
        link.target.x = nodeId2Coord[link.target.id].x
        link.target.y = nodeId2Coord[link.target.id].y
    })
}

export const verticalLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const { eachWidth, eachHeight, margin } = configs.graph
    const l = nodes.length
    const step = (eachHeight - margin * 2) / l
    let nodesObj = {}
    nodes.forEach((node, index) => {
        node.y = step * index + margin
        node.x = eachWidth / 2
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
}

export const bipartiteLayout = (sumGraphs, timeGraphs, configs) => {
    // 处理总图的节点和链接位置
    let { nodes, links } = sumGraphs
    const { eachWidth, eachHeight, margin } = configs.graph
    const len = nodes.length
    const step = (eachHeight - margin * 2) / len
    let firstNodesObj = {}
    let secondNodesObj = {}
    let secondNodes = []
    nodes.forEach((node, index) => {
        node.y = step * index + margin
        node.x = margin
        firstNodesObj[node.id] = node
        let sNode = _.cloneDeep(node)
        sNode.x = eachWidth - margin
        sNode.id = `s-${node.id}`
        secondNodes.push(sNode)
        secondNodesObj[node.id] = sNode
    })
    while (secondNodes.length > 0) {
        let sNode = secondNodes.pop()
        nodes.push(sNode)
    }
    let sumRevertLinksArr = []
    const sumLinksArr = {}
    links.forEach((link) => {
        const souceId = link.source
        const targetId = link.target
        link.source = firstNodesObj[souceId]
        link.target = secondNodesObj[targetId]
        sumLinksArr[link.id] = link
        let sLink = _.cloneDeep(link)
        sLink.id = `s-${link.id}`
        sLink.source = firstNodesObj[targetId]
        sLink.target = secondNodesObj[souceId]
        sumLinksArr[sLink.id] = sLink
        sumRevertLinksArr.push(sLink)
    })
    // 复制一份总图链接
    while(sumRevertLinksArr.length>0){
        const sLink = sumRevertLinksArr.pop()
        links.push(sLink)
    }
    // 处理分帧图的数据
    let timeGraphsValues = Object.values(timeGraphs)
    timeGraphsValues.forEach((graph, graphIndex) => {
        // 1. 给该分帧图的点赋予和总图一样的坐标，与此同时复制一份分帧图的点，并改变其id和坐标
        let sNodesArr = []
        Object.values(graph.nodes).forEach((node) => {
            assign(node, firstNodesObj[node.id])
            let sNode = _.cloneDeep(node)
            sNode.x = eachWidth - margin
            sNode.id = `s-${node.id}`
            sNodesArr.push(sNode)
        })
        // 2. 将复制的点加入到graph中
        while (sNodesArr.length > 0) {
            let sNode = sNodesArr.pop()
            graph.nodes[sNode.id] = sNode
        }

        let subReverLinksArr=[]
        // 3. 根据总图链接的位置，调整分帧图链接的位置
        Object.values(graph.links).forEach((link) => {
            const revertLink = _.cloneDeep(link)
            assign(link, _.cloneDeep(sumLinksArr[link.id]))
            revertLink.id = `s-${link.id}`
            assign(revertLink, _.cloneDeep(sumLinksArr[revertLink.id]))
            subReverLinksArr.push(revertLink)
        })
        while(subReverLinksArr.length>0){
            const srLink = subReverLinksArr.pop()
            graph.links[srLink.id] = srLink
        }
    })

    //  平移节点、链接位置
    const tempElement = configs.time.timeLine.element
    if (configs.time.chooseTypes.indexOf('timeLine') > -1) {
        const graphLength = timeGraphsValues.length
        const positionTransMap = getTranslateMap(configs, graphLength)
        if (tempElement === 'node') {
            timeGraphsValues.forEach((graph, graphIndex) => {
                const { x: tranX, y: tranY } = positionTransMap[graphIndex]
                Object.values(graph.nodes).forEach((node) => {
                    node.x = node.x + tranX
                    node.y = node.y + tranY
                })
            })
        } else if (tempElement === 'link') {
            timeGraphsValues.forEach((graph, graphIndex) => {
                const { x: tranX, y: tranY } = positionTransMap[graphIndex]
                Object.values(graph.links).forEach((link) => {
                    link.source.x += tranX
                    link.target.x += tranX
                    link.source.y += tranY
                    link.target.y += tranY
                })
            })
        } else {
            timeGraphsValues.forEach((graph, graphIndex) => {
                const { x: tranX, y: tranY } = positionTransMap[graphIndex]
                Object.values(graph.nodes).forEach((node) => {
                    node.x = node.x + tranX
                    node.y = node.y + tranY
                })
                Object.values(graph.links).forEach((link) => {
                    link.source.x += tranX
                    link.target.x += tranX
                    link.source.y += tranY
                    link.target.y += tranY
                })
            })
        }
    }
}
export const dagreLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const gNodes = nodes.map((node) => {
        return {
            id: node.id
        }
    })
    const gEdges = links.map((link) => {
        return {
            source: link.source,
            target: link.target
        }
    })
    const data = {
        nodes: gNodes,
        edges: gEdges
    }
    const { eachWidth, eachHeight } = configs.graph
    var graph = new G6.Graph({
        container: 'g6-graph-container',
        width: eachWidth,
        height: eachHeight,
        // fitView: true,
        // fitViewPadding: 20,
        layout: {
            type: 'dagre',
            rankdir: 'TB',
            nodeSize: [2, 30],
            nodesep: 1, // 可选
            ranksep: 1 // 可选
        }
    })
    graph.data(data)
    graph.render()
    const { nodes: rNodes, edges: rLinks } = graph.cfg.data
    let nodesObj = {}
    nodes.forEach((node, i) => {
        node.x = rNodes[i].x
        node.y = rNodes[i].y
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
}

export const oneMdsLayout = (sumGraphs, timeGraphs, configs) => {
    const { eachWidth, eachHeight, margin } = configs.graph
    const { xDistance, yDistance} = configs.time.timeLine
    let { nodes } = sumGraphs
    // 总图的x是居中，y是按value值比例分布。
    // 分帧图是x会产生平移，y也是按比例分布。两者的y坐标都得按比例求
    let valueArr = []
    Object.values(timeGraphs).forEach((graph,graphIndex)=>{
        Object.values(graph.nodes).forEach((node) => {
            valueArr.push(node.value)
        })
    })
    // 建立比例尺，循环nodes赋予节点的y坐标
    const value2y = d3
        .scaleLinear()
        .domain(d3.extent(valueArr))
        .range([margin, eachHeight - margin])
    
    nodes.forEach((node)=>{
        node.x = eachWidth/2
        node.y = value2y(node.value)
    })

    Object.values(timeGraphs).forEach((graph,graphIndex)=>{
        Object.values(graph.nodes).forEach((node) => {
            node.x = eachWidth/2+graphIndex*xDistance
            node.y = value2y(node.value) + graphIndex*yDistance
        })
    })
}

export const mdsLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const gNodes = nodes.map((node) => {
        return {
            id: node.id
        }
    })
    const gEdges = links.map((link) => {
        return {
            source: link.source,
            target: link.target
        }
    })
    const data = {
        nodes: gNodes,
        edges: gEdges
    }
    const { eachWidth, eachHeight, margin } = configs.graph
    var graph = new G6.Graph({
        container: 'g6-graph-container',
        width: eachWidth,
        height: eachHeight,
        // fitView: true,
        // fitViewPadding: 20,
        layout: {
            type: 'mds'
        }
    })
    graph.data(data)
    graph.render()
    const { nodes: rNodes, edges: rLinks } = graph.cfg.data
    let nodesObj = {}
    nodes.forEach((node, i) => {
        node.x = rNodes[i].x
        node.y = rNodes[i].y
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
}

export const gridLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const gNodes = nodes.map((node) => {
        return {
            id: node.id
        }
    })
    const gEdges = links.map((link) => {
        return {
            source: link.source,
            target: link.target
        }
    })
    const data = {
        nodes: gNodes,
        edges: gEdges
    }
    const { eachWidth, eachHeight, margin, layout } = configs.graph
    var graph = new G6.Graph({
        container: 'g6-graph-container',
        width: eachWidth,
        height: eachHeight,
        // fitView: true,
        // fitViewPadding: 20,
        layout: {
            type: 'grid',
            begin: [0, 0], // 可选，
            condense: false, // 可选
            rows: layout.grid.rows, // 可选
            sortBy: 'degree'
        }
    })
    graph.data(data)
    graph.render()
    const { nodes: rNodes, edges: rLinks } = graph.cfg.data
    let nodesObj = {}
    nodes.forEach((node, i) => {
        node.x = rNodes[i].x
        node.y = rNodes[i].y
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
}

export const circularLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const gNodes = nodes.map((node) => {
        return {
            id: node.id
        }
    })
    const gEdges = links.map((link) => {
        return {
            source: link.source,
            target: link.target
        }
    })
    const data = {
        nodes: gNodes,
        edges: gEdges
    }
    const { eachWidth, eachHeight, margin } = configs.graph
    const radius = Math.min(eachWidth, eachHeight) / 2
    var graph = new G6.Graph({
        container: 'g6-graph-container',
        width: radius * 2,
        height: radius * 2,
        // fitView: true,
        // fitViewPadding: 20,
        layout: {
            type: 'circular',
            radius: radius,
            center: [radius, radius]
        }
    })
    graph.data(data)
    graph.render()
    const { nodes: rNodes, edges: rLinks } = graph.cfg.data
    let nodesObj = {}
    nodes.forEach((node, i) => {
        node.x = rNodes[i].x
        node.y = rNodes[i].y
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
}

export const matrixLayout = (sumGraph, timeGraphs, configs) => {
    // nodes复制一份，links被画作node形式，先不管网格线
    let { nodes, links } = sumGraph
    const { eachWidth, eachHeight, margin } = configs.graph
    const width = eachWidth < eachHeight ? eachWidth : eachHeight
    const len = nodes.length
    const stepWidth = width / (len + 1)
    let startX = stepWidth / 2 + margin
    let startY = stepWidth / 2 + margin
    // 处理x轴的节点
    let nodeId2Xobj = {}
    nodes.forEach((node, index) => {
        node.y = startY
        node.x = startX + (index + 1) * stepWidth
        nodeId2Xobj[node.id] = { ...node }
    })

    // 处理y轴的节点
    let yNodes = _.cloneDeep(nodes)
    let nodeId2Yobj = {}
    yNodes.forEach((node, index) => {
        node.x = startX
        node.y = startY + (index + 1) * stepWidth
        nodeId2Yobj[node.id] = { ...node }
        node.id = `y-${node.id}`
        node.timeId = `y-${node.timeId}`
        // 存入node中
        nodes.push(node)
    })
    // 处理链接关系，一条链接在矩阵中会有两个对称的节点
    let linkId2xyNode = {}
    let linkId2yxNode = {}
    links.forEach((link, index) => {
        let linkNodeX2Y = {
            ...link,
            id: `x2y-link-${link.id}`,
            type: 'link-node',
            x: nodeId2Xobj[link.source].x,
            y: nodeId2Yobj[link.target].y
        }
        linkId2xyNode[link.id] = linkNodeX2Y
        let linkNodeY2X = {
            ...link,
            id: `y2x-link-${link.id}`,
            type: 'link-node',
            x: nodeId2Xobj[link.target].x,
            y: nodeId2Yobj[link.source].y
        }
        linkId2yxNode[link.id] = linkNodeY2X
        nodes.push(linkNodeX2Y)
        nodes.push(linkNodeY2X)
    })
    // 添加总图的辅助线。
    sumGraph.links = []
    const sumLinks = sumGraph.links
    for (let i = 0; i < len + 1; i++) {
        sumLinks.push({
            id: `x-grid-${i}`,
            type: 'grid-line',
            source: {
                x: margin,
                y: margin + (i + 1) * stepWidth
            },
            target: {
                x: margin + width,
                y: margin + (i + 1) * stepWidth
            },
            existTimeIndex: [],
            status: [],
            style: {}
        })
        sumLinks.push({
            id: `y-grid-${i}`,
            type: 'grid-line',
            source: {
                x: margin + (i + 1) * stepWidth,
                y: margin
            },
            target: {
                x: margin + (i + 1) * stepWidth,
                y: margin + width
            },
            existTimeIndex: [],
            status: [],
            style: {}
        })
    }

    // 根据配置、数据长度，拿到唯一的映射表。即每一帧图应该位移多少的映射数组。
    const graphLength = Object.values(timeGraphs).length
    const positionTransMap = getTranslateMap(configs, graphLength)
    // 1 根据总图节点拿到分帧图节点初始位置
    // 2 根据position函数调整位置
    // 3 复制三份节点，赋予初始位置，并根据position函数修改位置
    // 4 将三份节点也放入到分帧图中
    Object.values(timeGraphs).forEach((graph, graphIndex) => {
        const id2Xnode = {}
        const id2Ynode = {}
        const id2LinkNodeX2Y = {}
        const id2LinkNodeY2X = {}
        Object.values(graph.nodes).forEach((node) => {
            assign(node, nodeId2Xobj[node.id])
            // node.x = nodeId2Xobj[node.id].x
            // node.y = nodeId2Xobj[node.id].y

            // console.log("node,configs,positionTransMap[graphIndex]",node.x,node.y,configs,positionTransMap[graphIndex])
            applyPosition2Node(node, configs, positionTransMap[graphIndex])

            id2Xnode[node.id] = node
            let yNode = _.cloneDeep(node)
            assign(yNode, nodeId2Yobj[node.id])
            // yNode.x = nodeId2Yobj[node.id].x
            // yNode.y = nodeId2Yobj[node.id].y
            applyPosition2Node(yNode, configs, positionTransMap[graphIndex])
            yNode.id = `y-${node.id}`
            yNode.timeId = `y-${node.timeId}`
            id2Ynode[node.id] = yNode
        })

        // 得到链接节点
        Object.values(graph.links).forEach((link) => {
            let linkNodeX2Y = {
                ...link,
                id: `x2y-link-${link.id}`,
                type: 'link-node',
                x: id2Xnode[link.source].x,
                y: id2Ynode[link.target].y,
                existTimeIndex: linkId2yxNode[link.id].existTimeIndex,
                existTimes: linkId2yxNode[link.id].existTimes
            }
            id2LinkNodeX2Y[linkNodeX2Y.id] = linkNodeX2Y
            let linkNodeY2X = {
                ...link,
                type: 'link-node',
                id: `y2x-link-${link.id}`,
                x: id2Xnode[link.target].x,
                y: id2Ynode[link.source].y,
                existTimeIndex: linkId2yxNode[link.id].existTimeIndex,
                existTimes: linkId2yxNode[link.id].existTimes
            }
            id2LinkNodeY2X[linkNodeY2X.id] = linkNodeY2X
        })
        // 把节点加入节点中
        for (let key in id2Ynode) {
            graph.nodes[id2Ynode[key].id] = id2Ynode[key]
        }
        for (let id in id2LinkNodeX2Y) {
            graph.nodes[id] = id2LinkNodeX2Y[id]
        }
        for (let id in id2LinkNodeY2X) {
            graph.nodes[id] = id2LinkNodeY2X[id]
        }

        graph.links = {}
        const graphLinks = graph.links
        for (let i = 0; i < len + 1; i++) {
            const linkX = {
                id: `x-grid-${i}`,
                type: 'grid-line',
                source: {
                    x: margin,
                    y: margin + (i + 1) * stepWidth
                },
                target: {
                    x: margin + width,
                    y: margin + (i + 1) * stepWidth
                },
                existTimeIndex: [],
                status: [],
                style: {}
            }
            applyPosition2Link(linkX, configs, positionTransMap[graphIndex])
            graphLinks[linkX.id] = linkX
            const linkY = {
                id: `y-grid-${i}`,
                type: 'grid-line',
                source: {
                    x: margin + (i + 1) * stepWidth,
                    y: margin
                },
                target: {
                    x: margin + (i + 1) * stepWidth,
                    y: margin + width
                },
                existTimeIndex: [],
                status: [],
                style: {}
            }
            applyPosition2Link(linkY, configs, positionTransMap[graphIndex])
            graphLinks[linkY.id] = linkY
        }
    })
}

export const getTranslateMap = (configs, len) => {
    if (configs.time.chooseTypes.indexOf('timeLine') === -1) {
        return []
    }
    let { xDistance, yDistance, element, type } = configs.time.timeLine
    const result = []
    if (type === 'circular') {
        const tNodes = []
        const tLinks = []
        for (let i = 0; i < len; i++) {
            tNodes.push({
                id: i + ''
            })
            tLinks.push({
                source: i + '',
                target: i + 1 == len ? `${i - 2}` : `${i + 1}`
            })
        }
        const data = {
            nodes: tNodes,
            edges: tLinks
        }
        const { eachWidth, eachHeight, margin } = configs.graph
        const eachDis = eachWidth < eachHeight ? eachWidth : eachHeight
        let radius = (eachDis * len) / 5
        var graph = new G6.Graph({
            container: 'g6-graph-container',
            width: radius * 2,
            height: radius * 2,
            // fitView: true,
            // fitViewPadding: 20,
            layout: {
                type: 'circular',
                radius: radius,
                center: [radius, radius]
            }
        })
        graph.data(data)
        graph.render()
        const { nodes: rNodes } = graph.cfg.data
        rNodes.forEach((rNode, index) => {
            result.push({
                x: rNode.x,
                y: rNode.y
            })
        })
    } else {
        for (let i = 0; i < len; i++) {
            result.push({
                x: i * xDistance,
                y: i * yDistance
            })
        }
    }
    return result
}
export const applyPosition2Link = (link, configs, posTranslate) => {
    if (configs.time.chooseTypes.indexOf('timeLine') === -1) {
        return
    }
    let { element } = configs.time.timeLine
    if (element !== 'node') {
        applyPosition2Node(link.source, configs, posTranslate)
        applyPosition2Node(link.target, configs, posTranslate)
    }
}

export const applyPosition2Node = (node, configs, posTranslate) => {
    if (configs.time.chooseTypes.indexOf('timeLine') === -1) {
        return
    }
    node.x += posTranslate.x
    node.y += posTranslate.y
}

export const timeASnode = (graphs) => {
    // 建立时间节点，在每一个图中，与每个节点都建立连接
    graphs.forEach((graph) => {
        graph.nodes.forEach((node) => {
            const source = `time-${graph.time}`
            const target = node.id
            graph.links.push({ source, target, type: 'time' })
        })
        graph.nodes.push({ id: `time-${graph.time}`, type: 'time' })
    })
}
export const offLineLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const { eachWidth, eachHeight } = configs.graph
    d3.forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(eachWidth / 2, eachHeight / 2))
        // .stop()
        .tick(40)
        .stop()
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
}
export const assignConfigs = (setConfigs) => {
    let configs = _.cloneDeep(setConfigs)
    let sumConfigs = {}
    assign(sumConfigs, defaultConfigs.basic)
    Object.keys(defaultConfigs).forEach((key) => {
        sumConfigs[key] = {}
    })
    Object.keys(configs).forEach((key) => {
        let encoding = configs[key]
        if (typeof encoding === 'string') {
            //timeLine
            if (key in defaultConfigs) {
                sumConfigs[key][encoding] = _.cloneDeep(defaultConfigs[key][encoding])
            } else {
                sumConfigs[key] = encoding
            }
        } else {
            if (_.isArray(encoding)) {
                // time: ['timeLine', 'insert', 'markLine'],
                encoding.forEach((e) => {
                    if (typeof e === 'string') {
                        sumConfigs[key][e] = _.cloneDeep(defaultConfigs[key][e])
                    } else {
                        const e1 = Object.keys(e)[0]
                        sumConfigs[key][e1] = _.cloneDeep(defaultConfigs[key][e1])
                        assign(sumConfigs[key], e)
                    }
                })
            } else {
                const e = Object.keys(encoding)[0]
                sumConfigs[key][e] = _.cloneDeep(defaultConfigs[key][e])
                assign(sumConfigs[key], encoding)
            }
        }
    })
    if ('layout' in sumConfigs) {
        sumConfigs.layoutName = Object.keys(sumConfigs.layout)[0]
    }
    console.log(defaultConfigs.time.timeLine.element)
    return sumConfigs
}
export const getmarkLine = (sumGraphs, timeGraphs, configs) => {
    let markLine = {}
    if (configs.time.timeLine.element === 'link') {
        // 处理只平移链接的情况
        Object.values(sumGraphs.nodes).forEach((node) => {
            const { id, existTimes } = node
            markLine[id] = []
            existTimes.forEach((time) => {
                if (time !== '') {
                    const { tx: x, ty: y } = timeGraphs[time].nodes[id]
                    const l = markLine[id].length
                    if (l) {
                        markLine[id][l - 1].target = { x, y }
                    }
                    markLine[id].push({ source: { x, y } })
                }
            })
            markLine[id].pop()
        })
    } else {
        Object.values(sumGraphs.nodes).forEach((node) => {
            const { id, existTimes } = node
            markLine[id] = []
            existTimes.forEach((time) => {
                if (time !== '') {
                    const { x, y } = timeGraphs[time].nodes[id]

                    const l = markLine[id].length
                    if (l) {
                        markLine[id][l - 1].target = { x, y }
                    }
                    markLine[id].push({ source: { x, y } })
                }
            })
            markLine[id].pop()
        })
    }

    markLine = getLinkPathData(markLine)
    return markLine
}
export function getLinkPathData(markLine) {
    var link = d3
        .linkHorizontal()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return d.y
        })
    const linkPathData = Object.keys(markLine).map((markId, index) => {
        const curveData = []
        markLine[markId].forEach((markLineItem) => {
            curveData.push(link(markLineItem))
        })
        return {
            id: markId,
            data: curveData
        }
    })
    return linkPathData
}
export const getPiePathColor = (len, startColor, endColor) => {
    //设置颜色比例尺
    // let colorScale
    // if (!startColor || !endColor) {
    //     colorScale = d3.scaleOrdinal().domain(d3.range(len)).range(d3.schemeCategory10)
    // } else {
    // console.log("d3.range(len)", d3.range(len))
    const colorScale = d3
        .scaleLinear()
        .domain([0, len - 1])
        .range([startColor, endColor])
    // }
    return colorScale
}

function getChooseComparisonStyle(configs) {
    const tempComparison = configs.task.comparison
    const comparisonNode = _.cloneDeep({
        stableNode: tempComparison.stableNode,
        appearNode: tempComparison.appearNode,
        disappearNode: tempComparison.disappearNode
    })
    const basicNodeStyle = _.cloneDeep(configs.graph.nodeStyle)
    const comparisonLink = _.cloneDeep({
        appearLink: tempComparison.appearLink,
        stableLink: tempComparison.stableLink,
        disappearLink: tempComparison.disappearLink
    })
    const basicLinkStyle = _.cloneDeep(configs.graph.linkStyle)
    tempComparison.chooseTypes.forEach((v) => {
        delete basicNodeStyle[v]
        delete basicLinkStyle[v]
    })
    comparisonNode.stableNode = { ...comparisonNode.stableNode, ...basicNodeStyle }
    comparisonNode.appearNode = { ...comparisonNode.appearNode, ...basicNodeStyle }
    comparisonNode.disappearNode = { ...comparisonNode.disappearNode, ...basicNodeStyle }
    comparisonLink.appearLink = { ...comparisonLink.appearLink, ...basicLinkStyle }
    comparisonLink.stableLink = { ...comparisonLink.stableLink, ...basicLinkStyle }
    comparisonLink.disappearLink = { ...comparisonLink.disappearLink, ...basicLinkStyle }
    return {
        comparisonNode,
        comparisonLink
    }
}

export const setStyle = (timeGraphs, sumGraphs, configs) => {
    let timeColorObj = {}
    if (configs.time.chooseTypes.indexOf('color') > -1) {
        const times = Object.keys(timeGraphs)
        const l = times.length
        const colorScale = getPiePathColor(
            l,
            configs.time.color.startColor,
            configs.time.color.endColor
        )
        times.forEach((time, i) => {
            timeColorObj[time] = colorScale(i)
        })
    }
    const { comparisonNode, comparisonLink } = getChooseComparisonStyle(configs)
    const basicNodeStyle = configs.graph.nodeStyle
    const basicLinkStyle = configs.graph.linkStyle

    // 给总图节点添加基本样式
    let { nodes, links } = sumGraphs
    nodes.forEach((node) => {
        if (node.type === 'time') {
            node.style.nodeStyle = configs.time.insert.nodeStyle
        } else {
            node.style.nodeStyle = basicNodeStyle
        }
        if(Array.isArray(node.status)){
            node.status.forEach((d) => {
                if (!comparisonNode[d]) {
                    node.style[d] = _.cloneDeep(comparisonLink[d])
                } else {
                    node.style[d] = _.cloneDeep(comparisonNode[d])
                }
            })
        }
        if (node.type == 'link-node') {
            node.style.nodeStyle = {
                ...basicNodeStyle,
                fillColor: basicLinkStyle.pointFillColor,
                shape: basicLinkStyle.pointShape,
                opacity: basicLinkStyle.pointOpacity
            }
        }
    })
    links.forEach((link) => {
        if (link.type === 'time') {
            link.style.linkStyle = configs.time.insert.linkStyle
        } else {
            link.style.linkStyle = basicLinkStyle
        }
        if(Array.isArray(link.status)){
            link.status.forEach((d) => {
                // 该style是用于comparison这种方式
                link.style[d] = _.cloneDeep(comparisonLink[d])
            })
        }
    })

    const isChooseColor = !!(configs.time.chooseTypes.indexOf('color') > -1)
    Object.values(timeGraphs).forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            if (node.type === 'time') {
                node.style.nodeStyle = _.cloneDeep({
                    ...basicNodeStyle,
                    ...configs.time.insert.nodeStyle
                })
                node.status.forEach((d) => {
                    if (!comparisonNode[d]) {
                        node.style[d] = _.cloneDeep(comparisonLink[d])
                    } else {
                        node.style[d] = _.cloneDeep(comparisonNode[d])
                    }
                })
                return
            }
            node.style.nodeStyle = basicNodeStyle
            // 如果用color编码了时间，则修改其填充颜色
            // 处理matrix布局中的链接节点
            if (node.type == 'link-node') {
                node.style.nodeStyle = {
                    ...basicNodeStyle,
                    fillColor: basicLinkStyle.pointFillColor
                        ? basicLinkStyle.pointFillColor
                        : '#73C105',
                    shape: basicLinkStyle.pointShape ? basicLinkStyle.pointShape : 'rect',
                    opacity: basicLinkStyle.pointOpacity ? basicLinkStyle.pointOpacity : 0.8
                }
            }
            if (isChooseColor) {
                // 此处需要深复制
                node.style.nodeStyle = _.cloneDeep(node.style.nodeStyle)
                node.style.nodeStyle.fillColor = timeColorObj[node.time]
            }
            node.status.forEach((d) => {
                if (!comparisonNode[d]) {
                    node.style[d] = _.cloneDeep(comparisonLink[d])
                } else {
                    node.style[d] = _.cloneDeep(comparisonNode[d])
                }
            })
        })
        Object.values(graph.links).forEach((link) => {
            if (link.type === 'time') {
                link.style.linkStyle = _.cloneDeep({
                    ...basicLinkStyle,
                    ...configs.time.insert.linkStyle
                })
                return
            }
            link.style.linkStyle = basicLinkStyle
            if (isChooseColor) {
                link.style.linkStyle = _.cloneDeep(basicLinkStyle)
                if (timeColorObj[link.time]) {
                    link.style.linkStyle.strokeColor = timeColorObj[link.time]
                }
            }
            link.status.forEach((d) => {
                // 该style是用于comparison这种方式
                link.style[d] = _.cloneDeep(comparisonLink[d])
            })
        })
    })
}

export const getGraphLayout = (timeGraphs, sumGraphs, configs) => {
    let { nodes, links } = sumGraphs

    const { margin } = configs.graph
    const layoutNodes = Object.fromEntries(nodes.map((d) => [d.id, d]))
    const layoutLinks = Object.fromEntries(links.map((d) => [d.id, d]))
    let timeGraphsValues = Object.values(timeGraphs)

    const isChangeInsertPosition =
        configs.time.chooseTypes.indexOf('insert') > -1 &&
        configs.time.insert.position !== 'origin' &&
        configs.graph.layout.chooseType !== 'matrix'
    if (isChangeInsertPosition) {
        // 改变总图数据中time类型节点的位置
        let timeNodeResult = {}
        for (let node of nodes) {
            if (node.type === 'time') {
                timeNodeResult = getInsertPosition(configs)
                node.x = timeNodeResult.x
                node.y = timeNodeResult.y
            }
        }
        // 改变总图数据中time类型链接的位置
        for (let link of links) {
            if (link.type === 'time') {
                if (link.source.type === 'time') {
                    link.source.x = timeNodeResult.x
                    link.source.y = timeNodeResult.y
                } else {
                    link.target.x = timeNodeResult.x
                    link.target.y = timeNodeResult.y
                }
            }
        }
    }
    // 根据配置调整各帧图的位置
    let newNodes = {}
    const tempElement = configs.time.timeLine.element
    const graphLength = timeGraphsValues.length
    const positionTransMap = getTranslateMap(configs, graphLength)
    timeGraphsValues.forEach((graph, graphIndex) => {
        Object.values(graph.nodes).forEach((node) => {
            // 将总图的位置信息复制到各个子图对应节点上
            assign(node, layoutNodes[node.id])
            let { x, y, timeId, id } = node
            // 无论是否选中节点，margin偏移都是要的
            node.x += margin
            node.y += margin
            if (configs.time.chooseTypes.indexOf('timeLine') > -1) {
                const { x: tranX, y: tranY } = positionTransMap[graphIndex]
                if (tempElement === 'node') {
                    x = node.x
                    y = node.y
                    node.x = node.x + tranX
                    node.y = node.y + tranY
                } else if (tempElement === 'link') {
                    // 只是链接进行偏移.
                    x = node.x + tranX
                    y = node.y + tranY
                    node.tx = x
                    node.ty = y
                } else {
                    // 都进行偏移
                    node.x = node.x + tranX
                    node.y = node.y + tranY
                    x = node.x
                    y = node.y
                }
            } else {
                x = node.x
                y = node.y
            }
            // 记录偏移后链接端点的位置信息
            newNodes[node.timeId] = { timeId, x, y, id }
        })
    })
    // 根据节点坐标调整链接坐标
    timeGraphsValues.forEach((graph) => {
        Object.values(graph.links).forEach((link) => {
            assign(link, layoutLinks[link.id])
            link.source = { ...newNodes[link.sourceTimeId] }
            link.target = { ...newNodes[link.targetTimeId] }
        })
    })
    // 调整总图sumGraphs的图面边距
    const id2xy = {}
    for (let node of nodes) {
        node.x += margin
        node.y += margin
        id2xy[node.id] = {
            x: node.x,
            y: node.y
        }
    }
    // 调整总图link的边距
    // links的各个link端点之间有重复，
    // 且存在重复引用。因此不能直接给各个link的端点加margin
    for (let link of links) {
        link.source.x = id2xy[link.source.id].x
        link.source.y = id2xy[link.source.id].y
        link.target.x = id2xy[link.target.id].x
        link.target.y = id2xy[link.target.id].y
    }
    return timeGraphs
}
export const getComparison = () => {}
export const _dealCompare = (graph, compareGraph, nodeSet, linkSet) => {
    const appearNodes = _intersection(_difference(graph.nodes, compareGraph.nodes), nodeSet)
    const disappearNodes = _intersection(_difference(compareGraph.nodes, graph.nodes), nodeSet)
    const stableNodes = _intersection(_intersection(graph.nodes, compareGraph.nodes), nodeSet)
    const appearLinks = _intersection(_difference(graph.links, compareGraph.links), linkSet)
    const disappearLinks = _intersection(_difference(compareGraph.links, graph.links), linkSet)
    const stableLinks = _intersection(_intersection(graph.links, compareGraph.links), linkSet)
    return {
        appear: { nodes: appearNodes, links: appearLinks },
        disappear: { nodes: disappearNodes, links: disappearLinks },
        stable: { nodes: stableNodes, links: stableLinks }
    }
}

export const getCompareData = (
    timeGraphSet,
    nodeSet,
    linkSet,
    keyFrame,
    timeGraphs,
    sumGraphs,
    times
) => {
    const timeArr = Object.keys(timeGraphSet)
    let result = Object.fromEntries(timeArr.map((time) => [time, {}]))
    if (keyFrame === 'last') {
        // 上一帧
        timeArr.forEach((time, index) => {
            // forEach中使用return终端本次循环，并不是所有的。相当于for中的continue
            if (index === 0) return
            const graphSet = timeGraphSet[time]
            const lastTime = timeArr[index - 1]
            const lastGraphSet = timeGraphSet[lastTime]
            const { appear, disappear, stable } = _dealCompare(
                graphSet,
                lastGraphSet,
                nodeSet,
                linkSet
            )
            result[time].appear = appear
            result[lastTime].disappear = disappear
            result[lastTime].stable = stable
        })
    } else if (keyFrame === 'next') {
        // 下一帧
        timeArr.forEach((time, index) => {
            if (index === timeArr.length - 1) return
            const graphSet = timeGraphSet[time]
            const nextTime = timeArr[index + 1]
            const nextGraphSet = timeGraphSet[nextTime]
            const { appear, disappear, stable } = _dealCompare(
                nextGraphSet,
                graphSet,
                nodeSet,
                linkSet
            )
            result[nextTime].appear = appear
            result[time].disappear = disappear
            result[time].stable = stable
        })
    } else {
        // 具体到某一帧
        timeArr.forEach((time) => {
            const graphSet = timeGraphSet[time]
            result[time] = _dealCompare(graphSet, timeGraphSet[keyFrame], nodeSet, linkSet)
        })
    }

    // 最外层的循环是以time为维度，循环
    timeArr.forEach((time) => {
        // 是3种状态：appear\disappear\stable为维度进行循环
        Object.keys(result[time]).forEach((status) => {
            const { nodes, links } = result[time][status]
            nodes.forEach((id) => {
                const s = status + 'Node'
                timeGraphs[time].nodes[id].status.push(s)
                sumGraphs.nodes[id].existStatus[times[time]].push(s)
            })
            links.forEach((id) => {
                const s = status + 'Link'
                timeGraphs[time].links[id].status.push(s)
                sumGraphs.links[id].existStatus[times[time]].push(s)
            })
        })
        Object.values(timeGraphs[time].nodes).forEach((node) => {
            if (!node.status.length) {
                node.status.push('stableNode')
                sumGraphs.nodes[node.id].existStatus[times[time]].push('stableNode')
            }
        })
        Object.values(timeGraphs[time].links).forEach((link) => {
            if (!link.status.length) {
                link.status.push('stableLink')
                sumGraphs.links[link.id].existStatus[times[time]].push('stableLink')
            }
        })
    })
    return timeGraphs
}

export const getShortestDistance = (matrix, start) => {
    const rows = matrix.length,//rows和cols一样，其实就是顶点个数
        cols = matrix[0].length
 
    if(rows !== cols || start >= rows) return new Error("邻接矩阵错误或者源点错误")
 
    //初始化distance
    let distance = new Array(rows).fill(Infinity)
    // 记录逐渐加入点集的过程
    // 初始化访问节点
    let visited = new Array(rows).fill(false)
    distance[start] = 0
    for(let i = 0; i < rows; i++) {
        // 更新节点访问
        visited[start] = true
        // 达到不了的顶点不能作为中转跳点\
        for(let j = 0; j < cols; j++) {
            //通过比较distance[start] + matrix[start][j]和distance[j]的大小来决定是否更新distance[j]。
            if(matrix[start][j]!==0&&(matrix[start][j] + distance[start] < distance[j])) {
                distance[j] = matrix[start][j] + distance[start]
            }
        }
        
        // 找到当前最短路径顶点作为中转跳点
        let minIndex = -1;
        let min = Infinity;
        for(let k = 0; k < rows; k++) {
            if ((!visited[k]) && distance[k] < min) {
                min = distance[k];
                minIndex = k;
            }
        }
        
        if(minIndex!==-1){
            start = minIndex
        }else{
            break
        }
    }
    return distance;
}

export const getShortestPath = (matrix, startIndex, endIndex)=>{
    let visited = new Array(matrix.length).fill(false);
    let shortestPath = []
    let shortestDistance = Infinity
    let distance = 0
    let tempPath = []
    visited[startIndex] = true
    tempPath.push(startIndex)
    function Dfs(startIndex){
        for(let i=0;i<matrix[startIndex].length;i++){
            if(visited[i]===false&&matrix[startIndex][i]===1){
                distance++
                tempPath.push(i)
                visited[i]=true
                if(i === endIndex){
                    if(distance<shortestDistance){
                        shortestDistance = distance
                        shortestPath = [...tempPath]
                    }
                }else{
                    Dfs(i)
                }
                distance--
                visited[i] = false
                tempPath.pop()
            }
        }
    }
    Dfs(startIndex)
    return shortestPath
}

export const getLongestPath = (matrix, startIndex, endIndex)=>{
    let visited = new Array(matrix.length).fill(false);
    let shortestPath = []
    let shortestDistance = Infinity
    let distance = 0
    let tempPath = []
    visited[startIndex] = true
    tempPath.push(startIndex)
    function Dfs(startIndex){
        for(let i=0;i<matrix[startIndex].length;i++){
            if(visited[i]===false&&matrix[startIndex][i]===1){
                distance++
                tempPath.push(i)
                visited[i]=true
                if(i === endIndex){
                    if(distance<shortestDistance){
                        shortestDistance = distance
                        shortestPath = [...tempPath]
                    }
                }else{
                    Dfs(i)
                }
                distance--
                visited[i] = false
                tempPath.pop()
            }
        }
    }
    Dfs(startIndex)
    return shortestPath
}

export const getFindData = (timeGraphs, configs,sumGraphs) => {
    const findOptions = configs.task.find
    if (configs.task.basedType === 'structure') {
        if(findOptions.structure === 'dumb-bell'){
            // 找结构，现在是假定是找这种类似于哑铃的形态结构。
            for (let timeId in timeGraphs) {
                const graph = timeGraphs[timeId]
                for (let linkId in graph.links) {
                    const link = graph.links[linkId]
                    if (
                        graph.nodes[link.source].degree === 1 &&
                        graph.nodes[link.target].degree === 1
                    ) {
                        link.status.push('appearLink')
                        graph.nodes[link.source].status.push('appearNode')
                        graph.nodes[link.target].status.push('appearNode')
                    }
                }
            }
        }else if(findOptions.structure==='shortest-path'){
            let startIndex = 0
            const mapId2Index = {}
            const mapIndex2Id = []
            const {nodes, links} = sumGraphs
            Object.values(nodes).forEach((node)=>{
                if(mapId2Index[node.id]===undefined){
                    mapId2Index[node.id] = startIndex
                    mapIndex2Id[startIndex] = node.id
                    startIndex ++
                }
            })
            let matrix = new Array(startIndex)
            for(let i=0;i<matrix.length;i++){
                matrix[i] = new Array(startIndex).fill(0)
            }
            Object.values(links).forEach((link)=>{
                let sourceIndex = mapId2Index[link.source]
                let targetIndex = mapId2Index[link.target]
                matrix[sourceIndex][targetIndex] = 1
                matrix[targetIndex][sourceIndex] = 1
            })
            let sIndex =0 ,eIndex = 0
            let dis = -1
            for(let i=0;i<startIndex;i++){
                const distanceArr = getShortestDistance(matrix, i)
                // 求出单源最短路径中的最长的那一个
                let endIndex = i 
                let maxDistance = distanceArr[i]
                distanceArr.forEach((v,index)=>{
                    if(v!==Infinity&&v>maxDistance){
                        endIndex = index
                        maxDistance = v
                    }
                })
                if(maxDistance>dis){
                    dis = maxDistance
                    sIndex = i
                    eIndex = endIndex
                }
            }

            const shortestPath = getShortestPath(matrix,sIndex,eIndex)
            const nodeInPathMap = {}
            const linkInPathMap = {}
            shortestPath.forEach((v,i)=>{
                const aId = mapIndex2Id[v]
                nodeInPathMap[aId] = true
                if(i!==0){
                    const bId = mapIndex2Id[shortestPath[i-1]]
                    linkInPathMap[`${aId}-${bId}`] = true
                    linkInPathMap[`${bId}-${aId}`] = true
                }
            })

            // 修改总图中的状态
            for(let linkId in links){
                if(linkInPathMap[linkId]===true){
                    links[linkId].status = ['appearLink']
                }
            }
            for(let nodeId in nodes) {
                if(nodeInPathMap[nodeId] === true){
                    nodes[nodeId].status = ['appearNode']
                }
            }

            // 修改分帧图中的状态
            for (let timeId in timeGraphs) {
                const graph = timeGraphs[timeId]
                for (let linkId in graph.links) {
                    if(linkInPathMap[linkId]===true){
                        graph.links[linkId].status.push('appearLink')
                    }
                }
                for(let nodeId in graph.nodes) {
                    if(nodeInPathMap[nodeId] === true){
                        graph.nodes[nodeId].status.push('appearNode')
                    }
                }
            }
        }      
    } else {
        const { attr, relation, value } = findOptions
            ? findOptions
            : {
                  attr: 'degree',
                  relation: '>=',
                  value: 3
              }
        for (let timeId in timeGraphs) {
            const graph = timeGraphs[timeId]
            for (let nodeId in graph.nodes) {
                const node = graph.nodes[nodeId]
                switch (relation) {
                    case '>=':
                        if (node[attr] >= value) {
                            node.status.push('appearNode')
                        }
                        break
                    case '=':
                        if (node[attr] == value) {
                            node.status.push('appearNode')
                        }
                        break
                    case '<=':
                        if (node[attr] <= value) {
                            node.status.push('appearNode')
                        }
                        break
                }
            }
        }
    }
}

export const compareTwoFrameAboutAttr = (localFrame, compareFrame) => {
    const compareNodesDegree = {}
    for (let nodeId in compareFrame.nodes) {
        compareNodesDegree[nodeId] = compareFrame.nodes[nodeId].degree
    }
    for (let nodeId in localFrame.nodes) {
        const localDegree = localFrame.nodes[nodeId].degree
        if (compareNodesDegree[nodeId] === undefined || compareNodesDegree[nodeId] < localDegree) {
            localFrame.nodes[nodeId].status.push('appearNode')
        } else if (compareNodesDegree[nodeId] === localDegree) {
            localFrame.nodes[nodeId].status.push('stableNode')
        } else if (compareNodesDegree[nodeId] > localDegree) {
            localFrame.nodes[nodeId].status.push('disappearNode')
        }
    }
}

export const dealCompareAttr = (timeGraphs, task) => {
    const timeArr = Object.keys(timeGraphs)
    const keyFrame = task.comparison.keyFrame
    if (keyFrame === 'last') {
        // 上一帧
        timeArr.forEach((time, index) => {
            // forEach中使用return终端本次循环，并不是所有的。相当于for中的continue
            if (index === 0) return
            compareTwoFrameAboutAttr(timeGraphs[time], timeGraphs[timeArr[index - 1]])
        })
    } else if (keyFrame === 'next') {
        // 下一帧
        timeArr.forEach((time, index) => {
            if (index === timeArr.length - 1) return
            compareTwoFrameAboutAttr(timeGraphs[time], timeGraphs[timeArr[index + 1]])
        })
    } else {
        // 具体到某一帧
        timeArr.forEach((time, index) => {
            if (index === keyFrame) {
                return
            }
            compareTwoFrameAboutAttr(timeGraphs[time], timeGraphs[timeArr[keyFrame]])
        })
    }
}
