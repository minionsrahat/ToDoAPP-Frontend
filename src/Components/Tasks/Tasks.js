import React from 'react';
import Task from '../Task/Task';

const Tasks = ({tasks,deleteItem,editItem,completeItem}) => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row g-4">                 
                     {
                       tasks.map((task)=>{
                                return <Task key={task._id} deleteItem={deleteItem} completeItem={completeItem} editItem={editItem} task={task}></Task>
                       })
                     }
                    </div>
                </div>
            </div>
        </>

    );
};

export default Tasks;