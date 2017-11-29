import uuid from 'uuid';
import database from '../firebase/firebase'

//ADD_EXPENSE *NEW* (For Firebase)
export const addExpense = (expense) =>({
    type: 'ADD_EXPENSE',
    expense
});

//ADD_EXPENSE *OLD*
// export const addExpense = ({ 
//     description = '', 
//     note = '', 
//     amount = 0, 
//     createAt = 0
// } = {}) =>({
//     type: 'ADD_EXPENSE',
//     expense:{
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createAt
//     }
// });



//** Setting up Expense data to dispatch based on *expenseData = {}*  **//
export const startAddExpense = (expenseData = {}) => {
    //Setting "return" only for redux-thunk... This function now get called interally by Redux and it get returned with argument called "dispatch"... 
    return (dispatch) => {
        //...And dispatch which gives an access inside items to write some data for firebase. 
        const { 
            description = '', 
            note = '', 
            amount = 0, 
            createAt = 0
        } = expenseData
        //set constant to select data from above that need to be pushed into firebase
        const expense = { description, note, amount, createAt }
    
        //firebase syntax to create/open array called 'expenses' and *push()* the variable called expense (see above "const expense = {...}) that contain items and values such as -- "description, note, amount and createAt" to firebase....The *then()* call back the success case for push to get called with "ref" together...
        return database.ref('expenses').push(expense).then((ref) => {
            //dispatching action called addExpense (Above) which will make changes when new data get updated.
            dispatch(addExpense({
                //dispatching a unique key with call name "ref"
                id: ref.key,
                //dispatching expense properties i.e. dispatch, note, amount, and createAt 
                ...expense
                //at end it pushes id based on .then(ref) and expense properities together.
            }));
        });
    };
};//End of Export
   

//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) =>({
    type: 'REMOVE_EXPENSE',
    id
});

//
export const startRemoveExpense = ({id} = {}) => { 
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        })
    };
};

//EDIT_EXPENSE
export const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
});

//SET_EXPENSE
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//FETCH THE DATA AT START
export const startSetExpenses =  () => {
    /*Return with dispatch variable to get darta */
    return (dispatch) => {
        /* Return with promise string. Collect data reference called expenses from firebase with value 
        at once. When data is successfully obtained, it proceed to then() call with snapshot variable.
        The snapshot variable snaps at object structure.*/
        return database.ref('expenses').once('value').then((snapshot) => {
            
            /* setting up expenses with nothing */
            const expenses = [];

            /* Collect object structure and show list of items in array, Since snapshot isn't working
            best with redux. childSnapshot is get called as variable.*/
            snapshot.forEach((childSnapshot) => {
                /* To push() childSnapshot propties such as key and values to firebase*/
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            /* dispatching setExpense action with expense variable*/
            dispatch(setExpenses(expenses))
        });
       
    };
};