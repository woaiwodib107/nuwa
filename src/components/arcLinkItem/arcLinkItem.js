import React from 'react'

export default function ArcLinkItem(props) {
    if(!props.data){
        return null
    }
    return (
        <path
            d={props.data}
            fill={'none'}
            stroke={props.strokeColor}
            opacity={props.opacity}
            strokeWidth={`${props.strokeWidth}px`}
            strokeDasharray={
                props.strokeType === 'solid' ? '' : '5,5 '
            }
        />
    )
}
