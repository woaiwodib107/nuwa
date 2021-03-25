import React from 'react'
import DataPanel from './components/dataPanel/dataPanel.js'
import TimePanel from './components/timePanel/timePanel.js'
import Preview from './components/preview/preview.js'
import TaskPanel from './components/taskPanel/taskPanel.js'
import GraphPanel from './components/graphPanel/graphPanel.js'
import ExampleBoard from './components/exampleBoard/exampleBoard.js'
import TemplatePanel from './components/templatePanel/templatePanel.js'
import { COMPARISON_CONFIG } from './util/defaultConfig.js'
import { connect } from "react-redux"
import { 
	setGraphData, 
} from './redux/graphData.redux.js'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: 'system',
            jsonfile: {},
            filename: '',
            graph: {
                // width: 250,
                // height: 250,
                eachWidth: 300,
                eachHeight: 300,
                margin: 30,
                layout: {
                    chooseType: 'bipartite',
                    vertical: {
                        yDistance: 40,
                        linkStyle: {
                            shape: 'curve'
                        }
                    },
                    offLine:{
    
                    },
                    onLine: {
            
                    },
                    bipartite: {
            
                    },
                    circular: {
            
                    },
                    dagre: {
    
                    },
                    mds: {

                    },
                    grid: {
                        rows: 4
                    },
                    matrix: {
                        
                    }
                },
                nodeStyle: {
                    shape: 'rect',
                    fillColor: '#ffffff',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 8,
                    strokeType: 'solid',
                    textColor: 'white',
                    opacity: 1
                },
                linkStyle: {
                    shape: 'line',
                    strokeColor: '#908F8F',
                    strokeType: 'solid',
                    strokeWidth: 2,
                    opacity: 1,
                    strokeDasharray: '3,3',
                    pointShape: 'rect',
                    pointFillColor: '#73C105',
                    pointOpacity: 1,
                    pointRadius: 8,
                    pointStrokeWidth:1,
                    pointStrokeColor: '#000000',
                    pointStrokeType: 'solid',
                }
            },
            time: {
                chooseTypes:[],
                timeLine: {
                    xDistance: 300,
                    yDistance: 0,
                    // 有可能只对节点进行该操作
                    element: 'all',
                    // 表示位置变换的函数，还有就是环状。。circular
                    type: 'linear'
                },
                insert: {
                    position:'bottom',
                    margin: 10,
                    nodeStyle: {
                        shape: 'circle',
                        fillColor: '#FF5F00',
                        strokeColor: '#000000',
                        strokeWidth: 1,
                        radius: 6,
                        strokeType: 'solid',
                        textColor: 'white',
                        opacity: 1
                    },
                    linkStyle: {
                        shape: 'curve',
                        strokeColor: '#FF5F00',
                        strokeType: 'solid',
                        strokeWidth: 1,
                        opacity: 1,
                        strokeDasharray: '3,3',
                        fillColor: '#ffffff',
                        radius: 8,
                    }
                },
                color: {
                    element: 'all',
                    startColor: '#FD8F8F',
                    endColor: '#90B5FB'
                },
                animation: {
                    speed: 1800
                },
                markLine: {
                    shape: 'line',
                    strokeType: 'dashed',
                    strokeColor: '#FD8F8F',
                    strokeWidth: 1,
                    strokeDasharray: '5,5',
                    opacity:1,
                },
                chart: {
                    type:'line'
                }
            },
            task: {
                // 任务类型有：comparison\find\filter
                taskType: 'find',
                basedType: 'attr',
                find:{
                    attr:'degree',
                    relation: '>=',
                    value: 3
                },
                comparison: {
                    chooseItem: 'stable-Node',
                    chooseTypes: COMPARISON_CONFIG,
                    attr: '',
                    // keyFrame可为上一帧、下一帧、具体某一帧
                    keyFrame: 'next',
                    elements: 'all',
                    appearNode: {
                        shape: 'rect',
                        fillColor: '#FD8F8F',
                        strokeColor: '#000000',
                        strokeWidth: 1,
                        strokeType: 'solid',
                        textColor: 'white',
                        radius: 8,
                        opacity: 1
                    },
                    stableNode: {
                        shape: 'circle',
                        fillColor: '#DAD5D5',
                        strokeColor: '#000000',
                        strokeWidth: 1,
                        radius: 6,
                        strokeType: 'solid',
                        textColor: 'white',
                        opacity: 1
                    },
                    disappearNode: {
                        shape: 'circle',
                        fillColor: '#90B5FB',
                        strokeColor: '#000000',
                        strokeWidth: 1,
                        radius: 8,
                        strokeType: 'solid',
                        textColor: 'white',
                        opacity: 1
                    },
                    appearLink: {
                        shape: 'curve',
                        strokeColor: '#FD8F8F',
                        strokeType: 'solid',
                        strokeWidth: 3,
                        opacity: 1,
                        strokeDasharray: '3,3',
                        fillColor: '#ffffff',
                        radius: 8,
                    },
                    stableLink: {
                        shape: 'line',
                        strokeColor: '#908F8F',
                        strokeType: 'solid',
                        strokeWidth: 1,
                        opacity: 1,
                        strokeDasharray: '3,3',
                        fillColor: '#ffffff',
                        radius: 8,
                    },
                    disappearLink: {
                        shape: 'curve',
                        strokeColor: '#90B5FB',
                        strokeType: 'solid',
                        strokeWidth: 3,
                        opacity: 1,
                        strokeDasharray: '3,3',
                        fillColor: '#ffffff',
                        radius: 8,
                    }
                }
            }
        }
    }
    handleSubmitFromGrammar = (file) => {
        if (!file) return
        this.setState({
            jsonfile: file.jsonData,
            filename: file.filename
        })
    }
    handleSubmitFromTemplate = (value) => {
        this.setState({
            ...value
        })
    }
    handleBoardSwitch = (value) => {
        if (this.state.board !== value) {
            this.setState({
                board: value
            })
        }
    }
    render() {
        return (
            <div className="board">
                <div className="window-header">
                    <div className="title"> DNet-G </div>
                    <div
                        className={`header-sub-title ${
                            this.state.board === 'system' ? 'header-sub-choose' : ''
                        }`}
                        onClick={() => this.handleBoardSwitch('system')}
                    >
                        System
                    </div>
                    <div className="header-sub-divide"></div>
                    <div
                        className={`header-sub-title ${
                            this.state.board === 'example' ? 'header-sub-choose' : ''
                        }`}
                        onClick={() => this.handleBoardSwitch('example')}
                    >
                        Example
                    </div>
                </div>
                {this.state.board === 'example' ? (
                    <ExampleBoard></ExampleBoard>
                ) : (
                    <div className="row">
                        <div className="col">
                            <DataPanel />
                            <GraphPanel/>
                        </div>
                        <div className="col">
                            <TimePanel/>
                        </div>
                        <div className="col">
                            <TaskPanel/>
                        </div>
                        <div className="col">
                            <TemplatePanel/>
                            <Preview/>
                        </div>
                    </div>
                )}
                <div id="g6-graph-container" style={{display:"none"}}></div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
	graphData: state.graphData
})

const mapDispatchToProps = {
	setGraphData,
} 

export default connect(mapStateToProps,mapDispatchToProps)(Board)