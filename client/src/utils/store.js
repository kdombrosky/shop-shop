import {reducer} from './reducers';
import { createStore } from 'redux'; 

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

// export created store
export default createStore(reducer, initialState)