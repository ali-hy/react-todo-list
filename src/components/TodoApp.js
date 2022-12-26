import React from 'react';
import TaskAdder from './TaskAdder';
import Todo from './Todo';
import DisplayOptions from './DisplayOptions';
import CategoryPicker from './CategoryPicker';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { selectFilteredTodos } from '../redux/todos/todos.selectors';
import { setTodos } from '../redux/todos/todos.actions';
import { createStructuredSelector } from 'reselect';

export const addTaskMessage = (
    <h2 className="plsAddTasks">
        Type a todo in textbox above <br /> then use "ADD" Button to add a task{' '}
    </h2>
);
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (localStorage.getItem("persist:root") === null) {
            fetch('https://60d8582ca376360017f45fe2.mockapi.io/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => this.props.setTodos(data));
        }
    }
    componentWillUnmount() {
    }
    
    checkUncheck(i) {
        i.completed = !i.completed;
        this.forceUpdate();
    }

    render() {
        return (
        <div className="all">
            <div className="view">
                <h1 className="Title">
                    Your Todos ( Remaining{' '}
                    {this.props.todos.filter(task => !task.completed).length} )
                </h1>
                <TaskAdder/>
                <DisplayOptions/>
                <TodoList />
            </div>
            <CategoryPicker />
        </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    todos: selectFilteredTodos
})

const mapDispatchToProps = dispatch => ({
    setTodos: todos => dispatch(setTodos(todos)),
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp)