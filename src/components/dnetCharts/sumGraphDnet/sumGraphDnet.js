import React from 'react'
import NodeItem from '../../nodeItem/nodeItem.js'
import LinkItem from '../../linkItem/linkItem.js'
import ArcLinkItem from '../../arcLinkItem/arcLinkItem.js'
import { 
    getArcPathData
} from '../../../util/dnetChart.js'

export default function SumGraphDnet(props) {
    const { data, config } = props
    const len = data.nodes.length
    if (len === 0) return null
    const { eachWidth, eachHeight, nodeStyle, linkStyle, margin } = config.graph
    const svgWidth = eachWidth + margin*2
    const svgHeight = eachHeight + margin*2
    const { nodeStyle: timeNodeStyle, linkStyle: timeLinkStyle} = config.time.insert
    return (
        <svg
            className="nlg-container-svg"
            width={`${props.sampleWidth ? props.sampleWidth : svgWidth}px`}
            height={`${props.sampleHeight ? props.sampleHeight : svgHeight}px`}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMinYMin"
        >
            <g>
                <g>
                    {data.links.map((v, index) => {
                        const lStyle = v.type === 'time' ? timeLinkStyle: linkStyle
                        if(lStyle.shape === 'line'){
                            return <LinkItem {...props} {...v} {...lStyle} key={`link-${v.id}`} />
                        }else{
                            return <ArcLinkItem
                                key={`link-${v.id}`}
                                {...v}
                                data = {getArcPathData(v.source, v.target)}
                                {...lStyle}
                            />
                        }
                    })}
                </g>
                <g>
                    {data.nodes.map((v, index) => {
                        let nStyle
                        if(v.type === 'time'){
                            nStyle = timeNodeStyle
                        }else if(v.type ==='link-node'){
                            nStyle = {
                                ...nodeStyle,
                                fillColor:linkStyle.strokeColor,
                                shape:'rect',
                                opacity: 0.7
                            }
                        }else{
                            nStyle = nodeStyle
                        }  
                        return <NodeItem {...props} {...v} {...nStyle} key={`node-${v.id}`} />
                    })}
                </g>
            </g>
        </svg>
    )
}
