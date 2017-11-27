                                     // vvv For Firebase-Thunk //
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import thunk from 'redux-thunk';

//------------------   vvvvvvv only use this if exist vvvvvvvv Otherwise vv use this -------         
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store Creation: Expense & Filter using combineReducers from Redux.
export default () => {
    const store = createStore(combineReducers({
        expenses: expenseReducer,
        filters: filterReducer
    }),
    //collect composerEnhacher and run function with Redux-thunk
    composeEnhancer(applyMiddleware(thunk))

    //vvvv replaces with composEnhancer (see const composeEnhancer above) vvvv
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
    
    return store;
}
