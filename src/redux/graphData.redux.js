import * as testData from '../data/import/test1.json'

const SET_GRAPH_DATA = "SET_GRAPH_DATA";
// const initState = testData.default.graphs
const initState = []

export function graphData(state = initState, action) {
	switch (action.type) {
		case SET_GRAPH_DATA:
			return action.data
		default:
			return state;
	}
}


export function setGraphData(data){
	// console.log("setGraphData--data",data)
	return { type: SET_GRAPH_DATA, data }
}


