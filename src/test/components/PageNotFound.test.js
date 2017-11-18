import React from 'react'
import { shallow } from 'enzyme';
import PageNotFound from '../../components/PageNotFound';

test('Render Page Not Found Correctly', () => {
    const wrapper = shallow(<PageNotFound/>);
    expect(wrapper).toMatchSnapshot();
});
