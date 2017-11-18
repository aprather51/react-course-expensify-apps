import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItems from './ExpenseListItems';
import selectExpense from '../selectors/expense';


export const ExpenseList = (props) => (
    // <div>
    //     <h1>Expense List</h1>
    //     {props.expenses.map((expense) => {
    //         return <ExpenseListItems key={expense.id} {...expense}/>
    //     })}
    // </div>
    <div>
        {
            props.expenses.length === 0 ? (
                <h1>Expense List</h1>
            ) : (
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

