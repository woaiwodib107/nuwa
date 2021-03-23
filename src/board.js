import React from 'react'
import Data from './components/data/data.js'
import TimePanel from './components/timePanel/timePanel.js'
import Grammar from './components/grammar.js'
import Preview from './components/preview/preview.js'
import TaskPanel from './components/taskPanel/taskPanel.js'
import GraphPanel from './components/graphPanel/graphPanel.js'
import LayoutPanel from './components/layoutPanel/layoutPanel.js'
import ExampleBoard from './components/exampleBoard/exampleBoard.js'
import TemplatePanel from './components/templatePanel/templatePanel.js'
import { COMPARISON_CONFIG } from './util/defaultConfig.js'

export default class Board extends React.Component {
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
                    chooseType: 'matrix',
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
                    fillColor: '#ffffff',
                    radius: 8,
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
                    type: 'circular'
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
                taskType: 'comparison',
                basedType: 'structure',
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
    handleSubmitFromData = (file) => {
        if (!file) return
        // console.log("handleSubmitFromData-file",file);
        this.setState({
            jsonfile: file.jsonData,
            filename: file.filename
        })
    }
    handleSubmitFromTask = (value) => {
        if (!value) return
        this.setState({
            task: {
                ...this.state.task,
                ...value
            }
        })
    }
    handleSubmitFromTime = (value) => {
        if (!value) return
        this.setState({
            time: {
                ...this.state.time,
                ...value
            }
        })
    }
    handleSubmitFromTemplate = (value) => {
        this.setState({
            ...value
        })
    }
    handleSubmitFromGraph = (value) => {
        this.setState({
            graph: {
                ...this.state.graph,
                ...value
            }
        })
    }
    handleSubmitFromLayout = (value) => {
        this.setState({
            layout: {
                ...this.state.layout,
                ...value
            }
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
        const combineConfigs = {
            basic: this.state.basic,
            time: this.state.time,
            layout: this.state.layout,
            comparison: this.state.comparison
        }
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
                            <Data onSubmit={this.handleSubmitFromData} />
                            <GraphPanel
                                options={this.state.graph}
                                onSubmit={this.handleSubmitFromGraph}
                            />
                        </div>
                        <div className="col">
                            <TimePanel
                                options={this.state.time}
                                onSubmit={this.handleSubmitFromTime}
                            />
                        </div>
                        <div className="col">
                            {/* <LayoutPanel
                                options={this.state.layout}
                                onSubmit={this.handleSubmitFromLayout}
                            /> */}
                            <TaskPanel
                                options={this.state.task}
                                onSubmit={this.handleSubmitFromTask}
                            />
                        </div>

                        <div className="col">
                            <TemplatePanel
                                data={this.state.jsonfile.graphs}
                                config={{
                                    graph: this.state.graph,
                                    task: this.state.task,
                                    time: this.state.time
                                }}
                                onSubmit={this.handleSubmitFromTemplate}
                            />
                            <Preview
                                data={this.state.jsonfile.graphs}
                                config={{
                                    graph: this.state.graph,
                                    task: this.state.task,
                                    time: this.state.time
                                }}
                            />
                        </div>
                    </div>
                )}
                <div id="g6-graph-container" style={{display:"none"}}></div>
            </div>
        )
    }
}
