import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import { getDividedArcPathData } from '../../util/dnetChart.js'

export default function ArcLinkContainer(props) {
    const { source, target, opacity = 1, status, type} = props
    const { firstData, secondData} = getDividedArcPathData(source, target)
    if(type==='time'||status.length === 0){
        // comparison状态没有开启
        return (
            <ArcLinkItem
                data = {firstData+secondData}
                {...props.style.linkStyle}
                opacity={opacity}
            />
        )
    }else if (status.length === 1) {
        return (
            <ArcLinkItem
                data = {firstData+secondData}
                {...props.style[status[0]]}
                opacity={opacity}
            />
        )
    } else if((status.length === 2)){
        return (
            <>
                <ArcLinkItem
                    data = {firstData}
                    {...props.style[status[0]]}
                    opacity={opacity}
                />
                <ArcLinkItem
                    data = {secondData}
                    {...props.style[status[1]]}
                    opacity={opacity}
                />
            </>
        )
    }
}
