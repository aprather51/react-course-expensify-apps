import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixures/expenses';

//Snapshot Simple Expense form
test('Render Dashboard page correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

//Snapshot with Data
test('Render Expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

//Simulate based on Submit
test('Render Expense Submit Error on Invalid Submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () =>{ }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

//On Change -- First input (Description)
test('Set description on change in Input', () => {
    const value = 'New Descrption';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

//On Change -- Text Area (Note)
test('Set Note on change in Text area', () => {
    const value = "New Notes";
    const wrapper = shallow (<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
})

//State amount in valid input - eg. 23.20
test('Set as valid input on correct amount format', () => {
    const value = '23.20';
    const wrapper = shallow (<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

//State amount invalid input - eg. 23.202
test('Set as invalid input on incorrect amount format', () => {
    const value = '23.202';
    const wrapper = shallow (<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

//Validate onSubmit() props
test('Call onSubmit() props for valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow (<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () =>{ }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createAt: expenses[0].createAt.valueOf() 
    });
});

//Set onDateChange() to new date
test('Set new date on date change', () => {
    const now = moment();
    const wrapper = shallow (<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createAt')).toEqual(now);
});

//Set onFocusChange() on calendar change
test('Set on focus on calendar change', () => {
    const focused = true;
    const wrapper = shallow (<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});
