import ADD_ENTRY from "./constants";

const initialState = [];
export const reducer = (state = initialState, action) => {
    // console.warn("reducer : ",action.data);
    switch (action.type) {
        case ADD_ENTRY:
            // console.warn("reducer : ",action.data);
            return [
                ...state,
                action.data
            ]
        default:
            return state;
    }
}