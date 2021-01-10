import React from 'react'
import { InputNumber, Select, Row, Col } from 'antd'

const { Option } = Select

export default class BasicPanel extends React.Component {
    constructor(props) {
        super(props)
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
    render() {
        return (
            <div className="basic-box">
                <div className="sub-title">&nbsp;Basic</div>
                <div className="configDiv">
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
                    <div className="change-option-item">
                        <div>linkShape:</div>
                        <Select
                            value={this.props.options.linkStyle.shape}
                            style={{ width: 120 }}
                            size="small"
                            onChange={(value) =>
                                this.handleStyleChange('linkStyle', 'shape', value)
                            }
                        >
                            <Option value="curve">curve</Option>
                            <Option value="line">line</Option>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}
