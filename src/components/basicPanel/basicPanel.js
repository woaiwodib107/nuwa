import React from 'react'
import { InputNumber, Select, Row, Col } from 'antd'

const { Option } = Select

export default class BasicPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    handleConfigChange = (e, key) => {
        console.log('eeee', e)
        // const { value } = e.target
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
                        <div>width:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={1000}
                            value={this.props.options.width}
                            style={{ width: 120 }}
                            onChange={(e) => this.handleConfigChange(e, 'width')}
                        />
                    </div>
                    <div className="change-option-item">
                        <div>height:</div>
                        <InputNumber
                            size="small"
                            min={1}
                            max={750}
                            style={{ width: 120 }}
                            value={this.props.options.height}
                            onChange={(e) => this.handleConfigChange(e, 'height')}
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
                    {/* <Row>
                        <Col span={12} className="setLabel">
                            nodeStyle:&nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} className="setLabel">
                            linkStyle:&nbsp;
                        </Col>
                    </Row> */}
                </div>
            </div>
        )
    }
}
