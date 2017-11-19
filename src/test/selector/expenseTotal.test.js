import selectExpenseTotal from '../../selectors/expenseTotal';
import expenses from '../fixures/expenses';

test('Expected to return 0 if no expenses', () => {
    const result = selectExpenseTotal([]);
    expect(result).toBe(0);
});

test('Expected to add single expenses', () => {
    const result = selectExpenseTotal([expenses[0]]);
    expect(result).toBe(195);
});

test('Expected to add multiple expenses', () => {
    const result = selectExpenseTotal(expenses);
    expect(result).toBe(114195);
});

