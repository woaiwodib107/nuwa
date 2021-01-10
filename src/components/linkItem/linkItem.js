import React from 'react'

export default function LinkItem(props) {
    return (
        <line
            id={props.timeId}
            x1={props.source.x + (props.xOffset ? props.xOffset : 0)}
            y1={props.source.y + (props.yOffset ? props.yOffset : 0)}
            x2={props.target.x + (props.xOffset ? props.xOffset : 0)}
            y2={props.target.y + (props.yOffset ? props.yOffset : 0)}
            stroke={props.strokeColor}
            strokeWidth={`${props.strokeWidth}px`}
            opacity={props.opacity}
            strokeDasharray={
                props.strokeType === 'solid'
                    ? ''
                    : `${props.strokeWidth * 2},${props.strokeWidth * 2} `
            }
        ></line>
    )
}
