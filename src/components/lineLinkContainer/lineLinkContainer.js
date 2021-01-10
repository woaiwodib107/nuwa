import React from 'react'
import LinkItem from '../linkItem/linkItem.js'
import { getDividedOptions } from '../../util/dnetChart.js'

export default function LineLinkContainer(props) {
    const {status,type} = props
    if(type==='time'||status.length === 0){
        return (
            <LinkItem
                {...props.style.linkStyle}
                {...props}
            />
        )
    }else if (status.length === 1) {
        return (
            <LinkItem
                {...props.style[status[0]]}
                {...props}
            />
        )
    } else if(status.length === 2){
        const { firstOption, secondOption } = getDividedOptions(props, status)
        return (
            <>
                <LinkItem {...firstOption} />
                <LinkItem {...secondOption} />
            </>
        )
    }
}
