import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, removeExpense, editExpense} from '../../actions/expenses';
import fixExpenses from '../fixures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

        /** use fixture instead 'fixExpenses' which imported from fixture */
        // const expenseData = {
        //     description: 'Rent',
        //     note: 'November Rent',
        //     amount: 150000,
        //     createAt: 1000
        // }
        /** */

        const actions = addExpense(fixExpenses[2]);
        expect(actions).toEqual({
            type: 'ADD_EXPENSE',
            expense: fixExpenses[2]
        })
});

test('Add expense to database and store',(done) => {
    //mock store based on library
    const store = createMockStore({});

    //create fake data based on input
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createAt: 1000
    }
    
    //**Using promise chain-- expect one process then() process and as result. **/
    //store.dispatch(startAddExpense(expenseData)).then(() => {
        //**expected for perfect match e.g. expect(1).toBe(1) will show no error. expect(1).toBe(2) will show error based on promise chain. '.then()' call **/
        // expect(1).toBe(1);
        // done();
    //});

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        //------------------------------------
        //** Redux-Mock-Store: 
        // -- fetching firebase expense id as mockup action **/
        // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            //** expecting snapshotvalue mockup firebase to match with mockup data from expenseData **/
        //     expect(snapshot.val()).toEqual(expenseData);
        //     done();
        // });

        // -------------------
         //** Promise Chaining & Redux Mock Store **/
       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('Add expense with default to database and store',() => {

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

//** No longer in use when test with firebase **//
/*  Reason: From expense.js, the id, description, note, amount and createAt have been converted for * *  *   redux-thunk. "see startAddExpense".
*/
// test('Should set up Add expense action object with default values', () => {
    
//         const actions = addExpense({ });
//         expect(actions).toEqual({
//             type: 'ADD_EXPENSE',
//             expense:{
//                 id: expect.any(String),
//                 description: '', 
//                 note: '', 
//                 amount: 0, 
//                 createAt: 0
//             }
//         });
// });