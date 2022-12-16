import { createSelector } from "reselect";
import { selectSelectedCategory } from "../category/category.selectors";
import { selectShowCompleted } from "../show-completed/show-completed.selectors";

const selectTodos = state => state.todos;
const selectTodoList = createSelector(
    [selectTodos],
    todos => todos.todos
)

export const selectFilteredTodos = createSelector(
    [selectTodoList, selectSelectedCategory, selectShowCompleted],
    (todos, selectedCategory, showCompleted) => {
        const filteredTodos = todos.filter(todo => {
            const filterByCompletion = (!todo.completed) || showCompleted;
            const filterByCategory = selectedCategory === 0 || selectedCategory === todo.category;
            return filterByCategory && filterByCompletion;
        })
        return filteredTodos;
    }
)