import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import PieNodeItem from '../pieNodeItem/pieNodeItem.js'
import BarChartNodeItem from '../barChartNodeItem/barChartNodeItem.js'
import ChartNodeItem from '../chartNodeItem/chartNodeItem.js'
import { getPiePathColor, getNodeRenderType } from '../../util/dnetChart.js'

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
        const { nodeStyle, linkStyle } = config.graph
        const { startColor = '#FD8F8F', endColor = '#90B5FB' } = config.time.color
        let colorScale = getPiePathColor(dataLength, startColor, endColor)
        switch (nodeRenderType) {
            case 'lineChartNode':
                return (
                    <>
                        {nodesData.map((node, index) => {
                            // matrix中链接的节点形式，和普通的基点样式不一样。所以，需要更新
                            const tempStyle =
                                node.type === 'link-node'
                                    ? {
                                          ...nodeStyle,
                                          fillColor: linkStyle.pointFillColor,
                                          shape: linkStyle.pointShape,
                                          opacity: linkStyle.pointOpacity
                                      }
                                    : nodeStyle
                            // const tempStyle = nodeStyle
                            return (
                                <ChartNodeItem
                                    data={node}
                                    existTimeIndex={node.existTimeIndex}
                                    colorScale={colorScale}
                                    isColor={isColor}
                                    key={`line-chart-node-${index}`}
                                    {...tempStyle}
                                />
                            )
                        })}
                    </>
                )
            case 'pieNode':
                return (
                    <>
                        {nodesData.map((node, index) => {
                            return node.type === 'link-node' &&
                                node.style.nodeStyle.shape === 'rect' ? (
                                <BarChartNodeItem
                                    len={dataLength}
                                    data={node}
                                    existTimeIndex={node.existTimeIndex}
                                    isColor={isColor}
                                    colorScale={colorScale}
                                    key={`bar-node-${index}`}
                                    radius={nodeStyle.radius}
                                    {...nodeStyle}
                                    shape={linkStyle.pointShape}
                                    fillColor={linkStyle.pointFillColor}
                                    opacity={linkStyle.pointFillColor}
                                />
                            ) : (
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
