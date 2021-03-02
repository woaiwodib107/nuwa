// import { link, NetV } from './NetV'
import * as u from './dealfun'
import * as _lodash from 'lodash'
class DNetV {
    constructor() {
        this.elementsName = []
        this.nodeSet = new Set()
        this.linkSets = new Set()
        this.timeGraphs = {}
        this.timeGraphSet = {}
        this.markLine = undefined
    }
    initData(setData, setConfigs) {
        this.elementsName = ['nodes', 'links'] //元素：点、边
        // 建立从times到index的对象映射
        this.times = Object.fromEntries(setData.map((d, index) => [d.time, index])) //时间：key值
        this.configs = setConfigs
        this.oldData = setData
        this.data = _lodash.cloneDeep(setData)
        
        // 判断如果configs的time中如果选择了insert，就执行timeASnode，给graph添加代表时间的节点
        if(this.configs.time.chooseTypes.indexOf('insert') > -1){
            u.timeASnode(this.data)
        }

        // 建立最初数据结构
        let { timeGraphs, nodeSet, linkSet, timeGraphSet, sumGraphs } = u.getTimeId(
            this.data,
            this.times
        )

        this.timeGraphs = timeGraphs
        this.timeGraphSet = timeGraphSet
        this.sumGraphs = sumGraphs
        this.nodeSet = nodeSet
        this.linkSet = linkSet

        // 依据配置，给数据赋予3种状态的信息。这个应该根据config去判断要不要赋予
        if(this.configs.comparison.isOn){
            //函数里面直接改了timeGraphs、sumGraphs
            this.dealCompareData([{ times: 'all', nodes: 'all', links: 'all', keyFrame: this.configs.comparison.keyFrame }]) 
        }

        this.sumGraphs.nodes = Object.values(this.sumGraphs.nodes)
        this.sumGraphs.links = Object.values(this.sumGraphs.links)

        // 依据layout的配置去赋予位置信息
        this.dealLayout(this.configs.graph.layout.chooseType ? this.configs.graph.layout.chooseType : 'offLine')
        // console.log("------this.sumGraphs.----",this.sumGraphs)
        // 根据time中的是否选择了markLine而决定是否要去计算markLine的数据
        this.markLine = this.configs.time.chooseTypes.indexOf('markLine') > -1
            ? u.getmarkLine(this.sumGraphs, this.timeGraphs, this.configs)
            : undefined
        
        // 根据配置信息中：样式，以及time，以及comparison信息，去设定样式
        u.setStyle(this.timeGraphs, this.sumGraphs, this.configs)
        
        this.subGraphs = Object.values(this.timeGraphs).map((v) => ({
            links: Object.values(v.links),
            nodes: Object.values(v.nodes)
        }))
    }
    dealLayout(layout = 'offLine') {
        // 先根据sumGraphs获得布局信息
        // console.log("this.sumGraphs, this.configs", this.sumGraphs, this.configs)
        if (layout === 'offLine') {
            this.sumGraphs = u.offLineLayout(this.sumGraphs, this.configs) 
        }else if (layout === 'vertical') {
            this.sumGraphs = u.verticalLayout(this.sumGraphs, this.configs)
        }else if (layout === 'circular') {
            u.circularLayout(this.sumGraphs, this.configs)
            // this.sumGraphs = u.verticalLayout(this.sumGraphs, this.configs)
        }else if( layout === 'dagre') {
            u.dagreLayout(this.sumGraphs, this.configs)
        }
        // 将位置信息放入每个子图中，并根据time调整位置
        u.getGraphLayout(this.timeGraphs, this.sumGraphs, this.configs)
    }

    dealCompareData(configs) {
        configs.forEach((d) => {
            const { times, nodes, links, keyFrame } = d
            const timeSet = times === 'all' ? new Set(Object.keys(this.times)) : new Set(times)
            const nodeSet = nodes === 'all' ? this.nodeSet : new Set(nodes)
            const linkSet = links === 'all' ? this.linkSet : new Set(links)
            let timeGraphSet = {}
            // this.timeGraphSet中有的放到timeGraphSet中
            Object.keys(this.timeGraphSet).forEach((time) => {
                if (timeSet.has(time)) {
                    timeGraphSet[time] = this.timeGraphSet[time]
                }
            })
            // 给timeGraphs和sumGraphs赋予3种状态的信息
            u.getCompareData(
                timeGraphSet,
                nodeSet,
                linkSet,
                keyFrame,
                this.timeGraphs,
                this.sumGraphs,
                this.times
            ) //函数里面直接改了timeGraphs
        })
    } 

    // dealTimeEncode(groups, data, config) {}
    end(simulation) {
        return new Promise((resolve) => {
            simulation.on('end', resolve)
        })
    }
}

export default () => {
    const dnetv = new DNetV()
    return dnetv
}
