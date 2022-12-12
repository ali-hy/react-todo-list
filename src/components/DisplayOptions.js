import React from "react";

export default class DisplayOptions extends React.Component {
    //Props:
    //  onClick -> action on click of "show complete"
    //  showCompleted -> showCompleted from App
    render() {
      return (
        <div className="displayofoptions">
          <div className="showcompleted">
            <input
              type="checkbox"
              id="showcompletedcb"
              name="showcompletedcb"
              checked={this.props.showCompleted}
              onChange={() => this.props.onClick()}
            />
            <label className="showcompletedl" htmlFor="showcompletedcb">
              Show Completed
            </label>
          </div>
        </div>
      );
    }
  }