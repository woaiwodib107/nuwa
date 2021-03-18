import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../../linkContainer/linkContainer.js'
import { getSvgWidthHeight } from '../../../util/dnetChart'
import MarkLineItem from '../../markLineItem/markLineItem.js'

export default function TimePositionDnet(props) {
    const { data, config, markLine } = props
    const len = data.length
    if (len === 0) return null
    const { svgWidth, svgHeight } = getSvgWidthHeight(config, len)
    const markLineOptions = props.config.time.markLine
    return (
        <svg
            className="nlg-container-svg"
            width={`${props.sampleWidth? props.sampleWidth:svgWidth}px`}
            height={`${props.sampleHeight? props.sampleHeight:svgHeight}px`}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMinYMin"
        >
            {
                markLine ? <MarkLineItem
                    markLine = {markLine}
                    markLineOptions = {markLineOptions}
                />: null
            }
            {data.map((dataItem, index) => {
                return (
                    <g key={`subGraph-${index}`}>
                        <g>
                            {dataItem.links.map((v) => {
                                return <LinkContainer {...props} {...v} key={`link-${v.id}`} />
                            })}
                        </g>
                        <g>
                            {dataItem.nodes.map((v) => {
                                return (
                                    <NodeItemContainer {...props} {...v} key={`node-${v.id}`} />
                                )
                            })}
                        </g>
                    </g>
                )
            })}
        </svg>
    )
}
