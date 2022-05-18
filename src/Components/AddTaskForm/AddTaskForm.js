import React from 'react';

const AddTaskForm = ({name,des, handledesInput,handlenameInput,handleFormsubmit,edit}) => {
    return (
        <div className="card p-2 my-2">
            <div className="card-body">
                <form action="" onSubmit={handleFormsubmit}>
                    <div className="row">
                        <div className="col">
                            <input type="text"onChange={handlenameInput} required className="form-control" placeholder="User Name"value={name} aria-label="First name"/>
                        </div>
                        <div className="col">
                            <input type="text"onChange={handledesInput} required className="form-control" placeholder="Task Description" value={des} aria-label="Last name"/>
                        </div>
                    </div>
                    <div className="text-center my-3">
                        <button type="submit" className="btn btn-success">
                            {edit===true?'Edit':'Add Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddTaskForm;