import React from "react";
import { connect } from "react-redux";
import { selectSelectedCategory } from "../redux/category/category.selectors";
import { selectShowCompleted } from "../redux/show-completed/show-completed.selectors";
import { removeTodo, toggleTodoCompletion } from "../redux/todos/todos.actions";
import { selectFilteredTodos } from "../redux/todos/todos.selectors";
import Todo from "./Todo";
import { addTaskMessage } from "./TodoApp";

class TodoList extends React.Component{
    renderTask(todo, i) {
        return (
        <Todo
            key = {i}
            taskTitle={todo.title}
            onClick={() => this.props.toggleTodoCompletion(todo.id)}
            completed={todo.completed}
            delete={() => this.props.removeTodo(todo.id)}
        />
        );
    }

    render(){
        return(
            <div className="taskDisplay box">
                {this.props.todos.length > 0
                ? this.props.todos.map((todo, i) => this.renderTask(todo, i))
                : addTaskMessage}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: selectFilteredTodos(state),
    displayedCategory: selectSelectedCategory(state),
    showCompleted: selectShowCompleted(state)
})

const mapDispatchToProps = dispatch => ({
    toggleTodoCompletion: id => dispatch(toggleTodoCompletion(id)),
    removeTodo: id => dispatch(removeTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);