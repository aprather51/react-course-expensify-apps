import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends Component{
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }
  render(){
    return(
      <div>
      <h1>Add Expense</h1>
      <ExpenseForm 
          onSubmit={this.onSubmit}
      />
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});
export default connect(undefined, mapDispatchToProps )(AddExpensePage);

// // const AddExpensePage = (props) => (
// //     <div>
// //       <h1>Add Expense</h1>
// //       <ExpenseForm 
// //          onSubmit={(expense) =>{
// //            //props.dispatch(addExpense(expense)); //from ExpenseForm.js (onSubmit function) to react-redux

// //           props.onSubmit(expense)

// //           props.history.push('/'); //redirect to root page after submit.
// //         }}
// //     />
// //   </div>
// //);



