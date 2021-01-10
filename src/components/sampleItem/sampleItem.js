import React from 'react'

import NodeItem from '../nodeItem/nodeItem.js'
import LinkItem from '../linkItem/linkItem.js'

export default function SampleItem(props) {
    // console.log("props",props)
    const { config, width = 62, height = 62, index = -1, type } = props
    return (
        <svg
            className={`sample-item-${index}`}
            width={`${width}px`}
            height={`${height}px`}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin"
        >
            {type === 'link' ? (
                <LinkItem
                    {...config}
                    source={{ x: 5, y: 5 }}
                    target={{ x: width - 5, y: height - 5 }}
                />
            ) : (
                <NodeItem {...config} x={width / 2} y={height / 2} />
            )}
        </svg>
    )
}
