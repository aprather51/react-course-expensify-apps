import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

//  ****************** ACTIONS ***************************** //

//
//  *** Expenses ***
//

// ADD_EXPENSE
const addExpense = ({ 
    description = '', 
    note = '', 
    amount = 0, 
    createAt = 0
} = {}) =>({
    type: 'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        note,
        amount,
        createAt
    }
});
// REMOVE_EXPENSE
const removeExpense = ({id} = {}) =>({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
});

//  
//  *** Filter *** 
//

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//  ****************** REDUCERS ***************************** //
//Expense Reducer
const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            // return state.concat(action.expense) //Similar as bottom with three dots.
            return [ ...state, action.expense]  //spread operator
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id ){
                    return{
                        ...expense,      //grab the existing expense
                        ...action.update //override the existing expense w/new value. 
                    };
                } else {
                    return expense; //result with no change if match fails
                }
                });
        default:
            return state;
    }
}

//filter Reducer 
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state, 
                text: action.text
            }
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

//  ****************** SELECTORS ***************************** //

//Get Visible Expensese
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        //Let say *startDate* has a value of 1, the typeof checks *startDate* undefined value that is not equal to a 'number' -- If its not equal to a 'number'. Its going to be defined as true. The *startDateMatch* will not be filtered. Now if *startDate* has a value of 2, and the *createAt* has value of 1, this will not be defined as true. Then *expense.createAt* will run as 1 and *startDate* as 2 and this is not greater than startDate.and this one is filtered out"
        //
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date'){
           return a.createAt < b.createAt ? 1 : -1;
        } 
    });
};

//  ****************** STORE ***************************** //
//Store Creation: Expense & Filter using combineReducers from Redux.
const store = createStore(combineReducers({
    expenses: expenseReducer,
    filter: filterReducer
}));


//Substrbe - Result
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filter)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 400, createAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createAt: 21000 }));

//Remove Expense
// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// //Edit Expense
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// //Set Text Filter
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

// //Sort By Date
// store.dispatch(sortByDate());

// //Sort By Amount
store.dispatch(sortByAmount());

// store.dispatch(setStartDate(-1325)); //startDate 125
// store.dispatch(setStartDate()); //startDate undefined
// store.dispatch(setEndDate(2505)); //endDate 2505

const demoState = {
    expenses:[{
        id: 'iineicmeo',
        description: 'November Rent',
        note: 'Payment sucks!',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //Or date and etc. 
        startDate: undefined,
        endDate: undefined
    }
}

