import React from 'react'
import { getBarChartNodePath } from '../../util/dnetChart.js'

export default function BarChartNodeItem(props) {
    const { data, len, colorScale, existTimeIndex, strokeColor, strokeWidth, strokeType, radius,fillColor,isColor = true } = props
    const barChartData = getBarChartNodePath(radius, len)
    return (
        <>
            <g transform={`translate(${data.x}, ${data.y})`}>
                {barChartData.map((itemData, index) => {
                  if(existTimeIndex[index]===1){
                    return (
                        <rect
                            key={`bar-chart-node-${index}`}
                            id={props.timeId}
                            x={itemData.x}
                            y={itemData.y}
                            fill={isColor ? colorScale(index):fillColor}
                            stroke={strokeColor}
                            strokeWidth={"0px"}
                            width={itemData.width}
                            height={itemData.height}
                            opacity={props.opacity}
                        />
                    )
                  }else{
                    return (
                        <rect
                            key={`bar-chart-node-${index}`}
                            id={props.timeId}
                            x={itemData.x}
                            y={itemData.y}
                            fill={'#eeeeee'}
                            stroke={strokeColor}
                            strokeWidth={"0px"}
                            width={itemData.width}
                            height={itemData.height}
                            opacity={props.opacity}
                        />
                    )
                  } 
                })}
            </g>
            <rect
                x={data.x - radius}
                y={data.y - radius}
                stroke={strokeColor}
                fill={'none'}
                strokeWidth={`${strokeWidth}px`}
                width={radius * 2}
                height={radius * 2}
                strokeDasharray={
                    strokeType === 'solid' ? '' : `${radius / 2},${radius / 2} `
                }
            ></rect>
        </>
    )
}
