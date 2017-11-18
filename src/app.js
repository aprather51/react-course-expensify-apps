import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouters';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expense';
import './style/main.scss'; 
import 'react-dates/lib/css/_datepicker.css';
const store = configureStore();

//Simulation Area -----------------------------

//Dispatching Simulation Items
store.dispatch(addExpense({ description: 'Water Bill', amount: 5000 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 11000, createAt: 11000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 122540 }));

//Displaying Item in Browser Console --
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(store.getState());
console.log(visibleExpenses);

// store.dispatch(setTextFilter('water'));

// setTimeout(function() {
//     store.dispatch(setTextFilter('Bill'));
// }, 3000);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx , document.getElementById('app')); 




