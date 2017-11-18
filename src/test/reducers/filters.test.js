import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('filter default value', () => {
    const stateResult = filterReducer(undefined, { type: '@@INIT'});
    expect(stateResult).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Sort by Amount', () => {
    const stateResult = filterReducer(undefined, {type: 'SORT_BY_AMOUNT' });
    expect(stateResult.sortBy).toBe('amount');
});

test('Sort by Date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const currentAction = { type: 'SORT_BY_DATE' };
    const stateResult = filterReducer(currentState, currentAction);
    expect(stateResult.sortBy).toBe('date');
});

test('Filter Text', () => {
    const text = 'This is Filter';
    const action = { 
        type: 'SET_TEXT_FILTER',
        text 
    };
    const stateResult = filterReducer(undefined, action);
    expect(stateResult.text).toBe(text);
});

test('Filter start date', () => {
    const startDate = moment();
    const action = { 
        type: 'SET_START_DATE',
        startDate 
    };
    const stateResult = filterReducer(undefined, action);
    expect(stateResult.startDate).toEqual(startDate)
});

test('Filter end date', () => {
    const endDate = moment();
    const action = { 
        type: 'SET_END_DATE',
        endDate 
    };
    const stateResult = filterReducer(undefined, action);
    expect(stateResult.endDate).toEqual(endDate)
});

