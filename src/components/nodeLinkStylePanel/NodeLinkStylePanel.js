import React, { useState } from 'react'
import { Radio, Select, Input, Collapse } from 'antd'
import { ChromePicker } from 'react-color'
import './nodeLinkStylePanel.css'

const colorIndexToName = ['strokeColor', 'fillColor', 'textColor']
const { Option } = Select
const { Panel } = Collapse

export default function NodeLinkStylePanel(props) {
    const [colorPickerDisplay, setColorPickerDisplay] = useState([false, false, false])

    const changeElementStyle = (option) => {
        const changeOptions = { ...props.changeOptions, ...option }
        props.onSubmit({ [props.optionKey]: { ...changeOptions, ...option } })
    }
    const handleStyleChange = (key, value) => {
        changeElementStyle({ [key]: value })
    }

    const handleElementColorClick = (index) => {
        const tempArr = [...colorPickerDisplay]
        tempArr[index] = !tempArr[index]
        setColorPickerDisplay(tempArr)
    }

    const handleElementColorChange = (colorCode, index) => {
        changeElementStyle({ [colorIndexToName[index]]: colorCode.hex })
    }
    const { changeOptions, type } = props
    return (
        <div 
            className="change-option-panel"
            style={{
                margin: '10px'
            }}
        >
            {/* 选择形状：节点和链接是不一样的。
                节点：圆形、三角形、方形 
                链接：直线、曲线
            */}
            <Collapse 
                // bordered={false}
                expandIconPosition={'right'}
                style={{
                    backgroundColor:'#ffffff'
                }}
            >
                <Panel 
                    className = "nlsp-panel"
                    header={props.optionKey}
                >
                    {type === 'Node' ? (
                        <div className="change-option-item">
                            <div>Shape:</div>
                            <Select
                                value={changeOptions.shape}
                                onChange={(value) => handleStyleChange('shape', value)}
                                style={{ width: 120 }}
                            >
                                <Option key="circle">
                                    <div>circle</div>
                                </Option>
                                <Option key="rect">
                                    <div>rect</div>
                                </Option>
                            </Select>
                        </div>
                    ) : (
                        <div className="change-option-item">
                            <div>Shape:</div>
                            <Select
                                value={changeOptions.shape}
                                onChange={(value) => handleStyleChange('shape', value)}
                                style={{ width: 120 }}
                            >
                                <Option key="line">
                                    <div>line</div>
                                </Option>
                                <Option key="curve">
                                    <div>curve</div>
                                </Option>
                            </Select>
                        </div>
                    )}
                    {/* 选择线型 */}
                    <div className="change-option-item">
                        <div>StrokeType:</div>
                        <Select
                            value={changeOptions.strokeType}
                            style={{ width: 120 }}
                            onChange={(value) => handleStyleChange('strokeType', value)}
                        >
                            <Option value="solid">solid</Option>
                            <Option value="dashed">dashed</Option>
                        </Select>
                    </div>
                    {/* 输入线宽 */}
                    <div className="change-option-item">
                        <div>StrokeWidth:</div>
                        <Input
                            value={changeOptions.strokeWidth}
                            type="number"
                            onChange={(e) =>
                                handleStyleChange('strokeWidth', Number(e.target.value))
                            }
                            style={{ width: '120px' }}
                        />
                    </div>
                    {/* 输入透明度 */}
                    <div className="change-option-item">
                        <div>Opacity:</div>
                        <Input
                            value={changeOptions.opacity}
                            type="number"
                            onChange={(e) => handleStyleChange('opacity', Number(e.target.value))}
                            style={{ width: '120px' }}
                        />
                    </div>
                    {/* 输入半径长度 */}
                    {changeOptions.radius ? (
                        <div className="change-option-item">
                            <div>Radius:</div>
                            <Input
                                value={changeOptions.radius}
                                type="number"
                                onChange={(e) =>
                                    handleStyleChange('radius', Number(e.target.value))
                                }
                                style={{ width: '120px' }}
                            />
                        </div>
                    ) : null}
                    {/* 节点的外边颜色或 线型颜色 */}
                    {
                        <div>
                            <div className="change-option-item">
                                <div>strokeColor</div>
                                <div
                                    onClick={() => handleElementColorClick(0)}
                                    style={{
                                        backgroundColor: changeOptions.strokeColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {colorPickerDisplay[0] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.strokeColor}
                                    onChange={(value) => handleElementColorChange(value, 0)}
                                />
                            ) : null}
                        </div>
                    }
                    {/* 节点内部的填充颜色 */}
                    {changeOptions.fillColor ? (
                        <div>
                            <div className="change-option-item">
                                <div>fillColor</div>
                                <div
                                    onClick={() => handleElementColorClick(1)}
                                    style={{
                                        backgroundColor: changeOptions.fillColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {colorPickerDisplay[1] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.fillColor}
                                    onChange={(value) => handleElementColorChange(value, 1)}
                                />
                            ) : null}
                        </div>
                    ) : null}
                    {/* 节点内部的填充颜色 */}
                    {changeOptions.textColor ? (
                        <div>
                            <div className="change-option-item">
                                <div>textColor</div>
                                <div
                                    onClick={() => handleElementColorClick(2)}
                                    style={{
                                        backgroundColor: changeOptions.textColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {colorPickerDisplay[2] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.textColor}
                                    onChange={(value) => handleElementColorChange(value, 2)}
                                />
                            ) : null}
                        </div>
                    ) : null}
                </Panel>
            </Collapse>
        </div>
    )
}
