import React from 'react'
import { Button, Select, Input } from 'antd'
import { ChromePicker } from 'react-color'
import './timePanel.css'

const { Option } = Select

export default class TimePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseTypes: this.props.options.chooseTypes,
            visible: this.props.options.visible,
            position: this.props.options.position,
            color: this.props.options.color,
            animation: this.props.options.animation,
            link: this.props.options.link,
            glyph: this.props.options.glyph,
            colorPickerDisplay: false,
            isVisible: this.props.options.visible !== 'dashed' ? true : false,
            elementColorPickerDisplay: [false, false, false]
        }
    }
    switchVisibleClick = (value) => {
        this.props.onSubmit({
            visible: {
                isVisible: value
            }
        })
    }
    handleSubmitOptions() {
        if (this.props.onSubmit) {
            const { visible, position, color, animation, link, glyph } = this.state
            this.props.onSubmit({ visible, position, color, animation, link, glyph })
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
    handleElementColorClick = (e, index) => {
        const tempArr = this.state.elementColorPickerDisplay
        tempArr[index] = !tempArr[index]
        this.setState({
            elementColorPickerDisplay: tempArr
        })
    }
    handleTimeOptionsInput = (e, option, key) => {
        const { value } = e.target
        const optionObject = this.props.options[option]
        optionObject[key] = Number(value)
        this.props.onSubmit({ [option]: optionObject })
    }

    render() {
        const options = this.props.options
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
                    {/* visble */}
                    {/* <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.chooseTypes.indexOf('visible') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('visible', e)
                                }}
                                block
                            >
                                Visible
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="visible-ctrl item-ctrl">
                                <div
                                    className="visible-circle1 item-circle1"
                                    style={{ borderStyle: this.state.visible }}
                                ></div>
                                <div
                                    className="visible-circle2 item-circle2"
                                    style={{ borderStyle: this.state.visible }}
                                ></div>
                            </div>
                            <div className="visible-picker-box">
                                <Button
                                    id="visible-button"
                                    onClick={() => this.switchVisibleClick(true)}
                                    style={{
                                        color: options.visible.isVisible ? '#6495ED' : '#B0C4DE',
                                        borderColor: options.visible.isVisible
                                            ? '#6495ED'
                                            : '#B0C4DE',
                                        borderWidth: options.visible.isVisible ? '2px' : '1px'
                                    }}
                                >
                                    {' '}
                                    Visible{' '}
                                </Button>
                                <Button
                                    id="invisible-button"
                                    onClick={() => this.switchVisibleClick(false)}
                                    style={{
                                        color: !options.visible.isVisible ? '#6495ED' : '#B0C4DE',
                                        borderColor: !options.visible.isVisible
                                            ? '#6495ED'
                                            : '#B0C4DE',
                                        borderWidth: !options.visible.isVisible ? '2px' : '1px'
                                    }}
                                >
                                    {' '}
                                    Invisible
                                </Button>
                            </div>
                        </div>
                    </div> */}

                    {/* position */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.chooseTypes.indexOf('position') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('position', e)
                                }}
                                block
                            >
                                Position
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="position-ctrl item-ctrl">
                                <div className="position-circle1 item-circle1"></div>
                                <div className="position-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <div>EachMargin:</div>
                                    <Input
                                        value={options.position.eachMargin}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'position', 'eachMargin')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                                <div className="item-right-option">
                                    <div>EachWidth:</div>
                                    <Input
                                        value={options.position.eachWidth}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'position', 'eachWidth')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* animaiton */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.chooseTypes.indexOf('animation') > -1
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
                            <div className="animation-ctrl item-ctrl">
                                <div className="animation-circle1 item-circle1"></div>
                                <div className="ellipse1"></div>
                                <div className="ellipse2"></div>
                                <div className="ellipse3"></div>
                                <div className="animation-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <div>Speed:</div>
                                    <Input
                                        value={options.animation.speed}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'animation', 'speed')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* color */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.chooseTypes.indexOf('color') > -1
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
                        <div className="encoding-item-content">
                            <div className="color-ctrl item-ctrl">
                                <div className="color-circle1 item-circle1"></div>
                                <div
                                    className="color-circle2 item-circle2"
                                    style={{ backgroundColor: this.state.color }}
                                ></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <div>Number:</div>
                                    <Input
                                        value={options.color.number}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'color', 'number')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MarkLine */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.chooseTypes.indexOf('markLine') > -1
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
                        <div className="encoding-item-content">
                            <div className="link-ctrl item-ctrl">
                                <div className="link-circle1 item-circle1"></div>
                                <div className="wavy"></div>
                                <div className="link-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <div>xDistance:</div>
                                    <Input
                                        value={options.link.xDistance}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'link', 'xDistance')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                                <div className="item-right-option">
                                    <div>yDistance:</div>
                                    <Input
                                        value={options.link.yDistance}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'link', 'yDistance')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
