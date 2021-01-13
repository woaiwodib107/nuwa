import React from 'react'
import { InputNumber,Radio, Select } from 'antd'
import SampleItem from '../sampleItem/sampleItem.js'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import NodeLinkSample from '../nodeLinkSample/nodeLinkSample.js'

const { Option } = Select

const rowButtonStyle = {
    boxSizing: 'border-box',
    width: '64px',
    padding: '0px',
    fontSize: '12px',
    height: '64px',
    lineHeight: '64px',
    alighItems: 'center'
}

export default class BasicPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseItem : 'Node'
        }
    }
    handleConfigChange = (e, key) => {
        this.props.onSubmit({
            [key]: parseInt(e)
        })
    }
    handleStyleChange = (option, key, value) => {
        const optionItem = this.props.options[option]
        const displayItem = {
            ...optionItem,
            [key]: value
        }
        this.props.onSubmit({
            [option]: displayItem
        })
    }

    handleIconsClick = (value) => {
        this.setState({
            chooseItem: value
        })
    }

    render() {
        const optionKey = this.state.chooseItem === 'Node' ? 'nodeStyle' : 'linkStyle'
        const changeOptions = this.props.options[optionKey]
        return (
            <div className="basic-box">
                <div className="sub-title">&nbsp;Basic</div>
                <div className="encoding-table-container">
                    <div className="change-option-item">
                        <div>eachWidth:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={1000}
                            value={this.props.options.width}
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
                            value={this.props.options.height}
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
                        onSubmit={this.props.onSubmit}
                    />
                </div>
            </div>
        )
    }
}
