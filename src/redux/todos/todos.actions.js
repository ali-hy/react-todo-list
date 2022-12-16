export const removeTodo = id => ({
    type: "REMOVE_TODO",
    payload: id,
})

export const addTodo = todo => ({
    type: "ADD_TODO",
    payload: todo
})

export const toggleTodoCompletion = id => ({
    type: "TOGGLE_TODO_COMPLETION",
    payload: id
})