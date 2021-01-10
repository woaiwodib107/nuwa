import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeItemContainer(props) {
    const {status, type} = props
    if(type==='time'||status.length === 0){
        return <NodeItem {...props.style.nodeStyle} {...props} />
    }else if (status.length === 1) {
        return <NodeItem {...props.style[status[0]]} {...props} />
    } else if(status.length === 2) {
        return (
            <>
                <HalfNodeItem direction={'left'} {...props.style[status[0]]} {...props} />
                <HalfNodeItem direction={'right'} {...props.style[status[1]]} {...props} />
            </>
        )
    }
}
