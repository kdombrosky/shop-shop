import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

// useStoreContext hook to retrieve current state from global state object
// import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

// import idbPromise()
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  // state = current state, dispatch = method to update state
  // const [state, dispatch] = useStoreContext(); 
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  // only need categories array from state, so destructure
  // const { categories } = state;
  // WHAT IS THIS V
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // runs when it notices categoryData is not undefined anymore
  // which is when the useQuery() hook returns
  // runs on component load, and when some form of state changes in that component
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // use click handler function in JSX below to update global state 
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
