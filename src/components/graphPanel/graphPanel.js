import React from 'react'
import { InputNumber, Select } from 'antd'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import NodeLinkSample from '../nodeLinkSample/nodeLinkSample.js'
import {
    GRAPH_LAYOUT_TYPE
} from '../../util/const'
import { connect } from "react-redux"
import { 
	modifyConfig, 
} from '../../redux/config.redux.js'

const { Option } = Select

// const rowButtonStyle = {
//     boxSizing: 'border-box',
//     width: '64px',
//     padding: '0px',
//     fontSize: '12px',
//     height: '64px',
//     lineHeight: '64px',
//     alighItems: 'center'
// }

class GraphPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseItem : 'Node'
        }
    }
    handleConfigChange = (e, key) => {
        this.changeGraphConfig({
            [key]: parseInt(e)
        })
    }
    handleStyleChange = (option, key, value) => {
        const optionItem = this.props.options[option]
        const displayItem = {
            ...optionItem,
            [key]: value
        }
        this.changeGraphConfig({
            [option]: displayItem
        })
    }

    handleIconsClick = (value) => {
        this.setState({
            chooseItem: value
        })
    }

    handleLayoutTypeChange = (value)=>{
        const layoutItem = this.props.options.layout
        const displayItem = {
            ...layoutItem, 
            chooseType:value
        }
        this.changeGraphConfig({layout: displayItem})
    }

    changeGraphConfig = (value) => {
        this.props.modifyConfig({key:"graph", value})
    }

    render() {
        const optionKey = this.state.chooseItem === 'Node' ? 'nodeStyle' : 'linkStyle'
        const changeOptions = this.props.options[optionKey]
        return (
            <div className="basic-box combine-inner-border">
                <div className="combine-inner-title">&nbsp;Graph</div>
                <div className="encoding-table-container">
                    <div className="change-option-item">
                        <div>eachWidth:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={1000}
                            value={this.props.options.eachWidth}
                            style={{ width: 120 }}
                            onChange={(e) => this.handleConfigChange(e, 'eachWidth')}
                        />
                    </div>
                    <div className="change-option-item">
                        <div>eachHeight:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={750}
                            style={{ width: 120 }}
                            value={this.props.options.eachHeight}
                            onChange={(e) => this.handleConfigChange(e, 'eachHeight')}
                        />
                    </div>
                    <div className="change-option-item">
                        <div>margin:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={200}
                            style={{ width: 120 }}
                            value={this.props.options.margin}
                            onChange={(e) => this.handleConfigChange(e, 'margin')}
                        />
                    </div>
                    <div className="change-option-item">
                        <div>Layout:</div>
                        <Select
                            value={this.props.options.layout.chooseType}
                            style={{ width: 120 }}
                            onChange={this.handleLayoutTypeChange}
                        >   
                            {GRAPH_LAYOUT_TYPE.map((v)=>{
                                return (
                                    <Option key={v} value={v}>
                                        {v}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="basic-panel-line">
                        <NodeLinkSample
                            nodeStyle = {this.props.options.nodeStyle}
                            linkStyle = {this.props.options.linkStyle}
                            chooseItem = {this.state.chooseItem}
                            onSubmit = {this.handleIconsClick}
                        />
                    </div>
                    <NodeLinkStylePanel
                        type={this.state.chooseItem}
                        optionKey={optionKey}
                        changeOptions={changeOptions}
                        onSubmit={this.changeGraphConfig}
                    />
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state)=>({
	options: state.config.graph
})

const mapDispatchToProps = {
	modifyConfig,
} 

export default connect(mapStateToProps,mapDispatchToProps)(GraphPanel)