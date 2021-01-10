import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../../linkContainer/linkContainer.js'
import { getLinkPathData } from '../../../util/dnetChart.js'

export default function TimeLinkDnet(props) {
    const { data, nodeNum, config, markLine } = props
    const { height, width, margin, nodeStyle, linkStyle } = config.basic
    const { strokeColor, strokeWidth, strokeDasharray } = config.time.markLine
    const len = data.length
    if (len === 0) return null
    // markline有数据就画，没有数据就不画。
    const linkPathData = getLinkPathData(markLine, nodeNum)
    // return null
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimeLinkDnet"
        >
            <svg
                className="tld-container-svg"
                width={`${width * len + margin * len}px`}
                height={`${height + margin * 2}px`}
                viewBox={`0 0 ${width * len + margin * len} ${height + margin * 2}`}
                preserveAspectRatio="xMinYMin"
            >
                <g transform={`translate(${margin},${margin})`}>
                    {linkPathData.map((links, index) => {
                        return (
                            <g key={`curve-g-${index}`}>
                                {links.data.map((v, index) => {
                                    return (
                                        <path
                                            d={v}
                                            fill={'none'}
                                            stroke={strokeColor}
                                            strokeWidth={`${strokeWidth}px`}
                                            strokeDasharray={strokeDasharray}
                                            key={`curve-link-${index}`}
                                        />
                                    )
                                })}
                            </g>
                        )
                    })}
                </g>
                <g transform={`translate(${margin},${margin})`}>
                    {data.map((dataItem, index) => {
                        return (
                            <g key={`subGraph-${index}`}>
                                <g>
                                    {dataItem.links.map((v) => {
                                        return (
                                            <LinkContainer
                                                comparisonOptions={config.comparison}
                                                linkStyle={linkStyle}
                                                {...v}
                                                key={`link-${v.timeId}`}
                                            />
                                        )
                                    })}
                                </g>
                                <g>
                                    {dataItem.nodes.map((v, index) => {
                                        return (
                                            <NodeItemContainer
                                                comparisonOptions={config.comparison}
                                                nodeStyle={nodeStyle}
                                                {...v}
                                                key={`node-${v.timeId}`}
                                            />
                                        )
                                    })}
                                </g>
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
