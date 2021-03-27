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

        // console.log("this.data",this.data)
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

        const { graph, time, task} = this.configs

        // 处理和任务分析相关的逻辑
        this.dealTask(task)
        if(task.find.structure === 'dumb-bell'){
            console.log("----timesGraphs---dumb-bell-----",JSON.stringify(this.timeGraphs))
        }
        
        this.sumGraphs.nodes = Object.values(this.sumGraphs.nodes)
        this.sumGraphs.links = Object.values(this.sumGraphs.links)

        // 依据layout的配置去赋予位置信息
        this.dealLayout(graph.layout.chooseType ? graph.layout.chooseType : 'forceDirect')
        // 根据time中的是否选择了markLine而决定是否要去计算markLine的数据
        if(task.find.structure === 'dumb-bell'){
            console.log("--afterLayout--timesGraphs---dumb-bell-----",JSON.stringify(this.timeGraphs))
        }
        this.markLine = time.chooseTypes.indexOf('markLine') > -1
            ? u.getmarkLine(this.sumGraphs, this.timeGraphs, this.configs)
            : undefined
        // 根据配置信息中：样式，以及time，以及comparison信息，去设定样式
        u.setStyle(this.timeGraphs, this.sumGraphs, this.configs)
        console.log("--after-setStyle--timesGraphs---dumb-bell-----",JSON.stringify(this.timeGraphs))
        this.subGraphs = Object.values(this.timeGraphs).map((v) => ({
            links: Object.values(v.links),
            nodes: Object.values(v.nodes)
        }))
    }

    dealTask(task){
        // 依据配置，给数据赋予3种状态的信息。这个应该根据config去判断要不要赋予
        if(task.taskType === 'comparison'){
            //函数里面直接改了timeGraphs、sumGraphs
            if(task.basedType === 'structure'){
                this.dealCompareData([{ times: 'all', nodes: 'all', links: 'all', keyFrame: task.comparison.keyFrame }]) 
            }else if(task.basedType === 'attr'){
                u.dealCompareAttr(this.timeGraphs, task)
            }
        }else if(task.taskType === 'find'){
            //函数里面直接改了timeGraphs、sumGraphs
            u.getFindData(this.timeGraphs, this.configs, this.sumGraphs) //函数里面直接改了timeGraphs
        }
    }
    dealLayout(layout = 'forceDirect') {
        // 先根据sumGraphs获得布局信息
        if(layout === 'matrix'){
            u.matrixLayout(this.sumGraphs, this.timeGraphs,this.configs)
        }else if(layout === 'bipartite'){
            u.bipartiteLayout(this.sumGraphs, this.timeGraphs, this.configs)
        }else if(layout === 'oneMds'&&this.sumGraphs.nodes[0].value!==undefined){
            u.oneMdsLayout(this.sumGraphs, this.timeGraphs,this.configs)
        }else{  
            switch (layout){
                case 'forceDirect':
                    u.offLineLayout(this.sumGraphs, this.configs)
                    break
                case 'vertical':
                    u.verticalLayout(this.sumGraphs, this.configs)
                    break
                case 'circular':
                    u.circularLayout(this.sumGraphs, this.configs)
                    break
                case 'dagre':
                    u.dagreLayout(this.sumGraphs, this.configs)
                    break
                case 'mds':
                    u.mdsLayout(this.sumGraphs, this.configs)
                    break
                case 'grid':
                    u.gridLayout(this.sumGraphs, this.configs)
                    break 
                default:
                    u.offLineLayout(this.sumGraphs, this.configs)
            }
            // 将位置信息放入每个子图中，并根据time调整位置
            u.getGraphLayout(this.timeGraphs, this.sumGraphs, this.configs)
        }
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
