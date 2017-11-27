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
import './firebase/firebase';

const store = configureStore();

console.log('I made a request to change data');

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx , document.getElementById('app')); 




