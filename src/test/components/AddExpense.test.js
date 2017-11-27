import React from 'react'
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpense';
import ExpenseForm from '../../components/ExpenseForm';
import fixExpenses from '../fixures/expenses';

//** Method 1 quick ways **/
// let addExpense, history, wrapper;

// beforeEach(() => {
//     addExpense = jest.fn();
//     history = {push: jest.fn() };
//     wrapper = shallow (<AddExpensePage addExpense={addExpense} history={history} />);
// });

// test('Render add Expense correctly', () => {
//     expect(wrapper).toMatchSnapshot()
// });

// //
// test('should handle on Add Expense', () => {
//     wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
//     expect(history.push).toHaveBeenLastCalledWith('/');
//     expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
// });

//** Method 1a (Test data exporting firebase) **/
/*
 This is similar as Method 1 except for changing...
1. "addExpense" into "startAddExpense"
2. 

*/

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow (<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('Render add Expense correctly', () => {
    expect(wrapper).toMatchSnapshot()
});

//
test('should handle on Add Expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(fixExpenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(fixExpenses[1]);
});


//** Method 2 Duplications **/
//
// test('Render add Expense correctly', () => {
//     const onSubmit = jest.fn();
//     const history = {push: jest.fn() };
//     const wrapper = shallow (<AddExpensePage onSubmit={onSubmit} history={history} />);
//     expect(wrapper).toMatchSnapshot()
// });

// //
// test('Handle on Submit', () => {
//     const onSubmit = jest.fn();
//     const history = {push: jest.fn() };
//     const wrapper = shallow (<AddExpensePage onSubmit={onSubmit} history={history} />);
//     wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
//     expect(history.push).toHaveBeenLastCalledWith('/');
//     expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
// });

