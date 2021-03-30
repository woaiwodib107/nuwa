import React from 'react'
import DividedLinkItem from '../../dividedLinkItem/dividedLinkItem.js'
import LinkContainer from '../../linkContainer/linkContainer.js'
import NodeContainer from '../../nodeContainer/nodeContainer.js'
import { getPiePathColor } from '../../../util/dnetChart.js'

export default function TimeSumDnet(props) {
    if (props.len === 0) return null
    const timeChooseTypes = props.config.time.chooseTypes

    // isColor是true以及isSample是false的时候，是渲染图例的
    const legendData = new Array(props.len).fill(0)
    const singleLegendWidth = 15
    // 确定颜色比例尺
    const { startColor = '#FD8F8F', endColor = '#90B5FB' } = props.config.time.color
    let colorScale = getPiePathColor(props.len, startColor, endColor)
    const { eachWidth, eachHeight, margin, nodeStyle, linkStyle,layout } = props.config.graph

    const isColor = timeChooseTypes.indexOf('color') > -1
    const isChart = isColor || timeChooseTypes.indexOf('chart') > -1
    const isMatrix = layout.chooseType === 'matrix'
    
    const svgWidth = eachWidth + margin * 2
    const svgHeight = eachHeight + margin * 2

    return (
        <>
            {!props.isSample && isColor ? (
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
                width={`${props.sampleWidth ? props.sampleWidth : svgWidth}px`}
                height={`${props.sampleHeight ? props.sampleHeight : svgHeight}px`}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMinYMin"
            >
                {
                    /** 链接绘制 */
                    isChart && !isMatrix
                        ? props.data.links.map((dataItem, index) => {
                              return (
                                  <DividedLinkItem
                                      len={props.len}
                                      data={dataItem}
                                      existTimeIndex={dataItem.existTimeIndex}
                                      colorScale={colorScale}
                                      isColor={isColor}
                                      key={`time-color-link-${index}`}
                                      {...linkStyle}
                                  />
                              )
                          })
                        : props.data.links.map((dataItem, index) => {
                              return <LinkContainer {...dataItem} key={`link-${dataItem.id}`} />
                          })
                }
                <NodeContainer
                    len = {props.len}
                    data = {props.data.nodes}
                    config = {props.config}
                    isSum={true}
                />
            </svg>
        </>
    )
}
