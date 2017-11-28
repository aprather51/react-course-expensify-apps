import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixures/expenses';
import database from '../../firebase/firebase';
import { 
    startAddExpense, 
    addExpense, 
    removeExpense, 
    editExpense, 
    setExpenses,
    startSetExpenses
 } from '../../actions/expenses';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData ={};
    //collecting fixture expenses
    expenses.forEach(({ id, description, amount, note, createAt}) => {
        expensesData[id] = { description, amount, note, createAt}
    });
    //implement fixture expenses in Firebase.
    database.ref('expenses').set(expensesData).then(() => done());
});

test('Should set up remove expense action object', () => {
    
        const action = removeExpense({ id: 'abc123'});
        expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id: 'abc123'
        });
    });

test('Should set up edit expense action object', () => {
    
        const action = editExpense('abc123', {note:'update me'});
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id: 'abc123',
            update: { 
                note:'update me' 
            }
        });
    });    

test('Should set up Add expense action object with provide values', () => {
    
    /** use fixture instead 'expenses' which imported from fixture */
    // const expensesData = {
    //     description: 'Rent',
    //     note: 'November Rent',
    //     amount: 150000,
    //     createAt: 1000
    // }
    /** */

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('Add expense to database and store',(done) => {
    //mock store based on library
    const store = createMockStore({});

    //create fake data based on input
    const expensesData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createAt: 1000
    }
    
    //**Using promise chain-- expect one process then() process and as result. **/
    //store.dispatch(startAddExpense(expensesData)).then(() => {
        //**expected for perfect match e.g. expect(1).toBe(1) will show no error. expect(1).toBe(2) will show error based on promise chain. '.then()' call **/
        // expect(1).toBe(1);
        // done();
    //});

    store.dispatch(startAddExpense(expensesData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expensesData
            }
        });

        //------------------------------------
        //** Redux-Mock-Store: 
        // -- fetching firebase expense id as mockup action **/
        // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            //** expecting snapshotvalue mockup firebase to match with mockup data from expensesData **/
        //     expect(snapshot.val()).toEqual(expensesData);
        //     done();
        // });

        // -------------------
         //** Promise Chaining & Redux Mock Store **/
       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expensesData);
            done();
        });
});


test('Add expense with default to database and store',(done) => {
    
        const store = createMockStore({});
    
            const expenseDefaults = {
                description: '',
                amount: 0,
                note: '',
                createAt: 0
            }
            
            store.dispatch(startAddExpense({})).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'ADD_EXPENSE',
                    expense: {
                        id: expect.any(String),
                        ...expenseDefaults
                    }
                });

    
               return database.ref(`expenses/${actions[0].expense.id}`).once('value');
                }).then((snapshot) => {
                    expect(snapshot.val()).toEqual(expenseDefaults);
                    done();
                });
    });

test('Set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('To see if it can fetch expense from firebase', (done) => {
    const store = createMockStore({});
    
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
})
