import React from 'react'
import DataPanel from './components/dataPanel/dataPanel.js'
import Preview from './components/preview/preview.js'
import GraphPanel from './components/graphPanel/graphPanel.js'
import GrammarPanel from './components/grammarPanel/grammarPanel.js'
import ExampleBoard from './components/exampleBoard/exampleBoard.js'
import TemplatePanel from './components/templatePanel/templatePanel.js'
import CombinePanel from './components/combinePanel/combinePanel.js'
import { COMPARISON_CONFIG } from './util/defaultConfig.js'
import graphSvg from './assets/graphIcon.svg'
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
            filename: ''
        }
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
                    {/* <img 
                        className="title-graph-svg" 
                        src={graphSvg}
                    /> */}
                    <div className="window-header-text">
                        <div className="title"> <span className="bold-font">GoGraph Editor</span> </div>
                        {/* <div
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
                        </div> */}
                    </div>
                    
                </div>
                {this.state.board === 'example' ? (
                    <ExampleBoard></ExampleBoard>
                ) : (
                    <div className="row">
                        <div className="col">
                            <DataPanel />
                            <GrammarPanel/>
                        </div>
                        <div className="col">
                            <CombinePanel/>
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