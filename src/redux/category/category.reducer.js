const initialState = {
    categories: ['No Category', 'Work', 'Hobbies', 'Groceries', 'Chores'],
    selectedCategory: 0,
    showCompleted: false
}

export default function categoryReducer (state = initialState, action) {
    switch(action.type){
        case "SELECT_CATEGORY":
            return{
                ...state,
                selectedCategory: action.payload
            }
        default:
            return state;
    }
}