const initialState = {
    nextId: 0,
    todos: [],
}

const todosReducer = (state = initialState, action) => {
    let todos = [...state.todos];
    let todoIndex;
    if(typeof action.payload === "string"){
        todoIndex = todos.findIndex((todo) => todo.id === action.payload);
    }
    switch(action.type){
        case "ADD_TODO":
            todos.push({
                ...action.payload,
                id: state.nextId.toString()
            });
            return {
                ...state,
                nextId: state.nextId + 1,
                todos: todos,
            };
        case "REMOVE_TODO":
            console.log('removing: ',todos[todoIndex])
            todos.splice(todoIndex, 1);
            return {
                ...state,
                todos: todos
            };
        case "TOGGLE_TODO_COMPLETION":
            console.log('toggling: ',todos[todoIndex])
            const toggledTodo = {
                ...todos[todoIndex], 
                completed: !todos[todoIndex].completed
            };
            
            todos[todoIndex] = toggledTodo;
            return{
                ...state,
                todos: todos
            };
        case "SET_TODOS":
            return{
                ...state,
                todos: action.payload,
                nextId: todos.length
            };
        default: 
            return state;
    }
}

export default todosReducer;