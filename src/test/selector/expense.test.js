import moment from 'moment';
import selectExpenses from '../../selectors/expense';
import expenses from '../fixures/expenses';

// Filter result with text
test('Filter by text value', () => {
    //Filter set by Actions
    const filters = ({
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    });
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]])
});

// filter start date
test('filter by Start date', () => {
    const filters = ({
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    });
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]])
});

// filter end Date
test('filter by End date', () => {
    const filters = ({
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    });
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]])
});

// Sort out Date
test('filter by sort date', () => {
    const filters = ({
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    });
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});


test('filter by amount', () => {
    const filters = ({
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
    });
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});

