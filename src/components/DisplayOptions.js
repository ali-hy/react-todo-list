import React from "react";
import { connect } from "react-redux";
import { toggleShowCompleted } from "../redux/show-completed/show-completed.actions";
import { selectShowCompleted } from "../redux/show-completed/show-completed.selectors";

class DisplayOptions extends React.Component {
  //Props:
  //  onClick -> action on click of "show complete"
  //  showCompleted -> showCompleted from App
  render() {
    console.log("you failed, hehe")
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

const mapStateToProps = state => ({
  showCompleted: selectShowCompleted(state)
})

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(toggleShowCompleted())
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayOptions)