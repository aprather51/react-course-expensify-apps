import moment from 'moment'
import uuid from 'uuid';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixures/expenses';

test('Test Default State', () => {
    const stateResult = expensesReducer(undefined, {type: '@@INIT'});
    expect(stateResult).toEqual([]);
});

test('Remove Expense by Id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const stateResult = expensesReducer(expenses,action)
    expect(stateResult).toEqual([expenses[0], expenses[2]]);
});

test('Do Not Remove Expense by Id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const stateResult = expensesReducer(expenses,action)
    expect(stateResult).toEqual(expenses);
});

test('Add Expenses', () => {
    
    const expense = {
        id: '109',
        description: 'Laptop',
        note: '',
        createAt:20000,
        amount: 29500
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const stateResult = expensesReducer(expenses,action)
    expect(stateResult).toEqual([...expenses, expense]);
});

test('Edit Expenses', () => {
    const description = 'Fly Me';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        update:{
            description
        }
    };

    const stateResult = expensesReducer(expenses,action)
    expect(stateResult[1].description).toBe(description);
});

test('Terminate Edit Expenses if ID is not found', () => {
    const description = 'Fly Me';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        update:{
            description
        }
    };

    const stateResult = expensesReducer(expenses,action)
    expect(stateResult).toEqual(expenses);
});

