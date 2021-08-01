import React from 'react';
import './style.css';

function Task(props) {
  return (
    <div className="task" style={props.divStyle}>
      <button
        className="checkBox"
        onClick={() => props.onClick()}
        style={props.style}
      >
        <p>{props.cont}</p>
      </button>
      <p className="taskTitle" style={props.textDecoration}>
        {props.taskTitle}
      </p>
    </div>
  );
}

class DisplayOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentCategory: 0,
      showCompleted: false,
    }
  }
  render(){
    return(
      <div className="displayofoptions">
        <div className = "showcompleted">
          <input type = "checkbox" id="showcompletedcb" name="showcompletedcb"
          onClick={() => this.props.onClick()} /> 
          <label className = "showcompletedl" htmlFor="showcompletedcb">Show Completed</label>
        </div>
      </div>
    );
  }
}

class TaskAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: 0,
      disable: true,
      value: ''
    };
  }
  render() {
    return (
      <div className="taskAdder box">
        <input
          type="text"
          className="textBox"
          id="textInput"
          onChange={e => this.setState({ value: e.target.value })}
          onKeyUp={e => {
            if (e.keyCode == 13) {
              e.preventDefault();
              document.getElementById('addButton').click();
            }
          }}
        />
        <button
          className="addButton"
          id="addButton"
          onClick={() => {
            this.props.add(this.state.currentCategory);
            this.setState({
              value: ''
            });
          }}
          disabled={this.state.value.trim() == ''}
        >
          ADD
        </button>
        <button className="categoryButton">
          {this.props.categories[this.state.currentCategory] + "▼"}
        </button>
      </div>
    );
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 0,
      categories: ['Uncategorized', 'Work', 'Groceries', 'Chores'],
      tasks: [],
      displayedCategory: 0,
      showCompleted: false,
      firstTask: true,
    };
  }
  addTask(catOfNew) {
    let titleNew = document.getElementById('textInput').value.trim();
    if (titleNew == '') return;
    this.setState({
      tasks:this.state.tasks.concat({ 
        title: titleNew,
        complete: false,
        category: catOfNew}),
      remaining: this.state.remaining + 1,
    });
    console.log(this.state.tasks[this.state.tasks.length-1]);
    document.getElementById('textInput').value = '';
  }
  checkUncheck(i) {
    console.log("was " + i.complete);
    i.complete = !i.complete;
    this.setState({
      remaining: this.state.remaining + (i.complete ? -1 : 1),
    })
    console.log("now is " + i.complete);
  }
  renderTask(i, border) {
    let style = border ? {} : { marginTop: '4px' };
    let divStyle = border ? {} : { border: 'none' };
    let textDecoration = i.complete
      ? { textDecoration: 'line-through' }
      : {};
    return (
      <Task
        taskTitle={i.title}
        divStyle={divStyle}
        style={style}
        onClick={() => this.checkUncheck(i)}
        cont={ i.complete ? '✔' : ''}
        textDecoration={textDecoration}
      />
    );
  }

  render() {
    let firstTask = true;
    let message = (
      <h2 className="plsAddTasks">Use "ADD" Button to add a task </h2>
    );
    let res = [];
    for (let i = 0; i < this.state.tasks.length; i++) {
      res.push(this.renderTask(i));
    }
    return (
      <div className="all">
        <Title remaining={this.state.remaining} />
        <TaskAdder
          add={() => this.addTask()}
          categories={this.state.categories}
        />
        <DisplayOptions
        onClick={()=>this.setState({showCompleted: !this.state.showCompleted, firstTask: true,})}/>
        <div className="taskDisplay box"> 
          {this.state.tasks.length > 0 
        ? this.state.tasks.filter(task => this.state.showCompleted || !task.complete).map((task, i) => this.renderTask(task, i > 0))
          : message}
        </div>
      </div>
    );
  }
}

function Title(props) {
  return <h1 className="Title">Your Todos ({props.remaining} Remaining)</h1>;
}

export default function App() {
  return <TodoApp id = "todoapp"/>;
}
