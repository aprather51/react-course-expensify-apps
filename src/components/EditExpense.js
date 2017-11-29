import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends Component{
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
            <h1>Edit Expense</h1>
            {/* Edit Expense Component  - The id => {props.match.params.id} */}
            <ExpenseForm 
                expense={this.props.expense}
                onSubmit={this.onSubmit}
            />
            <button onClick={this.onRemove}>Remove</button>
        </div>
        );
    }
};
// // const EditExpensePage = (props) =>{ 
// //     console.log(props)
// //     return(
// //         <div>
// //             <h1>Edit Expense</h1>
// //             {/* Edit Expense Component  - The id => {props.match.params.id} */}
// //             <ExpenseForm 
// //                 expense={props.expense}
// //                 onSubmit={(expense) => {
// //                     console.log('updated!', expense)
// //                     props.dispatch(editExpense(props.expense.id, expense))  
// //                     //Id matched item (props.expense,id) then make change (expense)
// //                     props.history.push('/')
// //                     //Redirect
// //                 }} 
// //             />
// //             <button onClick={() => {
// //                 props.dispatch(removeExpense({ id: props.expense.id }))
// //                 props.history.push('/')
// //             }}>Remove</button>
// //         </div>
// //     );
// // };


//mapStateToProps allows us define what values from the Redux store the component should have access to. We can use it to give the component access to the entire store or just a specific subset of it's data.
const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

