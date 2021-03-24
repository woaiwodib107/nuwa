import React from 'react'
import LinkContainer from '../linkContainer/linkContainer.js'
import DividedLinkItem from '../dividedLinkItem/dividedLinkItem.js'
import NodeContainer from '../nodeContainer/nodeContainer.js'
// import Motion from '../motion/Motion'
import { getLinkOpacity, getPiePathColor } from '../../util/dnetChart.js'
import MarkLineItem from '../markLineItem/markLineItem.js'
import MarkItemGraph from '../markItemGraph/markItemGraph.js'

export default function NodeLinkGraph(props) {
    const {
        data,
        config,
        dataLength,
        width,
        height,
        sumData,
        markLine,
        markLineOptions,
        hasTimeLine
    } = props
    // 确定颜色比例
    const { linkStyle, layout } = config.graph
    const { startColor = '#FD8F8F', endColor = '#90B5FB' } = config.time.color
    let colorScale = getPiePathColor(dataLength, startColor, endColor)
    const timeChooseTypes = config.time.chooseTypes
    const isColor = timeChooseTypes.indexOf('color') > -1
    const isChart = timeChooseTypes.indexOf('chart') > -1
    const isMatrix = layout.chooseType === 'matrix'
    return (
        <svg
            className="nlg-container-svg"
            width={`${props.sampleWidth ? props.sampleWidth : width}px`}
            height={`${props.sampleHeight ? props.sampleHeight : height}px`}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin"
        >
            {markLine ? (
                hasTimeLine ? (
                    <MarkLineItem markLine={markLine} markLineOptions={markLineOptions} />
                ) : (
                    <MarkItemGraph data={sumData} markLineOptions={markLineOptions} />
                )
            ) : null}
            <g>
                {isChart && !isMatrix
                    ? data.links.map((link, index) => {
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
                    : data.links.map((link) => {
                          return <LinkContainer {...link} key={`link-${link.id}`} />
                      })}
                {/* {data.links.map((v, i) => {
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
                })} */}
            </g>
            <g>
                <NodeContainer len={dataLength} data={data.nodes} config={config} isSum={false} />
                {/* {data.nodes.map((v, i) => {
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
                })} */}
            </g>
        </svg>
    )
}
