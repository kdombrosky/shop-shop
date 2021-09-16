import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// instantiate global state object
const StoreContext = createContext(); //create new Context object 
// pull out Provider component to make the passed state data available 
// as a prop to all other components
const { Provider } = StoreContext; 

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };