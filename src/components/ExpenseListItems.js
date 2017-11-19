import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItems = ({id, description, amount, createAt}) => (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description} </h3>
      </Link> 
      <p>
        {numeral(amount / 100).format('$0,0.00')} 
        - 
        {moment(createAt).format('dddd, MMMM D YYYY')}</p>
      <hr/>
    </div>
    
);

export default ExpenseListItems;