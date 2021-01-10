import React from 'react'
import { ChromePicker } from 'react-color'
import { Button } from 'antd'
import './relationItem.css'

const optionToDetail = {
    appear: {
        title: 'Appear',
        leftStyle: 'dashed',
        rightStyle: 'solid'
    },
    stable: {
        title: 'Stable',
        leftStyle: 'solid',
        rightStyle: 'solid'
    },
    disappear: {
        title: 'disappear',
        leftStyle: 'solid',
        rightStyle: 'dashed'
    }
}

export default class RelationItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colorPickerDisplay: false,
            color: '#fff'
        }
    }
    handleColorClick = () => {
        this.setState({
            colorPickerDisplay: !this.state.colorPickerDisplay
        })
    }
    handleColorChange = (colorCode) => {
        // this.setState({
        //   color: colorCode.hex
        // })
        console.log('handleColorChange---onSubmit', this.props.onSubmit)
        const tempKey = `${this.props.option.type}Options`
        this.props.onSubmit({
            [tempKey]: {
                ...this.props.option,
                color: colorCode.hex
            }
        })
    }

    render() {
        const details = optionToDetail[this.props.option.type]
        const rightColor = this.props.option.color
        const leftColor = this.props.option.type === 'stable' ? rightColor : ''

        return (
            <div className="relation-item">
                <div className="relation-divider">{details.title}</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        position: 'relative',
                        padding: 10
                    }}
                >
                    <div className="relation-rect-container" onClick={this.handleColorClick}>
                        <div
                            className={`left-${details.leftStyle}-circle`}
                            style={{
                                backgroundColor: leftColor
                            }}
                        ></div>
                        <div
                            style={{
                                backgroundColor: rightColor
                            }}
                            className={`right-${details.rightStyle}-circle`}
                        ></div>
                    </div>
                    <div className="relation-options-container">
                        <div>
                            <div style={{ zIndex: 0 }}>Choose Color</div>
                            <div className="item-color-picker-box">
                                {this.state.colorPickerDisplay ? (
                                    <ChromePicker
                                        className="item-color-picker"
                                        color={rightColor}
                                        onChange={this.handleColorChange}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
