import React from 'react'
import { ChromePicker } from 'react-color'
import SampleItem from '../sampleItem/sampleItem.js'
import { Radio, Select, Input, Switch } from 'antd'
import './comparisonPanel.css'

// Trend或者 Diff 配置
// 下面是trend配置
const config = [
    {
        elements: 'Node/Link/All',
        change: 'appear/stable/disappear',
        encodingOptions: {
            // 具体的已经选择的配置
            visible: {
                isVisible: true
            },
            position: {
                totalWidth: 1000,
                eachWidth: 200
            },
            animatoin: {
                speed: 12
            },
            color: {
                number: 10
            }
        }
    }
]

const { Option } = Select
const taskOptions = [
    { label: 'Time', value: 'Time' },
    { label: 'Comparison', value: 'Comparison' }
]

const columnButtonStyle = {
    boxSizing: 'border-box',
    width: '62px',
    padding: '0px',
    fontSize: '12px',
    height: '30px',
    alighItems: 'center'
}
const rowButtonStyle = {
    boxSizing: 'border-box',
    width: '62px',
    padding: '0px',
    fontSize: '12px',
    height: '62px',
    alighItems: 'center'
}

const cloumnOptions = [
    { label: 'appear', value: 'appear' },
    { label: 'stable', value: 'stable' },
    { label: 'disappear', value: 'disappear' }
]

