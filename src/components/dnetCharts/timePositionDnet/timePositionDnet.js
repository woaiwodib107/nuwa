import React from 'react'
import LinkContainer from '../../linkContainer/linkContainer.js'
import DividedLinkItem from '../../dividedLinkItem/dividedLinkItem.js'
import NodeContainer from '../../nodeContainer/nodeContainer.js'
import { getSvgWidthHeight } from '../../../util/dnetChart'
import MarkLineItem from '../../markLineItem/markLineItem.js'
import { getPiePathColor } from '../../../util/dnetChart.js'

export default function TimePositionDnet(props) {
    const { data, config, markLine } = props
    const dataLength = data.length
    if (dataLength === 0) return null
    const { svgWidth, svgHeight } = getSvgWidthHeight(config, dataLength)
    const markLineOptions = config.time.markLine
    const { linkStyle, layout } = config.graph

    // 确定颜色比例
    const { startColor = '#FD8F8F', endColor = '#90B5FB' } = config.time.color
    let colorScale = getPiePathColor(dataLength, startColor, endColor)
    const timeChooseTypes = config.time.chooseTypes
    const isColor = timeChooseTypes.indexOf('color') > -1
    const isChart = timeChooseTypes.indexOf('chart') > -1
    const isMatrix = layout.chooseType === 'matrix'
    return (
        <svg
            className="nlg-container-svg"
            width={`${props.sampleWidth ? props.sampleWidth : svgWidth}px`}
            height={`${props.sampleHeight ? props.sampleHeight : svgHeight}px`}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMinYMin"
        >
            {markLine ? (
                <MarkLineItem markLine={markLine} markLineOptions={markLineOptions} />
            ) : null}
            {data.map((dataItem, index) => {
                return (
                    <g key={`subGraph-${index}`}>
                        <g>
                            {(isChart && !isMatrix)
                                ? dataItem.links.map((link, index) => {
                                      return (
                                          <DividedLinkItem
                                              len={dataLength}
                                              data={link}
                                              existTimeIndex={link.existTimeIndex}
                                              colorScale={colorScale}
                                              isColor={isColor}
                                              key={`time-color-link-${index}`}
                                              {...linkStyle}
                                          />
                                      )
                                  })
                                : dataItem.links.map((link) => {
                                      return <LinkContainer {...link} key={`link-${link.id}`} />
                                  })}
                        </g>
                        <g>
                            <NodeContainer
                                len={dataLength}
                                data={dataItem.nodes}
                                config={config}
                                isSum={false}
                            />
                        </g>
                    </g>
                )
            })}
        </svg>
    )
}
