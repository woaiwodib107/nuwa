import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import PieNodeItem from '../pieNodeItem/pieNodeItem.js'
import BarChartNodeItem from '../barChartNodeItem/barChartNodeItem.js'
import ChartNodeItem from '../chartNodeItem/chartNodeItem.js'
import {
    getPiePathColor, 
    getNodeRenderType
} from '../../util/dnetChart.js'

export default function NodeContainer(props) {
    const { data: nodesData, config, len: dataLength, isSum } = props
    const timeChooseTypes = config.time.chooseTypes
    const isColor = timeChooseTypes.indexOf('color') > -1
    const nodeRenderType = getNodeRenderType(config, isColor, isSum)
    if (nodeRenderType === 'simpleNode') {
        return (
            <>
                {nodesData.map((node) => {
                    return <NodeItemContainer {...node} key={`node-${node.id}`} />
                })}
            </>
        )
    } else {
        // 确定颜色比例
        const { nodeStyle } = config.graph
        const { startColor = '#FD8F8F', endColor = '#90B5FB' } = config.time.color
        let colorScale = getPiePathColor(dataLength, startColor, endColor)
        switch (nodeRenderType) {
            case 'lineChartNode':
                return (
                    <>
                        {nodesData.map((node, index) => {
                            return (
                                <ChartNodeItem
                                    data={node}
                                    existTimeIndex={node.existTimeIndex}
                                    colorScale={colorScale}
                                    isColor={isColor}
                                    key={`line-chart-node-${index}`}
                                    {...nodeStyle}
                                />
                            )
                        })}
                    </>
                )
            case 'pieNode':
                return (
                    <>
                        {nodesData.map((node, index) => {
                            return (
                                <PieNodeItem
                                    len={dataLength}
                                    data={node}
                                    existTimeIndex={node.existTimeIndex}
                                    colorScale={colorScale}
                                    isColor={isColor}
                                    key={`pie-node-${index}`}
                                    {...nodeStyle}
                                />
                            )
                        })}
                    </>
                )
            case 'barNode':
                return (
                    <>
                        {nodesData.map((node, index) => {
                            return (
                                <BarChartNodeItem
                                    len={dataLength}
                                    data={node}
                                    existTimeIndex={node.existTimeIndex}
                                    isColor={isColor}
                                    colorScale={colorScale}
                                    key={`bar-node-${index}`}
                                    {...nodeStyle}
                                />
                            )
                        })}
                    </>
                )
            default:
                return null
        }
    }
}
