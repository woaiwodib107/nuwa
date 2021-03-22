import React from 'react'
import { getPiePathData } from '../../util/dnetChart.js'

export default function PieNodeItem(props) {
    const { data, len, colorScale, existTimeIndex, strokeColor, strokeWidth, strokeType, radius, fillColor,isColor = true } = props
    // return null
    const pathData = getPiePathData(radius, len)
    return (
        <>
            <g transform={`translate(${data.x}, ${data.y})`}>
                {pathData.map((v, index) => {
                  if(existTimeIndex[index]===1){
                    return (
                        <path
                            d={v}
                            fill={isColor ? colorScale(index): fillColor}
                            key={`pie-node-path-${index}`}
                        />
                    )
                  }else{
                    return (
                        <path
                            d={v}
                            fill={'#eeeeee'}
                            key={`pie-node-path-${index}`}
                        />
                    )
                  } 
                })}
            </g>
            <circle
                cx={data.x}
                cy={data.y}
                stroke={strokeColor}
                fill={'none'}
                strokeWidth={`${strokeWidth}px`}
                r={radius}
                strokeDasharray={
                    strokeType === 'solid' ? '' : `${radius / 2},${radius / 2} `
                }
            ></circle>
        </>
    )
}
