import * as d3 from 'd3'

// 返回值是 {subgraphs, sumgraphs}
export function dealData(originData, width, height) {
    console.log('dealData---', width, height)
    const sumGraphs = getLayout(originData, width, height)
    const subGraphs = assignPos(originData, sumGraphs)
    return { sumGraphs, subGraphs }
}

// 将所有图的点和边合并到一起，求出每个点和边的相对布局位置
function getLayout(originData, width, height) {
    let nodes = []
    let links = []
    let nodeSets = new Set()
    let linkSets = new Set()
    originData.forEach((graph, i) => {
        graph.nodes.forEach((node) => {
            nodeSets.add(node.id)
        })
        graph.links.forEach((link, j) => {
            let { source, target } = link
            if (links.source < links.target) {
                source = link.target
                target = links.source
            }
            const id = `${source}-${target}`
            linkSets.add(id)
        })
    })
    nodeSets.forEach((id) => {
        nodes.push({ id })
    })
    linkSets.forEach((link) => {
        const s = link.split('-')
        const source = s[0]
        const target = s[1]
        links.push({ source, target })
    })
    d3.forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .tick(10)
        .stop()
    return { nodes, links }
}

// 给子图添加位置，给总图添加节点和链接随时间分布情况
function assignPos(originData, sumGraphs) {
    let idPos = {}
    // 建立从id到节点的映射
    sumGraphs.nodes.forEach((node) => {
        idPos[node.id] = node
    })
    let node2Array = {}
    let link2Array = {}
    // 每一个time下每个点的位置,同时新建图，每个node在不同时间下id不一样
    const subGraphs = originData.map((graph, index) => {
        const nodes = graph.nodes.map((node) => {
            const id = node.id
            const x = idPos[node.id].x
            const y = idPos[node.id].y
            const time = index
            if (!node2Array[id]) {
                node2Array[id] = new Array(index + 1).fill(0)
            } else {
                while (node2Array[id].length < index + 1) {
                    node2Array[id].push(0)
                }
            }
            node2Array[id][index] = 1
            return { id, x, y, time }
        })
        const links = graph.links.map((link) => {
            const sourcePos = idPos[link.source]
            const targetPos = idPos[link.target]
            const source = {
                id: link.source,
                x: sourcePos.x,
                y: sourcePos.y
            }
            const target = {
                id: link.target,
                x: targetPos.x,
                y: targetPos.y
            }
            const time = index
            const id = `${link.source}-${link.target}`
            if (!link2Array[id]) {
                link2Array[id] = new Array(index + 1).fill(0)
            } else {
                while (link2Array[id].length < index + 1) {
                    link2Array[id].push(0)
                }
            }
            link2Array[id][index] = 1
            return {
                source,
                target,
                time,
                id
            }
        })
        return { nodes, links }
    })

    const graphLength = originData.length
    for (let key in node2Array) {
        while (node2Array[key].length < graphLength) {
            node2Array[key].push(0)
        }
    }
    for (let key in link2Array) {
        while (link2Array[key].length < graphLength) {
            link2Array[key].push(0)
        }
    }
    sumGraphs.nodes.forEach((node) => {
        node.exsitStatus = node2Array[node.id]
    })
    sumGraphs.links.forEach((link) => {
        link.id = `${link.source.id}-${link.target.id}`
        link.exsitStatus = link2Array[link.id]
    })
    return subGraphs
}

// 将对象数据转化为数组数据
export function converObject2Array(data) {
    return Object.values(data).map((v) => {
        return {
            links: Object.values(v.links),
            nodes: Object.values(v.nodes)
        }
    })
}

// 求交集
function intersection(setA, setB) {
    let _intersection = new Set(setA)
    for (let elem of setA) {
        if (!setB.has(elem)) {
            _intersection.delete(elem)
        }
    }
    return _intersection
}

// setA 减去 setB
function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}
