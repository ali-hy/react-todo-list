import React from "react";
import "./style.css";

function Task(props) {
  return (
    <div className="task">
      <button className="checkBox"
        onClick={() => props.onClick()}
        style={props.style} ></button>
      <p className="taskTitle">{props.taskTitle}</p>
    </div>);
}

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titles: ["Eat breakfast", "Gain power from Orochimaru", "Kill Orochimaru", "Hunt down Itachi"],
      completion: ["white","white","black", "black"],
      folder: [null, null, null, null],
    }
  }
  checkUncheck(i){
    let completion = this.state.completion.slice();
    completion[i] = completion[i]=="black"? "white" : "black" ;
    this.setState({
      completion: completion,
    });
    console.log(completion);
  }
  renderTask(i) {
    return (<Task taskTitle={this.state.titles[i]}
      style={{ backgroundColor: this.state.completion[i], }}
      onClick = {() => this.checkUncheck(i)}
      />);
  }
  render() {
    let res = [];
    for (let i = 0; i < this.state.titles.length; i++) {
      res.push(this.renderTask(i));
    }
    return (res);
  }
}

export default function App() {
  return (
    <Display />
  );
}
