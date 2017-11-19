import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expense';
import selectExpensesTotal from '../selectors/expenseTotal';

export const ExpenseSummary = ({expenseCount, expenseTotal}) =>{
    //Terms - no s at end of expense if only one item. Otherwise add s
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    //setting up grand total
    const grandTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
     <div>
         <h3> Viewing {expenseCount} {expenseWord} totaling {grandTotal}</h3>
     </div>
    )};   

    const mapStateToProps = (state) => {
        //Set an constant -- to state visible of total amount expenses prior to each items, This also will state changes when amount is filtered out by date, amount or whatever is labeled inside input. 
       const visibleExpenses = selectExpenses(state.expenses, state.filters);
       //return with Numbers of items and total amount. 
       return{
           expenseCount: visibleExpenses.length,
           expenseTotal: selectExpensesTotal(visibleExpenses)
       }
    };

    export default connect(mapStateToProps)(ExpenseSummary);
