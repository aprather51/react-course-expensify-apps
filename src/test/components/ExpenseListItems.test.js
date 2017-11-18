import React from 'react'
import { shallow } from 'enzyme';
import ExpenseListItems from '../../components/ExpenseListItems';
import expenses from '../fixures/expenses';

test('Render ExpenseListItems with expenses', () => {
    const wrapper = shallow(<ExpenseListItems {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});
