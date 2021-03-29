import React from 'react'
import { Modal, List, Upload, Button, Slider } from 'antd'
// import 'antd/dist/antd.css'
import './dataPanel.css'
import { connect } from "react-redux"
import { 
	setGraphData, 
} from '../../redux/graphData.redux.js'
import * as testData from '../../data/import/test1.json'
import * as simpleData from '../../data/import/test2.json'
import * as insertData from '../../data/import/test3-insert.json'
import * as shortPathData from '../../data/import/test4.json'
import * as flowData from '../../data/import/test5.json'
import * as emailData from '../../data/import/email-data-6s.json'

const dataset = [
    {
        dataName: 'DynamicData-1',
        description: getDataDescription(testData.default.graphs,'middle'),
        // description: '测试数据，数据量一般',
        data: testData.default
    },
    {
        dataName: 'DynamicData-2',
        description: getDataDescription(simpleData.default.graphs,'small'),
        // description: '测试数据，数据量一般',
        data: simpleData.default
    },
    {
        dataName: 'DynamicData-3',
        description: getDataDescription(insertData.default.graphs,'Insert'),
        // description: '展示插入节点的样例数据',
        data: insertData.default
    },
    {
        dataName: 'DynamicData-4',
        description: getDataDescription(flowData.default.graphs,'MdsOne'),
        // description: '展示mds一维降维数据',
        data: flowData.default
    },
    {
        dataName: 'DynamicData-5',
        description: getDataDescription(shortPathData.default.graphs,'shortPath'),
        // description: '可以展示最短路径',
        data: shortPathData.default
    },
    {
        dataName: 'EmailData',
        description: getDataDescription(emailData.default.graphs,'big'),
        // description: '大数据量',
        data: emailData.default
    }
]

function getDataDescription(data,tag){
    const result = getDataInfo(data)
    const description = `Times: ${result.times}; Nodes: ${result.nodes}; Links: ${result.links}; Tag:${tag}`
    return description
}

