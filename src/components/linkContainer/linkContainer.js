import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import LinkItem from '../linkItem/linkItem.js'
import { 
    getDividedArcPathData, 
    getArcPathData, 
    getDividedOptions, 
    getLineType,
    getHybridPathData
} from '../../util/dnetChart.js'


export default function LinkContainer(props) {
    const { source, target, opacity = 1, status, type} = props
    
    let linkType 
    if(type==='time'||status.length === 0){
        // comparison状态没有开启
        linkType = props.style.linkStyle.shape
        if(linkType === 'curve'){
            return (
                <ArcLinkItem
                    data = {getArcPathData(source, target)}
                    {...props.style.linkStyle}
                    opacity={opacity}
                />
            )
        }else{
            return (
                <LinkItem
                    {...props.style.linkStyle}
                    opacity={opacity}
                    {...props}
                />
            )
        }
        
    }else if (status.length === 1) {
        // comparison状态开启，状态只有一个
        linkType = props.style[status[0]].shape
        if(linkType === 'curve'){
            return (
                <ArcLinkItem
                    data = {getArcPathData(source, target)}
                    {...props.style[status[0]]}
                    opacity={opacity}
                />
            )
        }else{
            return (
                <LinkItem
                    {...props.style[status[0]]}
                    opacity={opacity}
                    {...props}
                />
            )
        }
    } else if((status.length === 2)){
        // 比较状态开启，状态有两个
        // 状态有两个不进行opacity渐变覆盖
        linkType = getLineType(status, props.style)
        if(linkType === 'curve'){
            const { firstData, secondData} = getDividedArcPathData(source, target)
            return (
                <>
                    <ArcLinkItem
                        data = {firstData}
                        {...props.style[status[0]]}
                    />
                    <ArcLinkItem
                        data = {secondData}
                        {...props.style[status[1]]}
                    />
                </>
            )
        }else if(linkType === 'line'){
            const { firstOption, secondOption } = getDividedOptions(props, status)
            return (
                <>
                    <LinkItem {...firstOption} />
                    <LinkItem {...secondOption} />
                </>
            )
        }else{
            let indexA = 0 , indexB = 1;
            if(linkType[0]!=='curve'){
                indexA = 1
                indexB = 0
            }
            const { firstData, secondData} = getHybridPathData(source, target)
            return (
                <>
                    <ArcLinkItem
                        data = {firstData}
                        {...props.style[status[indexA]]}
                    />
                    <ArcLinkItem
                        data = {secondData}
                        {...props.style[status[indexB]]}
                    />
                </>
            )

        }
    }
}

