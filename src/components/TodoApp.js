import React from 'react';
import TaskAdder from './TaskAdder';
import Todo from './Todo';
import DisplayOptions from './DisplayOptions';
import CategoryPicker from './CategoryPicker';
import { connect } from "react-redux";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        categories: ['No Category', 'Work', 'Hobbies', 'Groceries', 'Chores'],
        tasks: [],
        displayedCategory: 0,
        showCompleted: true
        };
        this.updatedTasks = [];
    }
    componentDidMount() {
        if (localStorage.length > 3) {
        let inp = JSON.parse(localStorage.getItem('tasks')); //input
        this.setState({ tasks: inp.slice() });
        // this.setState({ tasks: inp });
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
    addTask(catOfNew) {
        let titleNew = document.getElementById('textInput').value.trim();
        if (titleNew == '') return;
        let currentTasks = this.state.tasks.slice().concat({
        id: this.state.tasks.length,
        creationDate: new Date(),
        title: titleNew,
        completed: false,
        category: catOfNew
        });
        this.setState({
            tasks: currentTasks
        });
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
        document.getElementById('textInput').value = '';
        if (
            this.state.displayedCategory != 0 &&
            catOfNew != this.state.displayedCategory
        ){
            this.setState({ displayedCategory: catOfNew });
        }
    }
    updateStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
    checkUncheck(i) {
        i.completed = !i.completed;
        this.forceUpdate();
        this.updateStorage();
    }
    renderTask(todo, i) {
        const border = i > 0;
        let divStyle = border ? {} : { border: 'none' };
        let textDecoration = todo.completed
        ? { textDecoration: 'line-through' }
        : {};
        return (
        <Todo
            key = {i}
            number={todo.id}
            taskTitle={todo.title}
            divStyle={divStyle}
            onClick={() => this.checkUncheck(todo)}
            cont={todo.completed ? '✔' : ''}
            delete={x => {
                let copy = this.state.tasks.slice();
                copy.splice(x, 1);
                this.setState({
                    tasks: copy
                });
                localStorage.setItem('tasks', JSON.stringify(copy));
            }}
            textDecoration={textDecoration}
        />
        );
    }

    render() {
        console.log(this.props.tasks);

        let message = (
        <h2 className="plsAddTasks">
            Type a todo in textbox above <br /> then use "ADD" Button to add a task{' '}
        </h2>
        );
        let filtered = this.state.tasks
        .map((task, i) => {
            task.id = i;
            return task;
        })
        .filter(
            task =>
            (this.state.showCompleted || !task.completed) &&
            (this.state.displayedCategory == 0 ||
                this.state.displayedCategory == task.category)
        );
        return (
        <div className="all">
            <div className="view">
            <h1 className="Title">
                Your Todos ( Remaining{' '}
                {this.state.tasks.filter(task => !task.completed).length} )
            </h1>
            <TaskAdder
                add={x => {
                this.addTask(x);
                }}
                categories={this.state.categories}
                displayedCategory={this.state.displayedCategory}
            />
            <DisplayOptions
                showCompleted={this.state.showCompleted}
                onClick={() =>
                this.setState({
                    showCompleted: !this.state.showCompleted
                })
                }
            />
            <div className="taskDisplay box">
                {filtered.length > 0
                ? filtered.map((task, i) => this.renderTask(task, i))
                : message}
            </div>
            </div>
            <CategoryPicker
                onChoice={x => {
                    this.setState({ displayedCategory: x });
                }}
                categories={this.state.categories}
                displayedCategory={this.state.displayedCategory}
            />
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    tasks: state.tasks.tasks
}

export default connect(mapStateToProps)(TodoApp);