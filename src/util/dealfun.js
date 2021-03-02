import * as d3 from 'd3'
import { defaultConfigs } from './defaultConfig'
import * as assign from 'assign-deep'
import { getInsertPosition } from './dnetChart.js'
import * as _ from 'lodash'
import G6 from '@antv/g6'
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
        graph.nodes.forEach((node) => {
            const id = node.id
            const timeId = `${time}-${id}`
            const type = node.type ? node.type : 'ele'
            timeGraphs[time].nodes[id] = {
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
    const { eachWidth, eachHeight } = configs.graph
    const l = nodes.length
    let nodesObj = {}
    nodes.forEach((node, index) => {
        node.y = (eachHeight / l) * index
        node.x = 0
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)

    return sumGraphs
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
    const { eachWidth, eachHeight} = configs.graph
    var graph = new G6.Graph({
        container: 'g6-graph-container',
        width: eachWidth,
        height: eachHeight,
        // fitView: true,
        // fitViewPadding: 20,
        layout: {
            type: 'dagre',
            rankdir: 'TB',     
            nodeSize: [2,30],      
            nodesep: 1,             // 可选
            ranksep: 1,             // 可选
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
}

export const timeASnode = (graphs) => {
    // 建立时间节点，在每一个图中，与每个节点都建立连接
    graphs.forEach((graph) => {
        graph.nodes.forEach((node) => {
            const source = 'time'
            const target = node.id
            graph.links.push({ source, target, type: 'time' })
        })
        graph.nodes.push({ id: 'time', type: 'time' })
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
        .stop()
        .tick(10)
        .stop()
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
    return sumGraphs
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
    markLine = getLinkPathData(markLine)
    return markLine
}
export function getLinkPathData(markLine) {
    // const colorScale = d3.scaleOrdinal().domain(d3.range(nodeNum)).range(d3.schemeCategory10)
    // console.log('node2PathData', node2PathData)
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
            // color: colorScale[index]
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
    const isChooseColor = !!(configs.time.chooseTypes.indexOf('color') > -1)
    Object.values(timeGraphs).forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            if (node.type === 'time') {
                if (_.hasIn(configs.time.insert, 'nodeStyle')) {
                    node.style.nodeStyle = _.cloneDeep({
                        ...basicNodeStyle,
                        ...configs.time.insert.nodeStyle
                    })
                } else {
                    node.style.nodeStyle = _.cloneDeep(basicNodeStyle)
                }
                return
            }
            node.style.nodeStyle = basicNodeStyle
            // 如果用color编码了时间，则修改其填充颜色
            if (isChooseColor) {
                // 此处需要深复制
                node.style.nodeStyle = _.cloneDeep(basicNodeStyle)
                node.style.nodeStyle.fillColor = timeColorObj[node.time]
            }
            node.status.forEach((d) => {
                node.style[d] = _.cloneDeep(comparisonNode[d])
            })
        })
        Object.values(graph.links).forEach((link) => {
            if (link.type === 'time') {
                if (_.hasIn(configs.time.insert, 'linkStyle')) {
                    link.style.linkStyle = _.cloneDeep({
                        ...basicLinkStyle,
                        ...configs.time.insert.linkStyle
                    })
                } else {
                    link.style.linkStyle = _.cloneDeep(basicLinkStyle)
                }
                return
            }
            link.style.linkStyle = basicLinkStyle
            if (isChooseColor) {
                link.style.linkStyle = _.cloneDeep(basicLinkStyle)
                link.style.linkStyle.strokeColor = timeColorObj[link.time]
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
    const { eachWidth, eachHeight, margin } = configs.graph
    let { xDistance, yDistance } = configs.time.timeLine
    const layoutNodes = Object.fromEntries(nodes.map((d) => [d.id, d]))
    const layoutLinks = Object.fromEntries(links.map((d) => [d.id, d]))
    let timeGraphsValues = Object.values(timeGraphs)
    // const l = timeGraphsValues.length
    let newNodes = {}
    const tempElement = configs.time.timeLine.element
    timeGraphsValues.forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            // 将位置信息复制到各个子图上
            assign(node, layoutNodes[node.id])
            let { x, y, timeId, id } = node
            if (node.type === 'time' && configs.graph.layout.chooseType === 'offLine') {
                // 对代表time的节点的位置特殊处理
                const result = getInsertPosition(configs)
                node.x = result.x
                node.y = result.y
            }
            if (configs.time.chooseTypes.indexOf('timeLine') === -1) {
                xDistance = 0
                yDistance = 0
            }
            // 无论是否选中节点，margin偏移都是要的
            node.x += margin
            node.y += margin
            if (tempElement === 'node') {
                x = node.x
                y = node.y
                node.x = node.x + node.timeIndex * xDistance
                node.y = node.y + node.timeIndex * yDistance
            } else if (tempElement === 'link') {
                // 只是链接进行偏移.
                x = node.x + node.timeIndex * xDistance
                y = node.y + node.timeIndex * yDistance
            } else {
                // 都进行偏移
                node.x = node.x + node.timeIndex * xDistance
                node.y = node.y + node.timeIndex * yDistance
                x = node.x
                y = node.y
            }
            // 记录节点新的位置信息
            newNodes[node.timeId] = { timeId, x, y, id }
        })
    })
    timeGraphsValues.forEach((graph) => {
        Object.values(graph.links).forEach((link) => {
            assign(link, layoutLinks[link.id])
            link.source = graph.nodes[link.source.id]
            link.target = graph.nodes[link.target.id]
            if (configs.time.chooseTypes.indexOf('timeLine') > -1) {
                link.source = { ...newNodes[link.sourceTimeId] }
                link.target = { ...newNodes[link.targetTimeId] }
            }
        })
    })
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
