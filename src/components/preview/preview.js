import React, { useEffect, useState, useRef } from 'react'
import { converObject2Array } from '../../util/preview.js'
import DnetChartContainer from '../dnetCharts/dnetChartContainer/dnetChartContainer.js'
import dnetv from '../../util/dnetv.js'
import { getRenderType } from '../../util/dnetChart'
import { connect } from "react-redux"

function Preview(props) {
    // 要计算
    const [subGraphs, setSubGraphs] = useState([])
    const [sumGraphs, setSumGraphs] = useState({ nodes: [], links: [] })
    const [markLine, setMarkLine] = useState({})
    const [renderType, setRenderType] = useState('')

    useEffect(() => {
        if (props.data) {
            let dnetvInstance = dnetv()
            dnetvInstance.initData(props.data, props.config)
            setSubGraphs(converObject2Array(dnetvInstance.timeGraphs))
            setMarkLine(dnetvInstance.markLine)
            setSumGraphs(dnetvInstance.sumGraphs)
        }
    }, [props.config, props.data])

    useEffect(() => {
        if (props.data) {
            setRenderType(getRenderType(props.config.time.chooseTypes))
        } else {
            setRenderType('')
        }
    }, [props.data, props.config.time.chooseTypes])
    return (
        <div
            style={{
                width: `${props.width ? props.width : 1035}px`,
                height: `${props.height ? props.height : 500}px`,
            }}
            className="preview-box"
        >
            <div className="sub-title">
                &nbsp;Preview
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play"></use>
                </svg>
            </div>
            <div
                style={{
                    width: '100%',
                    height: '730px',
                    overflowX: 'auto',
                    overflowY:'auto'
                }}
            >
                <DnetChartContainer
                    renderType= {renderType}
                    subGraphs = {subGraphs}
                    sumGraphs = {sumGraphs}
                    config = {props.config}
                    len = {subGraphs.length}
                    markLine = {markLine}
                />
            </div>
           
        </div>
    )
}


const mapStateToProps = (state)=>({
	data: state.graphData,
    config: state.config
})

const mapDispatchToProps = {
} 

export default connect(mapStateToProps,mapDispatchToProps)(Preview)
