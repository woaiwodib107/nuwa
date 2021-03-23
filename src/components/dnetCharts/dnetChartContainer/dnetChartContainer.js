
import React from 'react'
import TimePositionDnet from '../timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../timeAnimationDnet/timeAnimationDnet.js'
import TimeSumDnet from '../timeSumDnet/timeSumDnet.js'

export default function DnetChartContainer(props) {
    const { sampleWidth,sampleHeight,renderType, markLine, subGraphs, config, len, sumGraphs, isSample = false } = props
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
        case 'sum':
            return <TimeSumDnet 
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
