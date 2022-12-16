export default function Todo(props) {
  return (
    <div className={`task`}>
      <span className="task-cb-title">
        <button
          className="checkBox"
          onClick={() => props.onClick()}
          style={props.style}
        >
          {props.completed && <p>✔</p>}
        </button>
        <p className={`taskTitle ${props.completed && 'line-through'}`}>
          {props.taskTitle}
        </p>
      </span>
      <button className="delete-btn" onClick={() => props.delete()}>
        x
      </button>
    </div>
  );
}

