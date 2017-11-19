import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItems from './ExpenseListItems';
import selectExpense from '../selectors/expense';


export const ExpenseList = (props) => (
    //==================================
    //==  Show Listing of Expenses  ===
    //==================================
    // <div>
    //     <h1>Expense List</h1>
    //     {props.expenses.map((expense) => {
    //         return <ExpenseListItems key={expense.id} {...expense}/>
    //     })}
    // </div>

    //==================================
    //==  Show Listing of Expenses  ===
    //====================================
    // Note: Idea is similar to above except it has Ternary Operation shows 
    //==================================
    <div>
        
        { 
            //** Ternary Operation -- if expense is empty as true ( props.expenses.length === 0 ) Then it will be literally empty -- Otherwise it will show lists of expenses.
            props.expenses.length === 0 ? ( <p><i>No Expenses have been created</i></p> ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItems key={expense.id} {...expense}/>
                })
            )
        }

    
    </div>  
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpense(state.expenses, state.filters)
    };
}

export default connect(mapStateToProps)(ExpenseList);

