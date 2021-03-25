const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM_INPUT_ROW = "UPDATE_ITEM_INPUT_ROW";
const UPDATE_ITEM_CLEAR_ROW = "UPDATE_ITEM_CLEAR_ROW";
const DELETE_ITEM = "DELETE_ITEM";

const initState = [
	{
		position: 20,
        layout: 'forceDirect',
		positioning: [
			{ name: "X", filled: true, content: "forceDirect" },
			{ name: "Y", filled: true, content: "Cylinders" },
		],
		faceting: [
			{ name: "X", filled: true, content: "grid" },
			{ name: "Y", filled: true, content: "" },
		]
	},
	{
		position: 300,
        layout: 'forceDirect',
		positioning: [
			{ name: "X", filled: true, content: "circle" },
			{ name: "Y", filled: false, content: "" },
		],
		faceting: [
			{ name: "X", filled: true, content: "forceDirect" },
			{ name: "Y", filled: true, content: "Cylinders" },
		]
	},
	{
		position: 600,
        layout: 'forceDirect',
		positioning: [
			{ name: "X", filled: true, content: "grid" },
			{ name: "Y", filled: false, content: "" }
		],
		faceting: [
			{ name: "X", filled: true, content: "forceDirect" },
			{ name: "Y", filled: true, content: "Cylinders" },
		]
	}
];

export function encodingItems(state = initState, action) {
	switch (action.type) {
		case ADD_ITEM:
			return [...state, action.payload]
		case UPDATE_ITEM_INPUT_ROW:
            const inputState = [...state]
            const inputItem = {...inputState[action.payload.index]}
            inputItem.rows[action.payload.rowIndex] = {
                ...inputItem.rows[action.payload.rowIndex],
                content: action.payload.content,
                filled:true
            }
            inputState[action.payload.index] = inputItem
			return inputState;
        case UPDATE_ITEM_CLEAR_ROW:
            const clearState = [...state]
            const clearItem = {...clearState[action.payload.index]}
            clearItem.rows[action.payload.rowIndex] = {
                ...clearItem.rows[action.payload.rowIndex],
                content :'',
                filled: false
            }
            clearState[action.payload.index] = clearItem
            return clearState;
        case DELETE_ITEM:
            const afterState = [...state]
            afterState.splice(action.payload.index, 1)
			return afterState;
		default:
			return state;
	}
}

export function addItemToEncoding(item) {
	return { type: ADD_ITEM, payload: item };
}

export function updateItemInputRow(index, rowIndex, content) {
	return { type: UPDATE_ITEM_INPUT_ROW, payload: { index, rowIndex, content } };
}
export function updateItemClearRow(index, rowIndex) {
	return { type: UPDATE_ITEM_CLEAR_ROW, payload: { index, rowIndex } };
}

export function deleteItemToEncoding(index) {
	return { type: DELETE_ITEM, payload: index };
}
