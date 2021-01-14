import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../../linkContainer/linkContainer.js'
import { getSvgWidthHeight } from '../../../util/dnetChart'


export default function TimePositionDnet(props) {
    const { data, config, markLine } = props
    const len = data.length
    if (len === 0) return null
    
    const {svgWidth, svgHeight} = getSvgWidthHeight(config, len)
    const markLineOptions = props.config.time.markLine
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimePositionDnet"
        >
            <svg
                className="nlg-container-svg"
                width={`${svgWidth}px`}
                height={`${svgHeight}px`}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {markLine
                        ? markLine.map((links, index) => {
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
                                                        ?''
                                                        :markLineOptions.strokeDasharray
                                                  }
                                                  key={`curve-link-${index}`}
                                              />
                                          )
                                      })}
                                  </g>
                              )
                          })
                        : null}
                </g>
                {data.map((dataItem, index) => {
                    return (
                        <g key={`subGraph-${index}`}>
                            <g>
                                {dataItem.links.map((v) => {
                                    return (
                                        <LinkContainer {...props} {...v} key={`link-${v.timeId}`} />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v) => {
                                    return (
                                        <NodeItemContainer
                                            {...props}
                                            {...v}
                                            key={`node-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
