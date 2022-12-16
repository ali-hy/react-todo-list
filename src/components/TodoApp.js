import React from 'react';
import TaskAdder from './TaskAdder';
import Todo from './Todo';
import DisplayOptions from './DisplayOptions';
import CategoryPicker from './CategoryPicker';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { selectFilteredTodos } from '../redux/todos/todos.selectors';

export const addTaskMessage = (
    <h2 className="plsAddTasks">
        Type a todo in textbox above <br /> then use "ADD" Button to add a task{' '}
    </h2>
);
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        tasks: [],
        showCompleted: true
        };
        this.updatedTasks = [];
    }
    componentDidMount() {
        if (localStorage.length > 3) {
            let input = JSON.parse(localStorage.getItem('tasks')); //input
            this.setState({ tasks: input.slice() });
        } else {
            fetch('https://60d8582ca376360017f45fe2.mockapi.io/todos', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => this.setState({ tasks: [...data] }));
        }
    }
    componentWillUnmount() {
        this.updateStorage();
    }
    
    updateStorage(tasks=this.state.tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    checkUncheck(i) {
        i.completed = !i.completed;
        this.forceUpdate();
        this.updateStorage();
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
                <DisplayOptions
                    showCompleted={this.state.showCompleted}
                    onClick={() =>
                    this.setState({
                        showCompleted: !this.state.showCompleted
                    })
                    }
                />
                <TodoList />
            </div>
            <CategoryPicker />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: selectFilteredTodos(state)
})

export default connect(mapStateToProps)(TodoApp)