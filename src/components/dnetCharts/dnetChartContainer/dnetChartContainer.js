
import React from 'react'
import TimePositionDnet from '../timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../timeAnimationDnet/timeAnimationDnet.js'
import TimeColorDnet from '../timeColorDnet/timeColorDnet.js'
import TimeChartDnet from '../timeChartDnet/timeChartDnet.js'
import SumGraphDnet from '../sumGraphDnet/sumGraphDnet.js'

export default function DnetChartContainer(props) {

    const { sampleWidth,sampleHeight,renderType, markLine, subGraphs, config, len, sumGraphs, isSample = false } = props
    // console.log("---sumGraphs----",sumGraphs)
    // console.log("---subGraphs----",subGraphs)
    switch (renderType) {
        case 'timeLine':
            return <TimePositionDnet 
                    sampleWidth={sampleWidth}
                    sampleHeight={sampleHeight}
                    markLine={markLine} 
                    data={subGraphs} 
                    config={config} 
                />
        case 'animation':
            return <TimeAnimationDnet
                    sampleWidth={sampleWidth}
                    sampleHeight={sampleHeight} 
                    markLine={markLine} 
                    data={subGraphs} 
                    sumData={sumGraphs}
                    config={config} 
                    sampleWidth={sampleWidth}
                    isSample={isSample}
                />
        case 'color':
            return <TimeColorDnet 
                    sampleWidth={sampleWidth}
                    sampleHeight={sampleHeight}
                    len={len} 
                    data={sumGraphs} 
                    config={config} 
                    isSample={isSample}/>
        case 'sumGraph':
            return <SumGraphDnet 
                    sampleWidth={sampleWidth}
                    sampleHeight={sampleHeight}
                    len={len} 
                    data={sumGraphs} 
                    config={config} 
                    isSample={isSample}/>
        case 'chart':
            return <TimeChartDnet 
                    sampleWidth={sampleWidth}
                    sampleHeight={sampleHeight}
                    len={len} 
                    data={sumGraphs} 
                    config={config} 
                    isSample={isSample}/>
        default:
            return null
    }
}
