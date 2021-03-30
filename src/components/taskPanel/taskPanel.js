import React from 'react'
import SampleItem from '../sampleItem/sampleItem.js'
import { Radio, Select, Collapse, Checkbox, Col, Row } from 'antd'
import NodeLinkStylePanel from '../nodeLinkStylePanel/nodeLinkStylePanel.js'
import {
    TIME_PANEL_INPUT_WIDTH as TPIW,
    TIME_TIMELINE_ELEMENT,
    KEYFRAM_OPTIONS,
    TASK_FIND_ATTR,
    TASK_FIND_RELATION,
    TASK_FIND_STRUCTURE,
    TASK_PATTERN_TYPES,
    TASK_CHANGE_TYPES
} from '../../util/const'
import { COMPARISON_CONFIG } from '../../util/defaultConfig.js'
import { getConfigPatternChange } from '../../util/dnetChart.js'
import './comparisonPanel.css'
import { connect } from 'react-redux'
import { modifyConfig } from '../../redux/config.redux.js'

const { Option } = Select
const { Panel } = Collapse
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

const changeOptions = [
    'appear-Node',
    'stable-Node',
    'disappear-Node',
    'appear-Link',
    'stable-Link',
    'disappear-Link'
]

class TaskPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indeterminate: true,
            checkAll: false,
            taskPattern: 'graph',
            taskChange :'all'
        }
    }
    handleOptionChange = (value) => {
        this.handleComparisonChange({ ...value })
    }
    handleSelectChange = (value, key, option) => {
        if (option === 'comparison') {
            this.handleComparisonChange({ [key]: value })
        } else if (option === 'find') {
            this.handleFindChange({ [key]: value })
        }
    }
    handleColumnChange = (e) => {
        const nodeOrLink = this.props.options.comparison.chooseItem.split('-')[1]
        this.handleComparisonChange({ chooseItem: `${e.target.value}-${nodeOrLink}` })
    }
    handleRowChange = (e) => {
        const changeAttr = this.props.options.comparison.chooseItem.split('-')[0]
        this.handleComparisonChange({ chooseItem: `${changeAttr}-${e.target.value}` })
    }
    handleIconsClick = (index) => {
        this.handleComparisonChange({ chooseItem: index2chooseItem[Number(index)] })
    }
    handleIsOnChange = (value) => {
        this.handleComparisonChange({ isOn: value })
    }

    handleCheckChange = (list) => {
        this.handleComparisonChange({ chooseTypes: list })
        this.setState({ indeterminate: !!list.length && list.length < COMPARISON_CONFIG.length })
        this.setState({ checkAll: list.length === COMPARISON_CONFIG.length })
    }
    handleAllCheckChange = (e) => {
        this.handleComparisonChange({ chooseTypes: e.target.checked ? COMPARISON_CONFIG : [] })
        this.setState({ indeterminate: false })
        this.setState({ checkAll: e.target.checked })
    }

    handleComparisonChange = (value) => {
        this.changeTaskConfig({
            comparison: {
                ...this.props.options.comparison,
                ...value
            }
        })
    }
    handleFindChange = (value) => {
        this.changeTaskConfig({
            find: {
                ...this.props.options.find,
                ...value
            }
        })
    }

    handleTaskPanelChange = (key, value) => {
        this.changeTaskConfig({
            [key]: value
        })
    }



    handleTaskPatternSelect = (value) => {
        this.setState({
            taskPattern: value
        })
        switch(value){
            case 'graph':
                this.handleTaskPanelChange('taskType', 'none')
                break
            case 'compare-structure':
                this.handleTaskPanelChange('taskType', 'comparison')
                this.handleTaskPanelChange('basedType', 'structure')
                break
            case 'shortest-path(A-F)':
                this.handleTaskPanelChange('taskType', 'find')
                this.handleTaskPanelChange('basedType', 'structure')
                this.handleSelectChange('shortest-path', 'structure', 'find')
                break
            case 'dumb-bell':
                this.handleTaskPanelChange('taskType', 'find')
                this.handleTaskPanelChange('basedType', 'structure')
                this.handleSelectChange('dumb-bell', 'structure', 'find')
                break
            case 'compare-degree':
                this.handleTaskPanelChange('taskType', 'comparison')
                this.handleTaskPanelChange('basedType', 'attr')
                break
            case 'find-degree':
                this.handleTaskPanelChange('taskType', 'find')
                this.handleTaskPanelChange('basedType', 'attr')
                break
            default:
                this.handleTaskPanelChange('taskType', 'none')
        }
    }
    handleTaskChangeSelect = (value) => {
        this.setState({
            taskChange: value
        })
    }
    changeTaskConfig = (value) => {
        this.props.modifyConfig({ key: 'task', value })
    }

    render() {
        const { comparison, find, taskType, basedType } = this.props.options
        const patternAndChange = getConfigPatternChange(this.props.options)
        const {
            chooseItem,
            keyFrame,
            elements,
            chooseTypes,
            appearNode,
            appearLink,
            stableNode,
            stableLink,
            disappearNode,
            disappearLink
        } = comparison
        let changeKey = chooseItem.split('-')
        changeKey = changeKey.join('')
        const changeOptions = comparison[changeKey]
        return (
            <div className="Comparison-box combine-inner-border">
                <div className="combine-inner-title">
                    &nbsp;Pattern and Change
                </div>

                <div className="encoding-table-container">
                    <div className="change-option-item">
                        <div>Pattern:</div>
                        <Select
                            value={patternAndChange.pattern}
                            style={{ width: 125 }}
                            onChange={(value) => this.handleTaskPatternSelect(value)}
                        >
                            {TASK_PATTERN_TYPES.map((v) => {
                                return (
                                    <Option key={v} value={v}>
                                        {v}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="change-option-item">
                        <div>Change:</div>
                        <Select
                            value={patternAndChange.change}
                            style={{ width: 125 }}
                            onChange={(value) => this.handleTaskChangeSelect(value)}
                        >
                            {TASK_CHANGE_TYPES.map((v) => {
                                return (
                                    <Option key={v} value={v}>
                                        {v}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="change-option-item">
                        <Collapse
                            expandIconPosition={'right'}
                            style={{
                                backgroundColor: '#ffffff',
                                width: '100%'
                            }}
                            defaultActiveKey={['1']}
                        >
                            <Panel key="1" className="nlsp-panel" header={'chooseTypes'}>
                                <Col
                                    style={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'flex-start',
                                        paddingLeft: '10px'
                                    }}
                                >
                                    <Checkbox
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.handleAllCheckChange}
                                        checked={this.state.checkAll}
                                    >
                                        all
                                    </Checkbox>
                                </Col>
                                <Checkbox.Group
                                    style={{
                                        textAlign: 'left',
                                        width: '100%',
                                        paddingLeft: '10px'
                                    }}
                                    value={chooseTypes}
                                    onChange={this.handleCheckChange}
                                >
                                    {[0, 2, 4, 6].map((v) => {
                                        return (
                                            <Row
                                                style={{
                                                    width: '100%'
                                                }}
                                                key={`row-${v}`}
                                            >
                                                <Col
                                                    style={{
                                                        width: '55%',
                                                        display: 'flex',
                                                        flexDirection: 'flex-start'
                                                    }}
                                                >
                                                    <Checkbox value={COMPARISON_CONFIG[v]}>
                                                        {COMPARISON_CONFIG[v]}
                                                    </Checkbox>
                                                </Col>
                                                <Col
                                                    style={{
                                                        width: '45%',
                                                        display: 'flex',
                                                        flexDirection: 'flex-start'
                                                    }}
                                                >
                                                    <Checkbox value={COMPARISON_CONFIG[v + 1]}>
                                                        {COMPARISON_CONFIG[v + 1]}
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </Checkbox.Group>
                            </Panel>
                        </Collapse>
                    </div>
                    {/* {taskType === 'comparison' ? (
                        <>
                            <div className="change-option-item">
                                <div>KeyFrame:</div>
                                <Select
                                    value={keyFrame}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(value) =>
                                        this.handleSelectChange(value, 'keyFrame', 'comparison')
                                    }
                                >
                                    {KEYFRAM_OPTIONS.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="change-option-item">
                                <div>Elements:</div>
                                <Select
                                    value={elements}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(value) =>
                                        this.handleSelectChange(value, 'elements', 'comparison')
                                    }
                                >
                                    {TIME_TIMELINE_ELEMENT.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </>
                    ) : null} */}
                    {/* {taskType === 'find' && basedType === 'attr' ? (
                        <>
                            <div className="change-option-item">
                                <div>Attr:</div>
                                <Select
                                    value={find.attr}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(value) =>
                                        this.handleSelectChange(value, 'attr', 'find')
                                    }
                                >
                                    {TASK_FIND_ATTR.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="change-option-item">
                                <div>Relation:</div>
                                <Select
                                    value={find.relation}
                                    style={{ width: TPIW }}
                                    size="small"
                                    onChange={(value) =>
                                        this.handleSelectChange(value, 'relation', 'find')
                                    }
                                >
                                    {TASK_FIND_RELATION.map((v) => {
                                        return (
                                            <Option key={v} value={v}>
                                                {v}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="change-option-item">
                                <div>Value:</div>
                                <InputNumber
                                    size="small"
                                    min={0}
                                    max={100}
                                    value={find.value}
                                    onChange={(e) => this.handleFindChange({ value: Number(e) })}
                                    style={{ width: TPIW }}
                                />
                            </div>
                        </>
                    ) : null} */}

                    <div className="comparison-table-container">
                        <div className="table-first-line">
                            <div className="blank-icon"></div>
                            <Radio.Group
                                onChange={this.handleColumnChange}
                                value={chooseItem.split('-')[0]}
                                className="first-line-right"
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
                        onSubmit={this.handleComparisonChange}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    options: state.config.task
})

const mapDispatchToProps = {
    modifyConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPanel)
