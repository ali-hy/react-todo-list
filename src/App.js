import React from 'react';
import './style.css';

var remaining = 14;

function Task(props) {
  return (
    <div className="task" style={props.divStyle}>
      <button
        className="checkBox"
        onClick={() => props.onClick()}
        style={props.style}
      />
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
    completion[i] = completion[i] == 'black' ? 'white' : 'black';
    this.setState({
      completion: completion
    });
    remaining--;
  }
  renderTask(i) {
    let style =
      i > 0
        ? {
            background: this.state.completion[i]
          }
        : {
            background: this.state.completion[i],
            marginTop: '4px'
          };
    let divStyle = i > 0 ? {} : { border: 'none' };
    return (
      <Task
        taskTitle={this.state.titles[i]}
        style={style}
        divStyle={divStyle}
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
