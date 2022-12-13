export default function CategoryPicker (props){
  //Props:
  //  onChoice -> when clicking category in banner
  //  categories -> array of all the avaailable categories
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