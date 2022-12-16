const initialState = {
    showCompleted: true,
}

export default function showCompletedReducer(state = initialState, action){
    switch(action.type){
        case "TOGGLE_SHOW_COMPLETED":
            return{
                ...state,
                showCompleted: !state.showCompleted
            }
        default:
            return state;
    }
}