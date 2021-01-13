import React from 'react'
import { ChromePicker } from 'react-color'
import SampleItem from '../sampleItem/sampleItem.js'
import { Radio, Select, Input, Switch } from 'antd'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import './comparisonPanel.css'

// Trend或者 Diff 配置
// 下面是trend配置

const columnButtonStyle = {
    boxSizing: 'border-box',
    width: '62px',
    padding: '0px',
    fontSize: '12px',
    height: '30px',
    lineHeight: '30px',
    alighItems: 'center'
}
const rowButtonStyle = {
    boxSizing: 'border-box',
    width: '62px',
    padding: '0px',
    fontSize: '12px',
    height: '62px',
    lineHeight: '62px',
    alighItems: 'center'
}

const index2chooseItem = [
    'appear-Node',
    'stable-Node',
    'disappear-Node',
    'appear-Link',
    'stable-Link',
    'disappear-Link'
]
export default class ComparisonPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    handleOptionChange = (value) => {
        this.props.onSubmit({ ...value })
    }
    handleTaskChange = (e) => {
        this.props.onSubmit({ taskType: e.target.value })
    }
    handleColumnChange = (e) => {
        const nodeOrLink = this.props.options.chooseItem.split('-')[1]
        this.props.onSubmit({ chooseItem: `${e.target.value}-${nodeOrLink}` })
    }
    handleRowChange = (e) => {
        const changeAttr = this.props.options.chooseItem.split('-')[0]
        this.props.onSubmit({ chooseItem: `${changeAttr}-${e.target.value}` })
    }
    handleIconsClick = (index) => {
        this.props.onSubmit({ chooseItem: index2chooseItem[Number(index)] })
    }
    handleIsOnChange = (value) => {
        this.props.onSubmit({ isOn: value })
    }

    render() {
        const {
            isOn,
            chooseItem,
            appearNode,
            appearLink,
            stableNode,
            stableLink,
            disappearNode,
            disappearLink
        } = this.props.options
        let changeKey = chooseItem.split('-')
        changeKey = changeKey.join('')
        const changeOptions = this.props.options[changeKey]
        return (
            <div className="Comparison-box">
                <div className="sub-title">
                    &nbsp;Comparison
                    <div className="comparison-switch ">
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            defaultChecked={isOn}
                            onChange={this.handleIsOnChange}
                        />
                    </div>
                </div>
                <div className="encoding-table-container">
                    <div className="comparison-table-container">
                        <div className="table-first-line">
                            <div className="blank-icon"></div>
                            <Radio.Group
                                buttonStyle="solid"
                                onChange={this.handleColumnChange}
                                value={chooseItem.split('-')[0]}
                                className='first-line-right'
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
                                    value={chooseItem.split('-')[1]}
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
                                        chooseItem === 'appear-Node' ? 'choose-icon' : ''
                                    }`}
                                >
                                    <SampleItem config={appearNode} />
                                </div>
                                <div
                                    onClick={() => this.handleIconsClick(1)}
                                    className={`line-icon-container ${
                                        chooseItem === 'stable-Node' ? 'choose-icon' : ''
                                    }`}
                                >
                                    <SampleItem config={stableNode} />
                                </div>
                                <div
                                    className={`line-icon-container ${
                                        chooseItem === 'disappear-Node' ? 'choose-icon' : ''
                                    }`}
                                    onClick={() => this.handleIconsClick(2)}
                                >
                                    <SampleItem config={disappearNode} />
                                </div>
                                <div
                                    onClick={() => this.handleIconsClick(3)}
                                    className={`line-icon-container ${
                                        chooseItem === 'appear-Link' ? 'choose-icon' : ''
                                    }`}
                                >
                                    <SampleItem config={appearLink} type={'link'} />
                                </div>
                                <div
                                    onClick={() => this.handleIconsClick(4)}
                                    className={`line-icon-container ${
                                        chooseItem === 'stable-Link' ? 'choose-icon' : ''
                                    }`}
                                >
                                    <SampleItem config={stableLink} type={'link'} />
                                </div>
                                <div
                                    onClick={() => this.handleIconsClick(5)}
                                    className={`line-icon-container ${
                                        chooseItem === 'disappear-Link' ? 'choose-icon' : ''
                                    }`}
                                >
                                    <SampleItem config={disappearLink} type={'link'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <NodeLinkStylePanel
                        type={chooseItem.split('-')[1]}
                        optionKey={chooseItem.split('-').join('')}
                        changeOptions={changeOptions}
                        onSubmit={this.props.onSubmit}
                    />
                </div>
            </div>
        )
    }
}
