import React from 'react'
import { InputNumber, Select, Row, Col } from 'antd'

const { Option } = Select

export default class Render extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 1000,
            height: 750,
            eachMargin: 20,
            eachWidth: 30,
            eachHeight: 30
            //layout: 'forceDirect'
        }
    }
    handleLayoutChange = (e) => {
        this.setState({
            layout: e
        })
        this.props.onChangeConfig(this.state)
    }
    handleWidthChange = (e) => {
        // console.log(e)
        // this.setState({
        //     width: parseInt(e)
        // })
        // console.log(this.state)
        this.props.onChangeConfig('width', parseInt(e))
    }
    handleHeightChange = (e) => {
        // this.setState({
        //     height: parseInt(e)
        // })
        this.props.onChangeConfig('height', parseInt(e))
    }
    handleSubWChange = (e) => {
        // this.setState({
        //     eachWidth: parseInt(e)
        // })
        this.props.onChangeConfig('eachWidth', parseInt(e))
    }
    handleSubHChange = (e) => {
        // this.setState({
        //     eachHeight: parseInt(e)
        // })
        this.props.onChangeConfig('eachHeight', parseInt(e))
    }
    handleSubMChange = (e) => {
        // this.setState({
        //     eachMargin: parseInt(e)
        // })
        this.props.onChangeConfig('eachMargin', parseInt(e))
    }
    render() {
        return (
            <div className="render-box">
                <div className="sub-title">&nbsp;Render</div>
                <div className="configDiv">
                    {/* <Row>
                        <Col span={9} style={{display:"inline"}}>Layout:&nbsp;</Col><Select size="small" defaultValue="ForceDirect" style={{ width: 120 }} onChange={this.handleLayoutChange}>
                                    <Option value="ForceDirect">Force-Direct</Option>
                                </Select>
                    </Row> */}
                    <Row>
                        <Col span={12} className="setLabel">
                            Width:&nbsp;
                        </Col>
                        <InputNumber
                            size="small"
                            min={1}
                            max={1000}
                            defaultValue={1000}
                            onChange={this.handleWidthChange}
                        />
                    </Row>
                    <Row>
                        <Col span={12} className="setLabel">
                            Height:&nbsp;
                        </Col>
                        <InputNumber
                            size="small"
                            min={1}
                            max={750}
                            defaultValue={750}
                            onChange={this.handleHeightChange}
                        />
                    </Row>
                    <Row>
                        <Col span={12} className="setLabel">
                            EachMargin:&nbsp;
                        </Col>
                        <InputNumber
                            size="small"
                            min={1}
                            max={200}
                            defaultValue={20}
                            onChange={this.handleSubMChange}
                        />
                    </Row>
                    <Row>
                        <Col span={12} className="setLabel">
                            EachWidth:&nbsp;
                        </Col>
                        <InputNumber
                            size="small"
                            min={1}
                            max={200}
                            defaultValue={180}
                            onChange={this.handleSubWChange}
                        />
                    </Row>
                    <Row>
                        <Col span={12} className="setLabel">
                            EachHeight:&nbsp;
                        </Col>
                        <InputNumber
                            size="small"
                            min={1}
                            max={200}
                            defaultValue={180}
                            onChange={this.handleSubHChange}
                        />
                    </Row>
                </div>
            </div>
        )
    }
}
