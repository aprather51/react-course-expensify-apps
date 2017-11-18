import React from 'react'
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpense';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixures/expenses';

//Method 1 quick ways
let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = {push: jest.fn() };
    wrapper = shallow (<AddExpensePage addExpense={addExpense} history={history} />);
});

test('Render add Expense correctly', () => {
    expect(wrapper).toMatchSnapshot()
});

//
test('should handle on Add Expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});

//Method 2 Duplications
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