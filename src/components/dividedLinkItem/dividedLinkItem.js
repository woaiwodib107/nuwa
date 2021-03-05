import React from 'react'
import { getLinkData } from '../../util/dnetChart.js'

export default function DividedLinkItem(props) {
    const { data, len, colorScale, strokeWidth, strokeType, existTimeIndex, shape } = props
    const linkData = getLinkData(len, data, shape)
    
    return (
        <g>
            {shape === 'line'
                ? linkData.map((v, index) => {
                      if (existTimeIndex[index] === 1) {
                          return (
                              <line
                                  key={index} //这里不对
                                  x1={v.source.x}
                                  y1={v.source.y}
                                  x2={v.target.x}
                                  y2={v.target.y}
                                  stroke={colorScale(index)}
                                  strokeWidth={`${strokeWidth}px`}
                                  strokeDasharray={
                                      strokeType === 'solid'
                                          ? ''
                                          : `${strokeWidth * 2},${strokeWidth * 2} `
                                  }
                              ></line>
                          )
                      } else {
                          return (
                              <line
                                  key={index} //这里不对
                                  x1={v.source.x}
                                  y1={v.source.y}
                                  x2={v.target.x}
                                  y2={v.target.y}
                                  stroke={'#dddddd'}
                                  strokeWidth={`${strokeWidth}px`}
                                  strokeDasharray={
                                      strokeType === 'solid'
                                          ? ''
                                          : `${strokeWidth * 2},${strokeWidth * 2} `
                                  }
                              ></line>
                          )
                      }
                  })
                : linkData.map((v, index) => {
                      if (existTimeIndex[index] === 1) {
                          return (
                              <path
                                  key={v}
                                  d={v}
                                  fill={'none'}
                                  stroke={colorScale(index)}
                                  strokeWidth={`${strokeWidth}px`}
                                  strokeDasharray={
                                      strokeType === 'solid'
                                          ? ''
                                          : `${strokeWidth * 2},${strokeWidth * 2} `
                                  }
                              />
                          )
                      } else {
                          return (
                              <path
                                  key={v}
                                  d={v}
                                  fill={'none'}
                                  stroke={'#dddddd'}
                                  strokeWidth={`${strokeWidth}px`}
                                  strokeDasharray={
                                      strokeType === 'solid'
                                          ? ''
                                          : `${strokeWidth * 2},${strokeWidth * 2} `
                                  }
                              />
                          )
                      }
                  })}
        </g>
    )
}
