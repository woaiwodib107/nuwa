import React from 'react'
import PieNodeItem from '../../pieNodeItem/pieNodeItem.js'
import BarChartNodeItem from '../../barChartNodeItem/barChartNodeItem.js'
import DividedLinkItem from '../../dividedLinkItem/dividedLinkItem.js'
import { getPiePathColor } from '../../../util/dnetChart.js'

export default function TimeColorDnet(props) {
    if (props.len === 0) return null
    const legendData = new Array(props.len).fill(0)
    const singleLegendWidth = 15
    let colorScale = getPiePathColor(props.len, '#FD8F8F', '#90B5FB')
    const { eachWidth, eachHeight, margin, nodeStyle, linkStyle } = props.config.graph
    // console.log("props.data", props.data)
    const svgWidth = eachWidth + margin*2
    const svgHeight = eachHeight + margin*2
    return (
        <>
            {!props.isSample ? (
                <div
                    style={{
                        width: '100%',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        margin: '10px'
                    }}
                >
                    <div
                        className="legend-text"
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        0
                    </div>
                    <svg
                        className="legend-svg"
                        width={`${singleLegendWidth * props.len}px`}
                        height={'20px'}
                        viewBox={`0 0 ${singleLegendWidth * props.len} 20`}
                        preserveAspectRatio="xMinYMin"
                    >
                        {legendData.map((dataItem, index) => {
                            return (
                                <rect
                                    key={`tc-legend-${index}`}
                                    x={index * singleLegendWidth}
                                    y={0}
                                    fill={colorScale(index)}
                                    width={singleLegendWidth}
                                    height={singleLegendWidth}
                                ></rect>
                            )
                        })}
                    </svg>
                    <div
                        style={{
                            margin: '0 10px'
                        }}
                    >
                        {props.len - 1}
                    </div>
                </div>
            ) : null}
            <svg
                className="nlg-container-svg"
                width={`${props.sampleWidth? props.sampleWidth:svgWidth}px`}
                height={`${props.sampleHeight? props.sampleHeight:svgHeight}px`}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMinYMin"
            >
                {props.data.links.map((dataItem, index) => {
                    return (
                        <DividedLinkItem
                            len={props.len}
                            data={dataItem}
                            existTimeIndex={dataItem.existTimeIndex}
                            colorScale={colorScale}
                            key={`time-color-link-${index}`}
                            {...linkStyle}
                        />
                    )
                })}
                {props.data.nodes.map((dataItem, index) => {
                    return nodeStyle.shape==='circle'?
                            <PieNodeItem
                                len={props.len}
                                data={dataItem}
                                existTimeIndex={dataItem.existTimeIndex}
                                colorScale={colorScale}
                                key={`time-color-node-${index}`}
                                {...nodeStyle}
                            />:
                            <BarChartNodeItem
                                len={props.len}
                                data={dataItem}
                                existTimeIndex={dataItem.existTimeIndex}
                                colorScale={colorScale}
                                key={`time-color-node-${index}`}
                                {...nodeStyle}
                            />
                })}
            </svg>
        </>
    )
}