const index2chooseType = [
    'appear-Node',
    'stable-Node',
    'disappear-Node',
    'appear-Link',
    'stable-Link',
    'disappear-Link'
]
const colorIndexToName = ['strokeColor', 'fillColor', 'textColor']
export default class ComparisonPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elementColorPickerDisplay: [false, false, false]
        }
    }
    handleOptionChange = (value) => {
        this.props.onSubmit({ ...value })
    }
    handleTaskChange = (e) => {
        this.props.onSubmit({ taskType: e.target.value })
    }
    handleColumnChange = (e) => {
        const nodeOrLink = this.props.options.chooseType.split('-')[1]
        this.props.onSubmit({ chooseType: `${e.target.value}-${nodeOrLink}` })
    }
    handleRowChange = (e) => {
        const changeAttr = this.props.options.chooseType.split('-')[0]
        this.props.onSubmit({ chooseType: `${changeAttr}-${e.target.value}` })
    }
    handleIconsClick = (index) => {
        this.props.onSubmit({ chooseType: index2chooseType[Number(index)] })
    }
    handleIsOnChange = (value) =>{
        this.props.onSubmit({ isOn: value })
    }

    changeElementStyle = (option) => {
        const changeKey = this.props.options.chooseType.split('-').join('')
        const changeOptions = this.props.options[changeKey]
        this.props.onSubmit({ [changeKey]: { ...changeOptions, ...option } })
    }
    handleShapeChange = (value) => {
        this.changeElementStyle({ shape: value })
    }
    handleStrokeTypeChange = (value) => {
        this.changeElementStyle({ strokeType: value })
    }
    handleStrokeWidthChange = (e) => {
        const { value } = e.target
        this.changeElementStyle({ strokeWidth: Number(value) })
    }
    handleRadiusChange = (e) => {
        const { value } = e.target
        this.changeElementStyle({ radius: Number(value) })
    }
    handleElementColorChange = (colorCode, index) => {
        this.changeElementStyle({ [colorIndexToName[index]]: colorCode.hex })
    }
    handleElementColorClick = (e, index) => {
        const tempArr = this.state.elementColorPickerDisplay
        tempArr[index] = !tempArr[index]
        this.setState({
            elementColorPickerDisplay: tempArr
        })
    }

    render() {
        const {
            isOn,
            chooseType,
            appearNode,
            appearLink,
            stableNode,
            stableLink,
            disappearNode,
            disappearLink
        } = this.props.options
        let changeKey = chooseType.split('-')
        changeKey = changeKey.join('')
        const changeOptions = this.props.options[changeKey]
        return (
            <div className="Comparison-box">
                <div className="sub-title">
                    &nbsp;Comparison
                    <div className="comparison-switch " >
                        <Switch 
                            checkedChildren="ON" 
                            unCheckedChildren="OFF" 
                            defaultChecked = {isOn}
                            onChange={this.handleIsOnChange}
                        />
                    </div>
                    
                </div>
                <div className="comparison-table-container">
                    <div className="table-first-line">
                        <div className="blank-icon"></div>
                        <Radio.Group
                            buttonStyle="solid"
                            onChange={this.handleColumnChange}
                            value={chooseType.split('-')[0]}
                        >
                            <Radio.Button style={columnButtonStyle} value="appear">
                                appear
                            </Radio.Button>
                            <Radio.Button style={columnButtonStyle} value="stable">
                                stable
                            </Radio.Button>
                            <Radio.Button style={columnButtonStyle} value="disappear">
                                disappear
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="table-second-line">
                        <div className="second-line-left">
                            <Radio.Group
                                buttonStyle="solid"
                                onChange={this.handleRowChange}
                                value={chooseType.split('-')[1]}
                            >
                                <Radio.Button style={rowButtonStyle} value="Node">
                                    Node
                                </Radio.Button>
                                <Radio.Button style={rowButtonStyle} value="Link">
                                    Link
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="second-line-right">
                            <div
                                id="appear-Node"
                                onClick={() => this.handleIconsClick(0)}
                                className={`line-icon-container ${
                                    chooseType === 'appear-Node' ? 'choose-icon' : ''
                                }`}
                            >
                                <SampleItem config={appearNode} />
                            </div>
                            <div
                                onClick={() => this.handleIconsClick(1)}
                                className={`line-icon-container ${
                                    chooseType === 'stable-Node' ? 'choose-icon' : ''
                                }`}
                            >
                                <SampleItem config={stableNode} />
                            </div>
                            <div
                                className={`line-icon-container ${
                                    chooseType === 'disappear-Node' ? 'choose-icon' : ''
                                }`}
                                onClick={() => this.handleIconsClick(2)}
                            >
                                <SampleItem config={disappearNode} />
                            </div>
                            <div
                                onClick={() => this.handleIconsClick(3)}
                                className={`line-icon-container ${
                                    chooseType === 'appear-Link' ? 'choose-icon' : ''
                                }`}
                            >
                                <SampleItem config={appearLink} type={'link'} />
                            </div>
                            <div
                                onClick={() => this.handleIconsClick(4)}
                                className={`line-icon-container ${
                                    chooseType === 'stable-Link' ? 'choose-icon' : ''
                                }`}
                            >
                                <SampleItem config={stableLink} type={'link'} />
                            </div>
                            <div
                                onClick={() => this.handleIconsClick(5)}
                                className={`line-icon-container ${
                                    chooseType === 'disappear-Link' ? 'choose-icon' : ''
                                }`}
                            >
                                <SampleItem config={disappearLink} type={'link'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="change-option-panle">
                    {/* 选择形状：圆形、三角形、方形 */}
                    {changeOptions.shape ? (
                        <div className="change-option-item">
                            <div>Shape:</div>
                            <Select
                                value={changeOptions.shape}
                                onChange={this.handleShapeChange}
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
                    ) : null}
                    {/* 选择线型 */}
                    <div className="change-option-item">
                        <div>StrokeType:</div>
                        <Select
                            value={changeOptions.strokeType}
                            style={{ width: 120 }}
                            onChange={this.handleStrokeTypeChange}
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
                            onChange={this.handleStrokeWidthChange}
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
                                onChange={this.handleRadiusChange}
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
                                    onClick={(e) => this.handleElementColorClick(e, 0)}
                                    style={{
                                        backgroundColor: changeOptions.strokeColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {this.state.elementColorPickerDisplay[0] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.strokeColor}
                                    onChange={(value) => this.handleElementColorChange(value, 0)}
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
                                    onClick={(e) => this.handleElementColorClick(e, 1)}
                                    style={{
                                        backgroundColor: changeOptions.fillColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {this.state.elementColorPickerDisplay[1] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.fillColor}
                                    onChange={(value) => this.handleElementColorChange(value, 1)}
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
                                    onClick={(e) => this.handleElementColorClick(e, 2)}
                                    style={{
                                        backgroundColor: changeOptions.textColor,
                                        width: '120px',
                                        height: '32px'
                                    }}
                                ></div>
                            </div>
                            {this.state.elementColorPickerDisplay[2] ? (
                                <ChromePicker
                                    className="item-color-picker"
                                    color={changeOptions.textColor}
                                    onChange={(value) => this.handleElementColorChange(value, 2)}
                                />
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}
