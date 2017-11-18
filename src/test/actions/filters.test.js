import { sortByDate, sortByAmount, setTextFilter, setStartDate, setEndDate } from '../../actions/filters'
import moment from 'moment';



test('Should set Start Date with given Value',() => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test('Should set End Date with given Value',() => {
    const action = setEndDate(moment(1));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(1)
    })
});

test('Should set filter in Text with given Value',() => {
    const action = setTextFilter('Somewhat Wild!');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Somewhat Wild!'
    })
});

test('Should set filter in Text as Default',() => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('Sort by Date', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('Sort by Amount', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});