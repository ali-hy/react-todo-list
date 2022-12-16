import { combineReducers } from 'redux';
import categoryReducer from './category/category.reducer';
import showCompletedReducer from './show-completed/show-completed.reducer';
import todosReducer from './todos/todos.reducer';

const rootReducer = combineReducers({
    todos: todosReducer,
    category: categoryReducer,
    showCompleted: showCompletedReducer
})

export default rootReducer;