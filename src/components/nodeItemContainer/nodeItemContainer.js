import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeItemContainer(props) {
    const {status=[], type, style} = props
    if(type==='time'||status.length === 0){
        return <NodeItem {...style.nodeStyle} {...props} />
    }else if (status.length === 1) {
        return <NodeItem {...style[status[0]]} {...props} />
    } else if(status.length === 2) {
        return (
            <>
                <HalfNodeItem direction={'left'} {...style[status[0]]} {...props} />
                <HalfNodeItem direction={'right'} {...style[status[1]]} {...props} />
            </>
        )
    }
}
