import React from 'react'
import {
    getPiePathColor, 
} from '../../util/dnetChart.js'

export default function MarkLineItem(props) {
    const { markLine, markLineOptions } = props
    // let colorScale = getPiePathColor(200, '#ECAA7B', '#98DDF3')
    return (
        <g>
            {markLine.map((links, index) => {
                return (
                    <g key={`curve-g-${index}`}>
                        {links.data.map((v, index) => {
                            return (
                                <path
                                    d={v}
                                    stroke={markLineOptions.strokeColor}
                                    // stroke={colorScale(index)}
                                    strokeWidth={`${markLineOptions.strokeWidth}px`}
                                    opacity={markLineOptions.opacity}
                                    fill={"none"}
                                    strokeDasharray={
                                        markLineOptions.strokeType === 'solid'
                                            ? ''
                                            : markLineOptions.strokeDasharray
                                    }
                                    key={`curve-link-${index}`}
                                />
                            )
                        })}
                        {/* {links.data.slice(100,200).map((v, index) => {
                            return (
                                <path
                                    d={v}
                                    // stroke={markLineOptions.strokeColor}
                                    stroke={markLineOptions.strokeColor}
                                    strokeWidth={`${markLineOptions.strokeWidth}px`}
                                    opacity={markLineOptions.opacity}
                                    fill={"none"}
                                    strokeDasharray={
                                        markLineOptions.strokeType === 'solid'
                                            ? ''
                                            : markLineOptions.strokeDasharray
                                    }
                                    key={`curve-link-${index}`}
                                />
                            )
                        })} */}
                    </g>
                )
            })}
        </g>
    )
}
