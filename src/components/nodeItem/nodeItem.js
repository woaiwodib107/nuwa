import React from 'react'

export default function NodeItem(props) {
    if (props.shape === 'circle') {
        return (
            <circle
                id={props.timeId}
                cx={props.x + (props.xOffset ? props.xOffset : 0)}
                cy={props.y + (props.yOffset ? props.yOffset : 0)}
                fill={props.fillColor}
                stroke={props.strokeColor}
                strokeWidth={`${props.strokeWidth}px`}
                r={props.radius}
                opacity={props.opacity}
                strokeDasharray={
                    props.strokeType === 'solid' ? '' : `${props.radius / 2},${props.radius / 2} `
                }
            ></circle>
        )
    } else if (props.shape === 'rect') {
        return (
            <rect
                id={props.timeId}
                x={props.x + (props.xOffset ? props.xOffset : 0) - props.radius}
                y={props.y + (props.yOffset ? props.yOffset : 0) - props.radius}
                fill={props.fillColor}
                stroke={props.strokeColor}
                strokeWidth={`${props.strokeWidth}px`}
                width={props.radius * 2}
                height={props.radius * 2}
                opacity={props.opacity}
                strokeDasharray={
                    props.strokeType === 'solid' ? '' : `${props.radius / 2},${props.radius / 2} `
                }
            ></rect>
        )
    }
}
