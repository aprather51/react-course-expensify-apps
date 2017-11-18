import { createStore } from 'redux';

// const increaseCount = (payload = {}) =>({
//     type: 'INCREMENT',
//     increaseBy: typeof payload.increaseBy === 'number' ? payload.increaseBy : 1
// })

const increaseCount = ({ increaseBy = 1 } = {}) =>({
    type: 'INCREMENT',
    increaseBy
});

const decreaseCount = ({ decreaseBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decreaseBy
});

const setCount = ({count} ) =>({
    type: 'SETCOUNT',
    count
});

const reset = () => ({
    type: 'RESET'
});

const countReducer = (state = {count: 0}, action) => { 
    switch (action.type) {
        case 'INCREMENT':
        //const increaseBy = typeof action.increaseBy === 'number' ? action.increaseBy : 1
            return{
                count: state.count + action.increaseBy
            };
        case 'DECREMENT':
        //   const decreaseBy = typeof action.decreaseBy === 'number' ? action.decreaseBy : 1;
            return{
                count: state.count - action.decreaseBy
            };
        case 'SETCOUNT':
            return{
                count: action.count
            };
        case 'RESET':
            return{
                count:  0
            };
        default:
            return;
    }
    
};

const store = createStore(countReducer);



const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// store.dispatch({
//     type: 'INCREMENT',
// });

// store.dispatch({
//     increaseBy: 5,
//     type: 'INCREMENT'
// });

// store.dispatch({
//     decreaseBy: 10,
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'SETCOUNT',
//     count: 101
// });

store.dispatch(increaseCount({increaseBy: 5}));

store.dispatch(increaseCount());

store.dispatch(reset());

store.dispatch(decreaseCount());

store.dispatch(decreaseCount({decreaseBy: 10}));

 store.dispatch(setCount({count: 101}));



