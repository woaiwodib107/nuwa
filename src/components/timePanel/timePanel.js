import React from 'react'
import { Button, Select, Input, InputNumber } from 'antd'
import { ChromePicker } from 'react-color'
import { INSERT_POSITION } from '../../util/dnetChart'
import {
    TIME_PANEL_INPUT_WIDTH as TPIW,
    MARK_LINK_SOURCE as MLS,
    MARK_LINK_TARGET as MLT,
    TIME_TIMELINE_ELEMENT
} from '../../util/const'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import NodeLinkSample from '../nodeLinkSample/nodeLinkSample.js'
import SampleItem from '../sampleItem/sampleItem.js'
import './timePanel.css'

const { Option } = Select

export default class TimePanel extends React.Component {
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
        this.props.onSubmit({
            chooseTypes: tempArr
        })
    }
    handleElementColorClick = (index) => {
        console.log('handleElementColorClick', index)
        const tempArr = this.state.elementColorPickerDisplay
        tempArr[index] = !tempArr[index]
        this.setState({
            elementColorPickerDisplay: tempArr
        })
    }
    handleElementColorChange = (colorCode, option, key) => {
        const optionObject = this.props.options[option]
        optionObject[key] = colorCode.hex
        this.props.onSubmit({ [option]: optionObject })
    }
    handleTimeOptionsInput = (value, option, key) => {
        // const { value } = e.target
        const optionObject = this.props.options[option]
        optionObject[key] = Number(value)
        this.props.onSubmit({ [option]: optionObject })
    }
    handleTimeOptionsSelect = (value, option, key) => {
        const optionObject = this.props.options[option]
        optionObject[key] = value
        this.props.onSubmit({ [option]: optionObject })
    }

    handleTimeOptionsChange = (option, value) => {
        const optionObject = { ...this.props.options[option], ...value }
        // optionObject[key] = value
        this.props.onSubmit({ [option]: optionObject })
    }

    handleIconsClick = (value) => {
        this.setState({
            chooseItem: value
        })
    }
    render() {
        const options = this.props.options
        const optionKey = this.state.chooseItem === 'Node' ? 'nodeStyle' : 'linkStyle'
        const changeOptions = this.props.options.insert[optionKey]
        return (
            <div className="time-box">
                <div className="sub-title">
                    &nbsp;Time
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>
                <div className="encoding-table-container">
                    {/* timeLine */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    options.chooseTypes.indexOf('timeLine') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('timeLine', e)
                                }}
                                block
                            >
                                TimeLine
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            {/* <div className="position-ctrl item-ctrl">
                                <div className="position-circle1 item-circle1"></div>
                                <div className="position-circle2 item-circle2"></div>
                            </div> */}
                            <div className="item-right-option">
                                <div>xDistance:</div>
                                <InputNumber
                                    size="small"
                                    min={1}
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
                                    min={1}
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
                            <Button
                                type={
                                    options.chooseTypes.indexOf('animation') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('animation', e)
                                }}
                                block
                            >
                                Animaiton
                            </Button>
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
                            <Button
                                type={
                                    options.chooseTypes.indexOf('color') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('color', e)
                                }}
                                block
                            >
                                Color
                            </Button>
                        </div>
                        <div>
                            <div className="change-option-item">
                                <div>startColor</div>
                                <div
                                    onClick={() => this.handleElementColorClick(0)}
                                    style={{
                                        backgroundColor: options.color.startColor,
                                        width: '120px',
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
                                        width: '120px',
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
                            <Button
                                type={
                                    options.chooseTypes.indexOf('markLine') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('markLine', e)
                                }}
                                block
                            >
                                MarkLine
                            </Button>
                        </div>
                        {/* <div className="encoding-item-content">
                            <div className="link-ctrl item-ctrl">
                                <div className="link-circle1 item-circle1"></div>
                                <div className="wavy"></div>
                                <div className="link-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                            </div>
                        </div> */}
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
                            onSubmit={(value) => this.props.onSubmit(value)}
                        />
                    </div>

                    {/* insert */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    options.chooseTypes.indexOf('insert') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('insert', e)
                                }}
                                block
                            >
                                Insert
                            </Button>
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
