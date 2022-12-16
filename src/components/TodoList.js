import React from "react";
import { connect } from "react-redux";
import { removeTodo, toggleTodoCompletion } from "../redux/todos/todos.actions";
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
        const filtered = this.props.todos
        .map((todo, i) => {
            todo.id = i;
            return todo;
        })
        .filter(
            todo =>
            (this.props.showCompleted || !todo.completed) &&
            (this.props.displayedCategory == 0 ||
                this.props.displayedCategory == todo.category)
        );

        return(
            <div className="taskDisplay box">
                {filtered.length > 0
                ? filtered.map((task, i) => this.renderTask(task, i))
                : addTaskMessage}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    displayedCategory: state.category.selectedCategory,
    showCompleted: state.showCompleted.showCompleted
})

const mapDispatchToProps = dispatch => ({
    toggleTodoCompletion: id => dispatch(toggleTodoCompletion(id)),
    removeTodo: id => dispatch(removeTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);