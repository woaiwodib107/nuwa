import React from 'react'
import {MARK_POINT_RADIUS as markRadius} from '../../util/const.js'

export default function MarkItemGraph(props) {
    const { data, markLineOptions } = props
    return (
        <g>
            {data.nodes.map((node, index) => {
                return (
                    <rect
                        key={`${node.id}-${index}`}
                        id={node.id}
                        x={node.x - markRadius/2}
                        y={node.y - markRadius/2}
                        fill={markLineOptions.strokeColor}
                        strokeWidth={`0px`}
                        width={markRadius * 2}
                        height={markRadius * 2}
                        opacity={0.3}
                    ></rect>
                )
            })}
        </g>
    )
}
