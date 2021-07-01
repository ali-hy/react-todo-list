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
      disable: true,
    };
  }  
  render(){
    return(
      <div className = "taskAdder box"> 
        <input type="text" className="textBox" id="textInput"></input>
        <button className="addButton"
          id = "addButton"
          onClick = {()=> this.props.add(this.state.currentCategory)}
          disabled = {false}>ADD</button>
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
      titles: [],
      completion: [],
      category: []
    };
  }
  addTask(catOfNew){
    let titleNew = document.getElementById("textInput").value;
    if (titleNew == '') return;
    this.setState({
      titles: this.state.titles.concat(titleNew),
      completion: this.state.completion.concat(false),
      category: this.state.category.concat(catOfNew),
    });
    document.getElementById("textInput").value = "";
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
    return <div><TaskAdder 
    add = {()=>this.addTask()}
    categories={this.state.categories}/> 
    <div className="taskDisplay box">{res}</div></div>;
  }
}

function Title(props) {
  return <h1 className = 'Title'>Your Todos ({props.remaining} Remaining)</h1>;
}

export default function App() {
  return <> <Title remaining= {}/> <TaskDisplayBox /> </>;
}
