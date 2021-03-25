import { dispatch } from 'd3';
import * as testData from '../data/test1.json'
import axios from "axios";

const GET_DATA = "GET_DATA";
const SET_DATA = "SET_DATA";

const initState = testData.default.graphs

export function graphData(state = initState, action) {
	switch (action.type) {
		case GET_DATA:
			return state
		default:
			return state;
	}
}

export function getGraphData(item) {
	return { type: GET_DATA };
}

export function setGraphData(data){
	console.log("data",data)
	// return { type: GET_DATA };
}

export function getGraphDataFromBack(param){
	return dispatch=>{
		console.log("setGraphData---dispatch-param", param)
		axios.get('api/get_pagerank')
			.then(res=>{
				console.log("/api/get_pagerank---res", res)
				if(res.status==200&&res.data.code==0){
					console.log("success---data", res.data)
					dispatch(setGraphData(res.data))
				}
			})
	}
}
