import React from 'react'

export default function MarkLineItem(props) {
    const { markLine, markLineOptions } = props
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
                                    strokeWidth={`${markLineOptions.strokeWidth}px`}
                                    opacity={markLineOptions.opacity}
                                    strokeDasharray={
                                        markLineOptions.strokeType === 'solid'
                                            ? ''
                                            : markLineOptions.strokeDasharray
                                    }
                                    key={`curve-link-${index}`}
                                />
                            )
                        })}
                    </g>
                )
            })}
        </g>
    )
}
