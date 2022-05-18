import React from 'react';
import {AiFillDelete} from 'react-icons/ai';
import {AiFillCheckCircle,AiFillEdit} from 'react-icons/ai';
const Task = (props) => {
    const {_id,name,des,status}=props.task;
    return (
        <div className="col-10 mx-auto p-2 shadow rounded">
            <div className="details d-flex justify-content-around align-items-center">
                <div className="expense-name">
                 {status && status==1?<del>{name}</del>:name}
                </div>
                <div className="expense-cost d-flex justify-content-center">
                {status && status==1?<del>{des}</del>:des}
                </div>
                <div className="icon d-flex">
                   <button   onClick={()=>props.deleteItem(_id)} type="button" class="btn me-2 btn-danger d-flex align-items-center">Delete <AiFillDelete  className='ms-2'></AiFillDelete></button>
                   <button   onClick={()=>props.editItem(_id)} type="button" class="btn me-2 btn-primary d-flex align-items-center">Edit <AiFillEdit  className='ms-2'></AiFillEdit></button>
                   <button disabled={status==1}  onClick={()=>props.completeItem(_id)}type="button" class="btn btn-success d-flex align-items-center">Complete<AiFillCheckCircle></AiFillCheckCircle></button>
                </div>
            </div>

        </div>
    );
};

export default Task;