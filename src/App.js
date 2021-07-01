 import React from 'react';
import './style.css';

function Task(props) {
  return (
    <div className="task" style={props.divStyle}>
      <button
        className="checkBox"
        onClick={() => props.onClick()}
        style={props.style}
      ><p>{props.cont}</p></button>
      <p className="taskTitle">{props.taskTitle}</p>
    </div>
  );
}

class TaskAdder extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentCategory: 0,
    };
  }
  render(){
    return(
      <div className = "taskAdder box"> 
        <input type="text" className="textBox"></input>
        <button className="addButton">ADD</button>
        <button className="categoryButton">{this.props.categories[this.state.currentCategory]}</button>
      </div>
    );
  }
}

class TaskDisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:['Uncategorized', 'Work'],
      titles: [
        'Have breakfast',
        'Take shower',
        'Code 1 Hour',
        'Take out the trash',
        'Call dad',
        'Do dishes',
        'Check Mail',
      ],
      completion: [],
      folder: [null, null, null, null]
    };
  }
  checkUncheck(i) {
    let completion = this.state.completion.slice();
    completion[i] = completion[i]? false : true;
    this.setState({
      completion: completion
    });
  }
  renderTask(i) {
    let style =
      i > 0
        ? {}
        : {marginTop: '4px'};
    let divStyle = i > 0 ? {} : { border: 'none' };
    return (
      <Task
        taskTitle={this.state.titles[i]}
        divStyle={divStyle}
        style = {style}
        cont = {this.state.completion[i]}
        onClick={() => this.checkUncheck(i)}
        cont = {this.state.completion[i]? '✔' : ''}
      />
    );
  }
  
  render() {
    let res = [];
    for (let i = 0; i < this.state.titles.length; i++) {
      res.push(this.renderTask(i));
    }
    return <div><TaskAdder categories={this.state.categories}/> <div className="taskDisplay box">{res}</div></div>;
  }
}

function Title(props) {
  return <h1 className = 'Title'>Your Todos ({props.remaining} Remaining)</h1>;
}

export default function App() {
  return <> <Title remaining= {}/> <TaskDisplayBox /> </>;
}
