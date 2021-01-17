import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../linkContainer/linkContainer.js'
import Motion from '../motion/Motion'
import { getLinkOpacity } from '../../util/dnetChart.js'

export default function NodeLinkGraph(props) {
    const { data, width, height } = props
    return (
        <svg
            className="nlg-container-svg"
            width={`${props.sampleWidth? props.sampleWidth:width}px`}
            height={`${props.sampleHeight? props.sampleHeight:height}px`}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin"
        >
            <g>
                {data.links.map((v, i) => {
                    return (
                        <Motion
                            duration={1500}
                            key={`${v.id}_motion`}
                            style={{
                                opacity: getLinkOpacity(v),
                                sourceX: v.source.x,
                                sourceY: v.source.y,
                                targetX: v.target.x,
                                targetY: v.target.y
                            }}
                        >
                            {({ opacity, sourceX, sourceY, targetX, targetY }) => (
                                <LinkContainer
                                    {...props}
                                    {...v}
                                    source={{
                                        ...v.source,
                                        x: sourceX,
                                        y: sourceY
                                    }}
                                    target={{
                                        ...v.target,
                                        x: targetX,
                                        y: targetY
                                    }}
                                    opacity={opacity}
                                    key={`link-${v.id}`}
                                />
                            )}
                        </Motion>
                    )
                })}
            </g>
            <g>
                {data.nodes.map((v, i) => {
                    return (
                        <Motion
                            duration={1500}
                            key={`${v.id}_motion`}
                            style={{
                                opacity: v.opacity,
                                x: v.x,
                                y: v.y
                            }}
                        >
                            {({ opacity, x, y }) => (
                                <NodeItemContainer
                                    {...props}
                                    {...v}
                                    x={x}
                                    y={y}
                                    opacity={opacity}
                                    key={`node-${v.id}`}
                                />
                            )}
                        </Motion>
                    )
                })}
            </g>
        </svg>
    )
}
