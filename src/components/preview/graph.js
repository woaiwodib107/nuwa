import React from 'react'
import DNetV from './dnetv'
import NodeLinkGraph from '../nodeLinkGraph/nodeLinkGraph.js'

var graphs
export default class Graph extends React.Component {
    constructor(props) {
        super(props)
    }
    // shouldComponentUpdate(nextProps) {
    //     this.dealData(nextProps)
    //     return false
    // }
    // componentDidMount() {
    //     this.dealData(this.props)
    // }
    // dealData = (props) => {
    //     const graphs = props.jsonfile
    //     console.log("deal graphs", graphs)
    //     if (document.getElementById("subgraph") !== null) {
    //         document.getElementById("subgraph").remove()
    //     }
    //     const subgraph = document.createElement("div")
    //     subgraph.id = "subgraph"
    //     document.getElementById("graph").appendChild(subgraph)
    //     DNetV(graphs, document.getElementById("subgraph"))
    // }
    // render() {
    //     return <div id="graph" className="graph"></div>
    // }
    render() {
        return (
            <div id="graph" className="graph">
                {/* <NodeLinkGraph></NodeLinkGraph>
            <NodeLinkGraph></NodeLinkGraph>
            <NodeLinkGraph></NodeLinkGraph>
            <NodeLinkGraph></NodeLinkGraph>
            <NodeLinkGraph></NodeLinkGraph>
            <NodeLinkGraph></NodeLinkGraph> */}
            </div>
        )
    }
}
