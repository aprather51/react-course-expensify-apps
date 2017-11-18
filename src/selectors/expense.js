import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        //!depreciated -- used for test purpose only
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        //* Current use integrate with moment
        const createAtMoment = moment(expense.createAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true;

        //dispatch message have to be set in lower case The toLowerCase() method returns the calling string value converted to lower case.
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

        
    }).sort((a,b) => {
        if(sortBy === 'date'){
           return a.createAt < b.createAt ? 1 : -1;
        }  else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
    console.log(startDateMatch, endDateMatch, textMatch)
};


