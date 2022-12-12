export default function Todo(props) {
  // Props:
  //  onClick -> check box function
  //  style -> margin style for check box (different for first button)
  //  cont -> the check mark
  //  textDecoration -> line through text after completion
  //  tasktitle -> title of the task
  //  delete -> function carried out by delete button
  //  number -> key, but not called key, because of complications with deleting the property
  return (
    <div className="task" style={props.divStyle}>
      <span className="task-cb-title">
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
      </span>
      <button className="delete-btn" onClick={() => props.delete(props.number)}>
        x
      </button>
    </div>
  );
}