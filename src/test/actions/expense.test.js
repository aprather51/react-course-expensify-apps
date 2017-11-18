import {addExpense, removeExpense, editExpense} from '../../actions/expenses';
import uuid from 'uuid'

test('Should set up remove expense action object', () => {

    const actions = removeExpense({ id: 'abc123'});
    expect(actions).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    });
});

test('Should set up edit expense action object', () => {
    
        const actions = editExpense('abc123', {note:'update me'});
        expect(actions).toEqual({
            type: 'EDIT_EXPENSE',
            id: 'abc123',
            update: {note:'update me'}
        });
    });
    

test('Should set up Add expense action object with provide values', () => {

        const expenseData = {
            description: 'Rent',
            note: 'November Rent',
            amount: 150000,
            createAt: 1000
        }
        const actions = addExpense(expenseData);
        expect(actions).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                ...expenseData,
                id: expect.any(String)
            }
        })
});

test('Should set up Add expense action object with default values', () => {
    
        const actions = addExpense({ });
        expect(actions).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id: expect.any(String),
                description: '', 
                note: '', 
                amount: 0, 
                createAt: 0
            }
        });
});