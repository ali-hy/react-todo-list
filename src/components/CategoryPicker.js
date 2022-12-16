import { connect } from "react-redux";
import { selectCategory } from "../redux/category/category.actions";
import { selectCategories, selectSelectedCategory } from "../redux/category/category.selectors";

function CategoryPicker (props){
  //Props:
  //  onChoice -> when clicking category in banner
  //  categories -> array of all the available categories
  //  displayedCategory -> currently displayed category
  return (
    <div className="cat-box">
      <h2> Categories </h2>
      <ul>
        {props.categories.map((title, i) => (
          <li key={i} className="cat-li"> 
            {' '}
            <button
              onClick={() => {
                props.onChoice(i);
              }}
              className={
                'categories' +
                (props.displayedCategory == i ? ' chosen-category' : '')
              }
            >
              {i > 0 ? title : 'All'}
            </button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  categories: selectCategories(state),
  displayedCategory: selectSelectedCategory(state)
})

const mapDispatchToProps = dispatch => ({
    onChoice: categoryIndex => dispatch(selectCategory(categoryIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker);