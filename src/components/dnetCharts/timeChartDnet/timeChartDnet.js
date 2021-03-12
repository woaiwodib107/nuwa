import React from 'react'
import ChartNodeItem from '../../chartNodeItem/chartNodeItem.js'
import { getPiePathColor } from '../../../util/dnetChart.js'
import LinkItem from '../../linkItem/linkItem.js'
import ArcLinkItem from '../../arcLinkItem/arcLinkItem.js'
import { 
    getArcPathData
} from '../../../util/dnetChart.js'

export default function TimeChartDnet(props) {
    if (props.len === 0) return null
    let colorScale = getPiePathColor(props.len, '#FD8F8F', '#90B5FB')
    const { eachWidth, eachHeight, margin, nodeStyle, linkStyle } = props.config.graph
    const isColor = props.config.time.chooseTypes.indexOf('color')>-1
    const svgWidth = eachWidth + margin*2
    const svgHeight = eachHeight + margin*2
    return (
            <svg
                className="nlg-container-svg"
                width={`${props.sampleWidth? props.sampleWidth:svgWidth}px`}
                height={`${props.sampleHeight? props.sampleHeight:svgHeight}px`}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMinYMin"
            >
                {props.data.links.map((dataItem, index) => {
                    if(linkStyle.shape === 'line'){
                        return <LinkItem {...dataItem} {...linkStyle} key={`link-line-${dataItem.id}`} />
                    }else{
                        return <ArcLinkItem
                            key={`link-arc-${dataItem.id}`}
                            {...dataItem}
                            data = {getArcPathData(dataItem.source, dataItem.target)}
                            {...linkStyle}
                        />
                    }
                })}
                {props.data.nodes.map((dataItem, index) => {
                    return (
                        <ChartNodeItem
                            data={dataItem}
                            existTimeIndex={dataItem.existTimeIndex}
                            colorScale={colorScale}
                            isColor={isColor}
                            key={`time-color-node-${index}`}
                            {...nodeStyle}
                        />
                    )
                })}
            </svg>
    )
}
