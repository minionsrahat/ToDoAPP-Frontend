import React from 'react';
import {AiFillDelete} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
const Expense = (props) => {
    const {_id,item,cost}=props.expense;
    return (
        <div className="col-10 mx-auto p-2 shadow rounded">
            <div className="details d-flex justify-content-around align-items-center">
                <div className="expense-name">
                   {item}
                </div>
                <div className="expense-cost d-flex justify-content-center">
                 ${cost}
                </div>
                <div className="icon">
                    <AiFillDelete onClick={()=>props.deleteItem(_id)} className='me-3'></AiFillDelete>
                    <AiFillEdit onClick={()=>props.editItem(_id)}></AiFillEdit>
                </div>
            </div>

        </div>
    );
};

export default Expense;