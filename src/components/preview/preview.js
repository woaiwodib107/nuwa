import React, { useEffect, useState, useRef } from 'react'
import { converObject2Array } from '../../util/preview.js'
import TimePositionDnet from '../dnetCharts/timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../dnetCharts/timeAnimationDnet/timeAnimationDnet.js'
import TimeColorDnet from '../dnetCharts/timeColorDnet/timeColorDnet.js'
import TimeChartDnet from '../dnetCharts/timeChartDnet/timeChartDnet.js'
import TimeLinkDnet from '../dnetCharts/timeLinkDnet/timeLinkDnet.js'
import ComparisonPositionDnet from '../dnetCharts/comparisonPositionDnet/comparisonPositionDnet.js'
import ComparisonAnimationDnet from '../dnetCharts/comparisonAnimationDnet/comparisonAnimationDnet.js'
import dnetv from './dnetv'
import { getRenderType } from '../../util/dnetChart'

export default function Preview(props) {
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

    // console.log("--props.config--", props.config)
    // console.log("--subGraphs--", subGraphs)
    // console.log("--sumGraphs--", sumGraphs)
    // console.log("--markLine--", markLine)
    return (
        <div
            style={{
                width: `${props.width ? props.width : 1010}px`,
                height: `${props.height ? props.height : 560}px`
            }}
            className="preview-box"
        >
            <div className="sub-title">
                &nbsp;Preview
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play"></use>
                </svg>
            </div>
            {(() => {
                switch (renderType) {
                    case 'timeLine':
                        return (
                            <TimePositionDnet
                                markLine={markLine}
                                data={subGraphs}
                                config={props.config}
                            />
                        )
                    case 'animation':
                        return <TimeAnimationDnet data={subGraphs} config={props.config} />
                    case 'color':
                        return (
                            <TimeColorDnet
                                len={subGraphs.length}
                                data={sumGraphs}
                                config={props.config}
                            />
                        )
                    case 'other':
                        return (
                            <TimeLinkDnet
                                data={subGraphs}
                                config={props.config}
                                markLine={markLine}
                            />
                        )
                    default:
                        return null
                }
            })()}
        </div>
    )
}
