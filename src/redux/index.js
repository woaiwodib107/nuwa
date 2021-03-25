import { combineReducers } from 'redux';
// import { dragStatus } from './drag.redux.js'
// import {encodingItems} from './encoding.redux.js'
import {graphData} from './graphData.redux.js'
// import {editIndex} from './editIndex.redux.js'
import {config} from './config.redux.js'
export default combineReducers({
    config,
    graphData
});