import React from 'react'
import NodeLinkGraph from '../../nodeLinkGraph/nodeLinkGraph.js'

export default function TimePositionDnet(props) {
    if (props.data.length === 0) return null
    console.log('TimePositionDnet----props', props)
    return (
        <div className="TimePositionDnet graph">
            {props.data.map((dataItem, index) => {
                return (
                    <NodeLinkGraph
                        data={dataItem}
                        key={`time-position-${index}`}
                        height={props.height}
                        width={props.width}
                        margin={props.margin}
                        config={props.comparisonOptions}
                    />
                )
            })}
        </div>
    )
}
