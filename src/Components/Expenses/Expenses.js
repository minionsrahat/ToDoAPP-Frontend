import React from 'react';
import Expense from '../Expense/Expense';

const Expenses = ({expenses,deleteItem,editItem}) => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row g-4">                 
                     {
                       expenses.map((expense)=>{
                                return <Expense key={expense._id} deleteItem={deleteItem} editItem={editItem} expense={expense}></Expense>
                       })
                     }
                    </div>
                </div>
            </div>
        </>

    );
};

export default Expenses;