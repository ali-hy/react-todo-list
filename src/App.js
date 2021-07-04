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
          {this.props.categories[this.state.currentCategory]}
        </button>
      </div>
    );
  }
}

class TaskDisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 0,
      categories: ['Uncategorized', 'Work'],
      titles: [],
      completion: [],
      category: []
    };
  }
  addTask(catOfNew) {
    let titleNew = document.getElementById('textInput').value.trim();
    if (titleNew == '') return;
    this.setState({
      remaining: this.state.remaining + 1,
      titles: this.state.titles.concat(titleNew),
      completion: this.state.completion.concat(false),
      category: this.state.category.concat(catOfNew)
    });
    document.getElementById('textInput').value = '';
  }
  checkUncheck(i) {
    let completion = this.state.completion.slice();
    completion[i] = completion[i] ? false : true;

    this.setState({
      remaining:
        this.state.remaining + this.state.completion[i] - completion[i],
      completion: completion
    });
  }
  renderTask(i) {
    let style = i > 0 ? {} : { marginTop: '4px' };
    let divStyle = i > 0 ? {} : { border: 'none' };
    let textDecoration = this.state.completion[i]
      ? { textDecoration: 'line-through' }
      : {};
    return (
      <Task
        taskTitle={this.state.titles[i]}
        divStyle={divStyle}
        style={style}
        onClick={() => this.checkUncheck(i)}
        cont={this.state.completion[i] ? '✔' : ''}
        textDecoration={textDecoration}
      />
    );
  }

  render() {
    let message = (
      <h2 className="plsAddTasks">Use "ADD" Button to add a task </h2>
    );
    let res = [];
    for (let i = 0; i < this.state.titles.length; i++) {
      res.push(this.renderTask(i));
    }
    return (
      <div>
        <Title remaining={this.state.remaining} />
        <TaskAdder
          add={() => this.addTask()}
          categories={this.state.categories}
        />
        <div className="taskDisplay box">
          {this.state.titles.length > 0 ? res : message}
        </div>
      </div>
    );
  }
}

function Title(props) {
  return <h1 className="Title">Your Todos ({props.remaining} Remaining)</h1>;
}

export default function App() {
  return <TaskDisplayBox />;
}
