import { combineReducers } from 'redux';
import { reducerProducts } from './config';

const rootReducer = combineReducers({
    reducerProducts
});

export default rootReducer;


// import { combineReducers } from 'redux';
// import ConfigReducer from './config';
// import { connectRouter } from 'connected-react-router'

// const createRootReducer = (history) => combineReducers({
//   router: connectRouter(history),
//   config: ConfigReducer
// }) 
// export default createRootReducer