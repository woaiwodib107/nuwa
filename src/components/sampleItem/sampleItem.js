import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import NodeItem from '../nodeItem/nodeItem.js'
import LinkItem from '../linkItem/linkItem.js'
import { getArcPathData } from '../../util/dnetChart.js'
import { SAMPLE_LINK_SOURCE as SLS,  
         SAMPLE_LINK_TARGET as SLT, 
         SAMPLE_ITEM_WIDTH as SIW,
         SAMPLE_ITEM_HEIGHT as SIH
        } from '../../util/const.js'

export default function SampleItem(props) {
    const { config, source = SLS, target = SLT, width = SIW, height = SIH, index = -1, type } = props

    return (
        <svg
            className={`sample-item-${index}`}
            width={`${width}px`}
            height={`${height}px`}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin"
        >
            {type === 'link' ? (
                config.shape === 'line' ?
                <LinkItem
                    {...config}
                    source={source}
                    target={target}
                />:
                <ArcLinkItem
                    {...config}
                    data = {getArcPathData(source, target)}
                />
            ) : (
                <NodeItem {...config} x={width / 2} y={height / 2} />
            )}
        </svg>
    )
}
