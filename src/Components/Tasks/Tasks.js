import React from 'react';
import Task from '../Task/Task';

const Tasks = ({expenses,deleteItem,editItem}) => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row g-4">                 
                     {
                       expenses.map((expense)=>{
                                return <Task key={expense._id} deleteItem={deleteItem} editItem={editItem} expense={expense}></Task>
                       })
                     }
                    </div>
                </div>
            </div>
        </>

    );
};

export default Tasks;