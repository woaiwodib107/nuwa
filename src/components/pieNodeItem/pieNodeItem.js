import React from 'react'
import { getPiePathData } from '../../util/dnetChart.js'

export default function PieNodeItem(props) {
    const { data, len, colorScale, existTimeIndex, strokeColor, strokeWidth, strokeType, radius } = props
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
                            fill={colorScale(index)}
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
    // if (props.shape === 'circle') {
    //     return (
    //         <circle
    //             id={props.timeId}
    //             cx={props.x + (props.xOffset ? props.xOffset : 0)}
    //             cy={props.y + (props.yOffset ? props.yOffset : 0)}
    //             fill={props.fillColor}
    //             stroke={props.strokeColor}
    //             strokeWidth={`${props.strokeWidth}px`}
    //             r={props.radius}
    //             strokeDasharray={
    //                 props.strokeType === 'solid' ? '' : `${props.radius / 2},${props.radius / 2} `
    //             }
    //         ></circle>
    //     )
    // } else if (props.shape === 'rect') {
    //     return (
    //         <rect
    //             id={props.timeId}
    //             x={props.x + (props.xOffset ? props.xOffset : 0) - props.radius}
    //             y={props.y + (props.yOffset ? props.yOffset : 0) - props.radius}
    //             fill={props.fillColor}
    //             stroke={props.strokeColor}
    //             strokeWidth={`${props.strokeWidth}px`}
    //             width={props.radius * 2}
    //             height={props.radius * 2}
    //             strokeDasharray={
    //                 props.strokeType === 'solid' ? '' : `${props.radius / 2},${props.radius / 2} `
    //             }
    //         ></rect>
    //     )
    // }
}
