import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategories, selectSelectedCategory } from "../redux/category/category.selectors";
import { addTodo } from "../redux/todos/todos.actions"; 

function drop() {
    document.getElementById('category-picker').classList.toggle('show');
}

function todo({title, category}){
    return {
        creationDate: new Date(),
        title: title,
        completed: false,
        category: category
    }
}

class TaskAdder extends React.Component {
    // Props:
    //  categories -> array of all categories
    //  displayedCategory -> currently displayed category
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: 0,
            disable: true,
            disableCat: false,
            value: ''
        };
    }

    resetValue(){
        this.setState({value: ''});
    }

    addTodo(){
        this.props.addTodo(todo({title: this.state.value, category: this.state.currentCategory}));
        this.resetValue();
    }

    render() {
        if (
            (!this.state.disableCat ||
                this.state.currentCategory != this.props.displayedCategory) &&
            this.props.displayedCategory != 0
        ) {
            this.setState({
                currentCategory: this.props.displayedCategory,
                disableCat: true
            });
        } else if (this.props.displayedCategory == 0 && this.state.disableCat)
        this.setState({ disableCat: false });
        return (
            <div className="taskAdder box">
                <input
                    type="text"
                    className="textBox"
                    id="textInput"
                    onChange={e => this.setState({ value: e.target.value })}
                    autoComplete="off"
                    onKeyUp={e => {
                        if (e.key == "Enter") {
                            e.preventDefault();
                            document.getElementById('addButton').click();
                        }
                    }}
                    placeholder={'Enter task here'}
                    value = {this.state.value}
                />
                <button
                    className="addButton"
                    id="addButton"
                    onClick={() => this.addTodo()}
                    disabled={this.state.value.trim().length < 1}
                >
                ADD
                </button>

                <div className="dropdown">
                    <button
                        className="categoryButton"
                        id="category-btn"
                        onClick={() => drop()}
                        disabled={this.state.disableCat}
                    >
                        {this.props.categories[this.state.currentCategory]}
                    </button>
                    <div className="category-picker" id="category-picker">
                        {this.props.categories
                        .filter((cat, i) => i != this.state.currentCategory)
                        .map((category, i) => {
                            return (
                            <li key={i} className="category-li">
                                <button
                                className="category-pick"
                                onClick={() =>
                                    this.setState({
                                    currentCategory:
                                        i + (i >= this.state.currentCategory ? 1 : 0)
                                    })
                                }
                                >
                                {category}
                                </button>
                            </li>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    displayedCategory: selectSelectedCategory
})

const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdder)