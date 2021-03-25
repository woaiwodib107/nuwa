const CHANGE_INDEX = "CHANGE_INDEX";

const initState = 0

export function editIndex(state = initState, action) {
	switch (action.type) {
		case CHANGE_INDEX:
			return action.payload
		default:
			return state;
	}
}

export function changeEditIndex(item) {
	return { type: CHANGE_INDEX, payload: item };
}

