import React, { useEffect, useState, useRef } from 'react'
import Data from './components/data/data.js'
import TimePanel from './components/timePanel/timePanel.js'
import Grammar from './components/grammar.js'
import Preview from './components/preview/preview.js'
import ComparisonPanel from './components/comparisonPanel/comparisonPanel.js'
import BasicPanel from './components/basicPanel/basicPanel.js'
import LayoutPanel from './components/layoutPanel/layoutPanel.js'
import ExampleBoard from './components/exampleBoard/exampleBoard.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: 'system',
            jsonfile: {},
            filename: '',
            basic: {
                width: 250,
                height: 250,
                eachWidth: 250,
                eachHeight: 250,
                margin: 30,
                nodeStyle: {
                    shape: 'circle',
                    fillColor: '#DAD5D5',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 6,
                    strokeType: 'solid',
                    textColor: 'white',
                    opacity: 1
                },
                linkStyle: {
                    shape: 'curve',
                    strokeColor: '#908F8F',
                    strokeType: 'solid',
                    strokeWidth: 2,
                    opacity: 1
                }
            },
            time: {
                chooseTypes:['timeLine', 'insert'],
                timeLine: {
                    xDistance: 250,
                    yDistance: 0,
                    // 有可能只对节点进行该操作
                    element: 'all',
                },
                insert: {
                    position:'bottom',
                    margin: 10,
                    nodeStyle: {
                        shape: 'circle',
                        fillColor: '#ffcc00',
                        strokeColor: '#000000',
                        strokeWidth: 1,
                        radius: 6,
                        strokeType: 'solid',
                        textColor: 'white',
                        opacity: 1
                    },
                    linkStyle: {
                        shape: 'curve',
                        strokeColor: '#ffcc00',
                        strokeType: 'solid',
                        strokeWidth: 2,
                        opacity: 1
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
                    strokeType: 'solid',
                    strokeColor: '#FD8F8F',
                    strokeWidth: 1,
                    strokeDasharray: '5,5'
                }
            },
            layout: {
                chooseType: 'offLine',
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
                circle: {
        
                } 
            },
            comparison: {
                isOn: true,
                chooseItem: 'stable-Node',
                chooseTypes:['shape', 'fillColor', 'strokeColor', 'strokeWidth', 'strokeType', 'color', 'radius'],
                // keyFrame可为上一帧、下一帧、具体某一帧
                keyFrame: 'next',
                elements: 'all',
                appearNode: {
                    shape: 'circle',
                    fillColor: '#FD8F8F',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    strokeType: 'solid',
                    textColor: 'white',
                    radius: 8
                },
                stableNode: {
                    shape: 'circle',
                    fillColor: '#DAD5D5',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 6,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                disappearNode: {
                    shape: 'circle',
                    fillColor: '#90B5FB',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 8,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                appearLink: {
                    shape: 'curve',
                    strokeColor: '#FD8F8F',
                    strokeType: 'solid',
                    strokeWidth: 3
                },
                stableLink: {
                    shape: 'line',
                    strokeColor: '#908F8F',
                    strokeType: 'solid',
                    strokeWidth: 1
                },
                disappearLink: {
                    shape: 'curve',
                    strokeColor: '#90B5FB',
                    strokeType: 'solid',
                    strokeWidth: 3
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
    handleSubmitFromComparison = (value) => {
        if (!value) return
        this.setState({
            comparison: {
                ...this.state.comparison,
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
    handleSubmitFromBasic = (value) => {
        this.setState({
            basic: {
                ...this.state.basic,
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
                            <BasicPanel
                                options={this.state.basic}
                                onSubmit={this.handleSubmitFromBasic}
                            />
                        </div>
                        <div className="col">
                            <TimePanel
                                options={this.state.time}
                                onSubmit={this.handleSubmitFromTime}
                            />
                        </div>
                        <div className="col">
                            <LayoutPanel
                                options={this.state.layout}
                                onSubmit={this.handleSubmitFromLayout}
                            />
                            <ComparisonPanel
                                options={this.state.comparison}
                                onSubmit={this.handleSubmitFromComparison}
                            />
                        </div>

                        <div className="col">
                            <Grammar
                                options={combineConfigs}
                                onSubmit={this.handleSubmitFromGrammar}
                            />
                            <Preview
                                data={this.state.jsonfile.graphs}
                                config={{
                                    basic: this.state.basic,
                                    layout: this.state.layout,
                                    comparison: this.state.comparison,
                                    time: this.state.time
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
