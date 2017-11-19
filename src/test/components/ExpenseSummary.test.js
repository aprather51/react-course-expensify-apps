import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';


test('Render ExpenseSummary with Single Total', () =>{
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={550}/>)
    expect(wrapper).toMatchSnapshot();
});

test('Render ExpenseSummary with multiple Total', () =>{
    const wrapper = shallow(<ExpenseSummary expenseCount={6} expenseTotal={32550}/>)
    expect(wrapper).toMatchSnapshot();
});