import React from 'react';
import './style.css';

function Task(props) {
  return (
    <div className="task" style={props.divStyle}>
      <button
        className="checkBox"
        onClick={() => props.onClick()}
        style={props.style}
      >{props.cont}</button>
      <p className="taskTitle">{props.taskTitle}</p>
    </div>
  );
}



class TaskDisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        'Eat breakfast',
        'Gain power from Orochimaru',
        'Kill Orochimaru',
        'Hunt down Itachi',
        'Avenge Itachi',
        'Discover what a village is',
        'Sever all bonds',
        'Fail at that',
        'Lose arm',
        'Become the best shadow hokage this village has ever seen',
        'Marry Sakura',
        'Investigate threats like Kaguya',
        'Meet Sarada, your daughter',
        'Train Boruto'
      ],
      completion: [],
      folder: [null, null, null, null]
    };
  }
  checkUncheck(i) {
    let completion = this.state.completion.slice();
    completion[i] = completion[i]== null ? null : null;
    this.setState({
      completion: completion
    });
    remaining--;
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
      />
    );
  }
  
  render() {
    let res = [];
    for (let i = 0; i < this.state.titles.length; i++) {
      res.push(this.renderTask(i));
    }
    return <div className="taskDisplayBox">{res}</div>;
  }
}

function Title(props) {
  return <h1 className = 'Title'>Your Todos ({props.remaining} Remaining)</h1>;
}

export default function App() {
  return <> <Title remaining= {remaining}/> <TaskDisplayBox /> </>;
}
