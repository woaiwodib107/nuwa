import React from 'react'
// 先判断其实left节点还是right节点
export default function HalfNodeItem(props) {
    if (props.direction === 'left') {
        if (props.shape === 'circle') {
            return (
                <path
                    d={`M${props.x} ${props.y + props.radius}  A ${props.radius} ${
                        props.radius
                    } 0 1 1 ${props.x} ${props.y - props.radius}`}
                    fill={props.fillColor}
                    stroke={props.strokeColor}
                    strokeWidth={`${props.strokeWidth}px`}
                    opacity={props.opacity}
                    strokeDasharray={
                        props.strokeType === 'solid'
                            ? ''
                            : `${props.radius / 2},${props.radius / 2} `
                    }
                />
            )
        } else if (props.shape === 'rect') {
            return (
                <path
                    d={`M${props.x} ${props.y + props.radius}  
            L ${props.x - props.radius} ${props.y + props.radius} 
            L ${props.x - props.radius} ${props.y - props.radius} 
            L ${props.x} ${props.y - props.radius} `}
                    fill={props.fillColor}
                    stroke={props.strokeColor}
                    strokeWidth={`${props.strokeWidth}px`}
                    opacity={props.opacity}
                    strokeDasharray={
                        props.strokeType === 'solid'
                            ? ''
                            : `${props.radius / 2},${props.radius / 2} `
                    }
                />
            )
        }
    } else {
        if (props.shape === 'circle') {
            return (
                <path
                    d={`M${props.x} ${props.y + props.radius}  A ${props.radius} ${
                        props.radius
                    } 0 1 0 ${props.x} ${props.y - props.radius}`}
                    fill={props.fillColor}
                    stroke={props.strokeColor}
                    strokeWidth={`${props.strokeWidth}px`}
                    opacity={props.opacity}
                    strokeDasharray={
                        props.strokeType === 'solid'
                            ? ''
                            : `${props.radius / 2},${props.radius / 2} `
                    }
                />
            )
        } else if (props.shape === 'rect') {
            return (
                <path
                    d={`M${props.x} ${props.y + props.radius}  
            L ${props.x + props.radius} ${props.y + props.radius} 
            L ${props.x + props.radius} ${props.y - props.radius} 
            L ${props.x} ${props.y - props.radius} `}
                    fill={props.fillColor}
                    stroke={props.strokeColor}
                    strokeWidth={`${props.strokeWidth}px`}
                    opacity={props.opacity}
                    strokeDasharray={
                        props.strokeType === 'solid'
                            ? ''
                            : `${props.radius / 2},${props.radius / 2} `
                    }
                />
            )
        }
    }
}
