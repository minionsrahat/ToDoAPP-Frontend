import React from 'react';

const ExpenseForm = ({item,cost,handlecostInput,handleitemInput,handleFormsubmit,edit}) => {


    return (
        <div className="card p-2 my-2">
            <div className="card-body">
                <form action="" onSubmit={handleFormsubmit}>
                    <div className="row">
                        <div className="col">
                            <input type="text"onChange={handleitemInput} required className="form-control" placeholder="Expense Item"value={item} aria-label="First name"/>
                        </div>
                        <div className="col">
                            <input type="number"onChange={handlecostInput} required className="form-control" placeholder="Expense Cost" value={cost} aria-label="Last name"/>
                        </div>
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-success">
                            {edit===true?'Edit':'Submit'}</button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default ExpenseForm;