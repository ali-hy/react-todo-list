import { combineReducers } from 'redux';
import categoryReducer from './category/category.reducer';
import showCompletedReducer from './show-completed/show-completed.reducer';
import todosReducer from './todos/todos.reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [
        "todos", 
        "category", 
        "showCompleted"
    ] 
}

const rootReducer = combineReducers({
    todos: todosReducer,
    category: categoryReducer,
    showCompleted: showCompletedReducer
})

export default persistReducer(persistConfig, rootReducer);