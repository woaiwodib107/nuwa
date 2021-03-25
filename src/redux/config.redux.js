import {initConfig} from '../util/initConfig.js'

const UPDATE_CONFIG = "UPDATE_CONFIG";
const MODIFY_CONFIG = "MODIFY_CONFIG";

export function config(state = initConfig, action) {
	switch (action.type) {
		case MODIFY_CONFIG:
            return {
                ...state,
                [action.payload.key]:{
                    ...state[action.payload.key],
                    ...action.payload.value
                }
            }
        case UPDATE_CONFIG: 
            return action.data
		default:
			return state;
	}
}

// 修改
export function modifyConfig(payload) {
	return { type: MODIFY_CONFIG, payload };
}

// 重设一套新的config
export function update(config) {
	return { type: UPDATE_CONFIG, data: config };
}


