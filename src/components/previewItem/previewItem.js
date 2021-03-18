import React, { useEffect, useState, useRef } from 'react'
import { converObject2Array } from '../../util/preview.js'
import DnetChartContainer from '../dnetCharts/dnetChartContainer/dnetChartContainer.js'
import dnetv from '../../util/dnetv.js'
import { getRenderType } from '../../util/dnetChart'
import { DNET_SAMPLE_WIDTH, DNET_SAMPLE_HEIGHT} from '../../util/const'

export default function PreviewItem(props) {
    // 要计算
    const [subGraphs, setSubGraphs] = useState([])
    const [sumGraphs, setSumGraphs] = useState({ nodes: [], links: [] })
    const [markLine, setMarkLine] = useState({})
    const [renderType, setRenderType] = useState('')
    console.log("previewiem")
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
        <DnetChartContainer
            sampleWidth = {DNET_SAMPLE_WIDTH}
            sampleHeight = {DNET_SAMPLE_HEIGHT}
            isSample={true}
            renderType={renderType}
            subGraphs={subGraphs}
            sumGraphs={sumGraphs}
            config={props.config}
            len={subGraphs.length}
            markLine={markLine}
        />
    )
}
