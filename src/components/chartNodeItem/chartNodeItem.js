import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import { getChartLineData } from '../../util/dnetChart.js'

export default function ChartNodeItem(props) {
    const { data,isColor, colorScale, shape, existTimeIndex, strokeColor, strokeWidth,fillColor, strokeType, radius } = props
    const pathDatas = getChartLineData(radius, existTimeIndex, colorScale, isColor, strokeColor)
    return (
        <>
            <NodeItem
                x={data.x}
                y={data.y}
                shape={shape}
                fillColor={fillColor}
                strokeColor={strokeColor}
                strokeWidth={0}
                radius={radius}
                strokeType={strokeType}
            >
            </NodeItem>
            <g transform={`translate(${data.x}, ${data.y})`}>
                {
                    pathDatas.map((pathData, index)=>{
                        return <path
                            key={`chart-item-${index}-${pathData.data}`}
                            d={pathData.data}
                            stroke={pathData.color}
                            strokeWidth={`${strokeWidth}px`}
                            fill={'none'}
                        ></path>
                    })
                }
            </g>
            <NodeItem
                x={data.x}
                y={data.y}
                shape={shape}
                fillColor={'none'}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                radius={radius}
                strokeType={strokeType}
            >
            </NodeItem>
        </>)
}
