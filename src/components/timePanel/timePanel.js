import React from 'react'
import { Button, Select, Radio, InputNumber } from 'antd'
import { ChromePicker } from 'react-color'
import { INSERT_POSITION } from '../../util/dnetChart'
import {
    TIME_PANEL_INPUT_WIDTH as TPIW,
    MARK_LINK_SOURCE as MLS,
    MARK_LINK_TARGET as MLT,
    TIME_TIMELINE_ELEMENT,
    TIME_CHART_TYPE,
    TIME_TIMELINE_TYPE,
    TIME_BUTTON_STYLE
} from '../../util/const'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import NodeLinkSample from '../nodeLinkSample/nodeLinkSample.js'
import SampleItem from '../sampleItem/sampleItem.js'
import './timePanel.css'
import { connect } from 'react-redux'
import { modifyConfig } from '../../redux/config.redux.js'

const { Option } = Select

class TimePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colorPickerDisplay: false,
            elementColorPickerDisplay: [false, false, false],
            chooseItem: 'Node'
        }
    }
    handleButtonOnClick(type, event) {
        const tempArr = [...this.props.options.chooseTypes]
        const tempIndex = tempArr.indexOf(type)
        if (tempIndex === -1) {
            tempArr.push(type)
        } else {
            tempArr.splice(tempIndex, 1)
        }
        this.changeTimeConfig({
            chooseTypes: tempArr
        })
    }
    handleElementColorClick = (index) => {
        const tempArr = this.state.elementColorPickerDisplay
        tempArr[index] = !tempArr[index]
        this.setState({
            elementColorPickerDisplay: tempArr
        })
    }
    handleElementColorChange = (colorCode, option, key) => {
        const optionObject = this.props.options[option]
        optionObject[key] = colorCode.hex
        this.changeTimeConfig({ [option]: optionObject })
    }
    handleTimeOptionsInput = (value, option, key) => {
        const optionObject = this.props.options[option]
        optionObject[key] = Number(value)
        this.changeTimeConfig({ [option]: optionObject })
    }
    handleTimeOptionsSelect = (value, option, key) => {
        const optionObject = this.props.options[option]
        optionObject[key] = value
        this.changeTimeConfig({ [option]: optionObject })
    }

    handleTimeLayoutType =(e) => {
        switch(e){
            case 'merged':
                this.handleButtonOnClick('timeLine')
                break
            case 'juxtaposed':
                if(this.props.options.chooseTypes.indexOf('timeLine') === -1){
                    this.handleButtonOnClick('timeLine')
                }
                this.handleTimeOptionsSelect('linear', 'timeLine', 'type')
                break
            case 'circular':
                if(this.props.options.chooseTypes.indexOf('timeLine') === -1){
                    this.handleButtonOnClick('timeLine')
                }
                this.handleTimeOptionsSelect('circular', 'timeLine', 'type')
        }
    }

    handleTimeOptionsChange = (option, value) => {
        const optionObject = { ...this.props.options[option], ...value }
        // optionObject[key] = value
        this.changeTimeConfig({ [option]: optionObject })
    }

    handleIconsClick = (value) => {
        this.setState({
            chooseItem: value
        })
    }
    changeTimeConfig = (value) => {
        this.props.modifyConfig({ key: 'time', value })
    }
    render() {
        const options = this.props.options
        const optionKey = this.state.chooseItem === 'Node' ? 'nodeStyle' : 'linkStyle'
        const changeOptions = this.props.options.insert[optionKey]
        return (
            <div className="time-box combine-inner-border">
                <div className="combine-inner-title">&nbsp;Encoding: Time-layout</div>
                <div className="encoding-table-container">
                    {/* timeLine */}
                    <div className="encoding-item">
                        {/* <div className="encoding-item-title">
                            <Radio.Group
                                value={
                                    options.chooseTypes.indexOf('timeLine') > -1 ? 'TimeLine' : ''
                                }
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('timeLine', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="TimeLine"
                                    type
                                >
                                    TimeLine
                                </Radio.Button>
                            </Radio.Group>
                        </div> */}
                        <div className="encoding-item-content">
                            <div className="item-right-option">
                                <div>TimeLayout:</div>
                                <Select
                                    value={
                                        options.chooseTypes.indexOf('timeLine') === -1 
                                            ? 'merged'
                                            : (options.timeLine.type ==='linear'
                                                ? 'juxtaposed'
                                                : 'circular')
                                    }
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(e) =>
                                        this.handleTimeLayoutType(e)
                                     }
                                >
                                    {TIME_TIMELINE_TYPE.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="item-right-option">
                                <div>xDistance:</div>
                                <InputNumber
                                    size="small"
                                    min={0}
                                    max={1000}
                                    value={options.timeLine.xDistance}
                                    onChange={(e) =>
                                        this.handleTimeOptionsInput(e, 'timeLine', 'xDistance')
                                    }
                                    style={{ width: TPIW }}
                                />
                            </div>
                            <div className="item-right-option">
                                <div>yDistance:</div>
                                <InputNumber
                                    size="small"
                                    min={0}
                                    max={1000}
                                    value={options.timeLine.yDistance}
                                    onChange={(e) =>
                                        this.handleTimeOptionsInput(e, 'timeLine', 'yDistance')
                                    }
                                    style={{ width: TPIW }}
                                />
                            </div>
                            <div className="item-right-option">
                                <div>Element:</div>
                                <Select
                                    value={options.timeLine.element}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(e) =>
                                        this.handleTimeOptionsSelect(e, 'timeLine', 'element')
                                    }
                                >
                                    {' '}
                                    {TIME_TIMELINE_ELEMENT.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* animaiton */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Radio.Group
                                value={
                                    options.chooseTypes.indexOf('animation') > -1 ? 'animation' : ''
                                }
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('animation', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="animation"
                                    type
                                >
                                    Animation
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="encoding-item-content">
                            <div className="item-right-option">
                                <div>Speed:</div>
                                <InputNumber
                                    size="small"
                                    min={1}
                                    max={1000}
                                    value={options.animation.speed}
                                    onChange={(e) =>
                                        this.handleTimeOptionsInput(e, 'animation', 'speed')
                                    }
                                    style={{ width: TPIW }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* color */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Radio.Group
                                value={options.chooseTypes.indexOf('color') > -1 ? 'color' : ''}
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('color', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="color"
                                    type
                                >
                                    Color
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div>
                            <div className="change-option-item">
                                <div>startColor</div>
                                <div
                                    onClick={() => this.handleElementColorClick(0)}
                                    style={{
                                        backgroundColor: options.color.startColor,
                                        width: '125px',
                                        height: '24px'
                                    }}
                                ></div>
                            </div>
                            {this.state.elementColorPickerDisplay[0] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={options.color.startColor}
                                    onChange={(colorCode) =>
                                        this.handleElementColorChange(
                                            colorCode,
                                            'color',
                                            'startColor'
                                        )
                                    }
                                />
                            ) : null}
                        </div>
                        <div>
                            <div className="change-option-item">
                                <div>endColor</div>
                                <div
                                    onClick={() => this.handleElementColorClick(1)}
                                    style={{
                                        backgroundColor: options.color.endColor,
                                        width: '125px',
                                        height: '24px'
                                    }}
                                ></div>
                            </div>
                            {this.state.elementColorPickerDisplay[1] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={options.color.endColor}
                                    onChange={(colorCode) =>
                                        this.handleElementColorChange(
                                            colorCode,
                                            'color',
                                            'endColor'
                                        )
                                    }
                                />
                            ) : null}
                        </div>
                        <div className="encoding-item-content">
                            <div className="item-right-option">
                                <div>Number:</div>
                                <InputNumber
                                    size="small"
                                    min={1}
                                    max={1000}
                                    value={options.color.number}
                                    onChange={(e) =>
                                        this.handleTimeOptionsInput(e, 'color', 'number')
                                    }
                                    style={{ width: TPIW }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MarkLine */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Radio.Group
                                value={
                                    options.chooseTypes.indexOf('markLine') > -1 ? 'markLine' : ''
                                }
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('markLine', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="markLine"
                                    type
                                >
                                    MarkLine
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="encoding-item-content sample-item-border">
                            <SampleItem
                                config={options.markLine}
                                type={'link'}
                                width={258}
                                height={42}
                                source={MLS}
                                target={MLT}
                            />
                        </div>
                        <NodeLinkStylePanel
                            type={'Link'}
                            optionKey={'markLine'}
                            changeOptions={options.markLine}
                            onSubmit={this.changeTimeConfig}
                        />
                    </div>
                    {/* Chart */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Radio.Group
                                value={options.chooseTypes.indexOf('chart') > -1 ? 'chart' : ''}
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('chart', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="chart"
                                    type
                                >
                                    Chart
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="encoding-item-content">
                            <div className="item-right-option">
                                <div>Type:</div>
                                <Select
                                    value={
                                        options.chart.type === undefined
                                            ? 'line'
                                            : options.chart.type
                                    }
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(e) =>
                                        this.handleTimeOptionsSelect(e, 'chart', 'type')
                                    }
                                >
                                    {' '}
                                    {TIME_CHART_TYPE.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* insert */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Radio.Group
                                value={options.chooseTypes.indexOf('insert') > -1 ? 'insert' : ''}
                            >
                                <Radio.Button
                                    onClick={(e) => {
                                        this.handleButtonOnClick('insert', e)
                                    }}
                                    style={TIME_BUTTON_STYLE}
                                    value="insert"
                                    type
                                >
                                    Insert
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="encoding-item-content">
                            <div className="item-right-option">
                                <div>Margin:</div>
                                <InputNumber
                                    size="small"
                                    min={1}
                                    max={1000}
                                    value={options.insert.margin}
                                    onChange={(e) =>
                                        this.handleTimeOptionsInput(e, 'insert', 'margin')
                                    }
                                    style={{ width: TPIW }}
                                />
                            </div>
                            <div className="item-right-option">
                                <div>Position:</div>
                                <Select
                                    value={options.insert.position}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(e) =>
                                        this.handleTimeOptionsSelect(e, 'insert', 'position')
                                    }
                                >
                                    {' '}
                                    {INSERT_POSITION.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="encoding-item-content">
                            <NodeLinkSample
                                nodeStyle={options.insert.nodeStyle}
                                linkStyle={options.insert.linkStyle}
                                chooseItem={this.state.chooseItem}
                                onSubmit={this.handleIconsClick}
                            />
                        </div>
                        <NodeLinkStylePanel
                            type={this.state.chooseItem}
                            optionKey={optionKey}
                            changeOptions={changeOptions}
                            onSubmit={(value) => this.handleTimeOptionsChange('insert', value)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    options: state.config.time
})

const mapDispatchToProps = {
    modifyConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePanel)
