import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


// const now = moment();
// console.log(now.format('dddd, MMMM Do YYYY'))
// console.log(now.format('h:mm a'))

export default class ExpenseForm extends Component {

    //* Choice One
    // constructor(props) {
    //     super(props);

    //     this.state ={ 
    //         description: props.expense ? props.expense.description : '',
    //         note: props.expense ? props.expense.note : '',
    //         amount: props.expense ? (props.expense.amount / 100).toString() : '',
    //         createAt: props.expense ? moment(props.expense.createAt) : moment(),
    //         calendarFocused: false,
    //         error: ''
    //     };
    // }

    //* Choice 2 - (Prefered)
    state = { 
        description: this.props.expense ? this.props.expense.description : '',
        note: this.props.expense ? this.props.expense.note : '',
        amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
        createAt: this.props.expense ? moment(this.props.expense.createAt) : moment(),
        calendarFocused: false,
        error: ''
    };
    
    

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    
    //This should set correct amount value i.e. 23.21 not 23.212
    onAmountChange = (e) => {
        const amount = e.target.value;
        // (!amount || amount.match(....)) -- help to delete the value inside input
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }   
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onDateChange = (createAt) => {
        // if conditional (no else or else if) -- help to prevent deleting date value inside input
        if(createAt){ 
            this.setState(() => ({ createAt }));
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    onSubmit = (e) => {
         e.preventDefault();

        // if(!this.state.description || !this.state.amount) {
        //     this.setState(() => ({
        //         error: 'Please Provide description and Amount'
        //     }))
        //     console.log(this.setState.error);
        // } else {
        //     console.log('Submitted!');
        //     this.props.onSubmit({
        //         description: this.state.description,
        //         note: this.state.note,
        //         amount: parseFloat(this.state.amount, 10) * 100,
        //         //! base 10 )* 100 - converted into cents.
        //         createAt: this.state.createAt.valueOf() 
        //         //! .valueOf() moment unix timestamp.
        //     });
        // }

        if(!this.state.description && !this.state.amount ) {
            this.setState(() => ({
                error: 'Please include your description and amount'
            }));
        } else if (!this.state.description) {
            this.setState(() => ({
                error: 'Please include your description'
            }));
        } else if (!this.state.amount) {
            this.setState(() => ({
                error: 'Please include your amount'
            }));
        } else {
            this.setState(() => ({ error: '' }));
                
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10) * 100,
                //! base 10 )* 100 - converted into cents.
                createAt: this.state.createAt.valueOf() 
                //! .valueOf() moment unix timestamp.
            });
        }; 
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input 
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />  
                    <input 
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                        placeholder="(Optional) Note"
                        cols="30" 
                        rows="10"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}

// export default ExpenseForm;
