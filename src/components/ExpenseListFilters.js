import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

export class ExpenseListFilters extends Component{
    state = {
        calendarFocused: null //as string instead of t/f
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = ( calendarFocused) => {
        this.setState(() => ({ calendarFocused}));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSortChange = (e) => {
        if(e.target.value === 'date'){  
        //If value on date is matched, then it will filter out the date.
            this.props.sortByDate();
        }else if(e.target.value === 'amount'){
         //else if the value on amount is matched, then it will filter out the amount.
            this.props.sortByAmount();
        }
    }
    
    render(){
        return(
            <div>
            <input type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
            <select 
               value={this.props.filters.sortBy} 
               onChange={this.onSortChange}
            >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            {/* Moment() setup */}
            <DateRangePicker 
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={ this.onFocusChange}
                showClearDates={true}  //hit X to clear the date
                numberOfMonths={1} //show only one month
                isOutsideRange={() => false} //show date in past without greyed out.  
            />
        </div>
        );
    }
}


const mapStateToProps = (state) =>({ filters: state.filters });

const mapDispatchToProps = (dispatch) =>({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStarDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);