function getDataInfo(data) {
    const times = data.length
    let nodeNumber = 0
    let linkNumber = 0
    let nodeMap = new Map()
    let linkMap = new Map()
    data.forEach((d) => {
        d.nodes.forEach((node) => {
            if (!nodeMap.get(node.id)) {
                nodeMap.set(node.id, true)
                nodeNumber++
            }
        })
        d.links.forEach((link) => {
            const key = `${link.source}-${link.target}`
            if (!linkMap.get(key)) {
                linkMap.set(key, true)
                linkNumber++
            }
        })
    })
    return { times, nodes: nodeNumber, links: linkNumber }
}
class DataPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            selected: 0,
            overview: {
                name: '',
                times: 0,
                nodes: 0,
                links: 0
            },
            sliderValue: [],
            groups: [],
            selectedGroupIndex: 0,
            data: {}
        }
    }
    handleChangeData = () => {
        this.setState({
            modalVisible: true
        })
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    selectDataset = (index) => {
        this.setState({
            selected: index
        })
    }
    componentDidMount(){
        const selectedDataName = dataset[this.state.selected].dataName
        if (this.props.graphData && this.props.graphData.length) {
            const overviewInfo = getDataInfo(this.props.graphData)
            overviewInfo.name = selectedDataName
            this.setState({
                overview: overviewInfo,
                sliderValue: [0, overviewInfo.times],
                groups: [
                    {
                        ...overviewInfo,
                        startToEnd: [0, overviewInfo.times]
                    }
                ]
            })
        }
    }
    handleCertainButton = () => {
        const selectedData = dataset[this.state.selected].data.graphs
        const selectedDataName = dataset[this.state.selected].dataName
        if (selectedData && selectedData.length) {
            const overviewInfo = getDataInfo(selectedData)
            overviewInfo.name = selectedDataName
            this.setState({
                modalVisible: false,
                overview: overviewInfo,
                sliderValue: [0, overviewInfo.times],
                groups: [
                    {
                        ...overviewInfo,
                        startToEnd: [0, overviewInfo.times]
                    }
                ]
            })
            // 传递数据
            this.props.setGraphData(dataset[this.state.selected].data.graphs)
        }
    }
    handleAddButton = () => {
        if (this.state.sliderValue[0] !== this.state.sliderValue[1]) {
            const fileData = dataset[this.state.selected].data.graphs
            const groupData = fileData.slice(this.state.sliderValue[0], this.state.sliderValue[1])
            const groupInfo = getDataInfo(groupData)
            this.setState({
                groups: [
                    ...this.state.groups,
                    {
                        ...groupInfo,
                        startToEnd: this.state.sliderValue
                    }
                ]
            })
        }
    }
    handleTimeSliderChange = (value) => {
        this.setState({
            sliderValue: value
        })
    }
    selectGroupItem = (index) => {
        this.setState({
            selectedGroupIndex: index
        })
        const tempStartToEnd = this.state.groups[index].startToEnd
        const selectedData = dataset[this.state.selected].data.graphs
        const data = {
            jsonData: {
                graphs: selectedData.slice(tempStartToEnd[0], tempStartToEnd[1]),
                compareEncode: dataset[this.state.selected].data.compareEncode
            },
            filename: dataset[this.state.selected].dataset
        }
        // 传递数据
        this.props.setGraphData(data.jsonData.graphs)
    }
    render() {
        const marks = {
            0: {
                style: {
                    color: '#000'
                },
                label: 0
            },
            [this.state.overview.times]: {
                style: {
                    color: '#000'
                },
                label: this.state.overview.times
            }
        }
        return (
            <div className="data-box">
                <div className="sub-title">
                    {' '}
                    &nbsp; Data
                    <svg className="icon" onClick={this.handleChangeData} aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-center"></use>
                    </svg>
                </div>
                <div className="divider">Overview</div>
                <div className="item0">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 10
                        }}
                    >
                        <div>{`Name: ${this.state.overview.name}`}</div>
                        <div>{`Times: ${this.state.overview.times}`}</div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 10
                        }}
                    >
                        <div>{`Nodes: ${this.state.overview.nodes}`}</div>
                        <div>{`Links: ${this.state.overview.links}`}</div>
                    </div>
                </div>
                <div className="divider">Selection</div>
                {this.state.overview.times > 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <div
                            style={{
                                width: '15%',
                                marginRight: 10,
                                marginBottom: 15
                            }}
                        >
                            Times:{' '}
                        </div>
                        <Slider
                            range
                            marks={marks}
                            max={this.state.overview.times}
                            defaultValue={[0, this.state.overview.times]}
                            style={{
                                width: '50%'
                            }}
                            onChange={this.handleTimeSliderChange}
                        />
                        <Button
                            // type="primary"
                            size="small"
                            onClick={this.handleAddButton}
                            style={{
                                marginLeft: 10,
                                marginBottom: 15
                            }}
                        >
                            Add
                        </Button>
                    </div>
                ) : null}
                <div className="divider">Group</div>
                {this.state.groups.length > 0 ? (
                    <div
                        className="data-group-container"
                        style={{
                            marginLeft: 5,
                            marginRight: 5,
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.groups}
                            renderItem={(item, index) => (
                                <List.Item onClick={() => this.selectGroupItem(index)}>
                                    <List.Item.Meta
                                        title={
                                            <a href="javascript:void(0)">
                                                {`Times: ${item.startToEnd[0]}-${item.startToEnd[1]}`}
                                                {index === this.state.selectedGroupIndex
                                                    ? ' selected'
                                                    : ''}
                                            </a>
                                        }
                                        description={`Nodes: ${item.nodes}  Links: ${item.links}`}
                                        className={
                                            index === this.state.selectedGroupIndex
                                                ? 'selected'
                                                : ''
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                ) : null}
                <Modal
                    title="Change Dataset"
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancel}
                    footer={[]}
                >
                    <p>Explore a Sample Dataset</p>
                    <List
                        itemLayout="horizontal"
                        dataSource={dataset}
                        renderItem={(item, index) => (
                            <List.Item onClick={() => this.selectDataset(index)}>
                                <List.Item.Meta
                                    title={
                                        <a href="javascript:void(0)">
                                            {item.dataName}
                                            {index === this.state.selected ? ' selected' : ''}
                                        </a>
                                    }
                                    description={item.description}
                                    className={index === this.state.selected ? 'selected' : ''}
                                />
                            </List.Item>
                        )}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: 30
                        }}
                    >
                        <Button
                            // type="primary"
                            size="small"
                            disabled={this.state.selected === -1 ? true : false}
                            onClick={this.handleCertainButton}
                        >
                            确定
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
	graphData: state.graphData
})

const mapDispatchToProps = {
	setGraphData,
} 

export default connect(mapStateToProps,mapDispatchToProps)(DataPanel)