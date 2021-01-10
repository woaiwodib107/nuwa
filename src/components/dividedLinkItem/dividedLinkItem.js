import React from 'react'
import { getLineData } from '../../util/dnetChart.js'

export default function DividedLinkItem(props) {
    // console.log("------source---target----f--", props.source, props.target)
    const { data, len, colorScale, strokeWidth, strokeType, existTimeIndex } = props
    const lineData = getLineData(len, data)
    return (
        <g>
            {lineData.map((v, index) => {
                if (existTimeIndex[index] === 1) {
                    return (
                        <line
                            key={index} //这里不对
                            x1={v.source.x}
                            y1={v.source.y}
                            x2={v.target.x}
                            y2={v.target.y}
                            stroke={colorScale(index)}
                            strokeWidth={`${strokeWidth}px`}
                            strokeDasharray={
                                strokeType === 'solid'
                                    ? ''
                                    : `${strokeWidth * 2},${strokeWidth * 2} `
                            }
                        ></line>
                    )
                } else {
                    return (
                        <line
                            key={index} //这里不对
                            x1={v.source.x}
                            y1={v.source.y}
                            x2={v.target.x}
                            y2={v.target.y}
                            stroke={'#eeeeee'}
                            strokeWidth={`${strokeWidth}px`}
                            strokeDasharray={
                                strokeType === 'solid'
                                    ? ''
                                    : `${strokeWidth * 2},${strokeWidth * 2} `
                            }
                        ></line>
                    )
                }
            })}
        </g>
    )
}
