export default (expenses) => {
    //Option 1
    // if (expenses.length === 0){
    //     return 0;
    // } else {
    //    return expenses
    //    .map((expense) => expense.amount)
    //    .reduce((sum, value) => sum + value, 0);
    // }

    //Option 2 -- (Refactored from option 1)
    //    return expenses
    //     .map((expense) => expense.amount)
    //     .reduce((sum, value) => sum + value, 0);

    //Option 3 -- (Refractored from option 2) -- Lean

       return expenses.reduce((sum, expense) => sum + expense.amount, 0)
};