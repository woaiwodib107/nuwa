import React from 'react'
import { Radio, Select, Input } from 'antd'

const { Option } = Select
export default class LayoutPanel extends React.Component {
  handleStrokeTypeChange = (value)=>{
    this.props.onSubmit({chooseType: value})
  }
    render() {
        return (
            <div className="layout-box">
                <div className="sub-title">
                    &nbsp;Layout
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>
                <div>
                    <div className="change-option-item">
                        <div>Layout:</div>
                        <Select
                            value={this.props.options.chooseType}
                            style={{ width: 120 }}
                            onChange={this.handleStrokeTypeChange}
                        >
                            <Option value="offLine">offLine</Option>
                            <Option value="vertical">vertical</Option>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}
