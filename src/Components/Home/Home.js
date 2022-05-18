import { async } from '@firebase/util';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Tasks from '../Tasks/Tasks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    
  const [user] = useAuthState(auth);
  const email= user?.email
  const token=localStorage.getItem('accessToken')
  const [tasks, setTask] = useState([]);
  const [name, setName] = useState('');
  const [des, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/readExpense',{
      headers: { 'Content-Type': 'application/json' ,
      accesstoken:`${email} ${token}`}
    })
      .then(res => res.json())
      .then(data => setTask(data))
  }, [])

  const handlenameInput = (e) => {
    setName(e.target.value);
  }
  const handledesInput = (e) => {
    setDescription(e.target.value);
  }


  const deleteItem = async (id) => {
    fetch(`http://localhost:5000/deleteExpense/${id}`, {
      method: "DELETE",
      headers:{
        accesstoken:`${email} ${token}`
      }

    })
      .then(res => res.json())
      .then(({ acknowledged, deletedCount }) => {
        if (acknowledged && deletedCount == 1) {
          const newExpenselist = tasks.filter((element) => {
            return element._id !== id;

          })
          toast("Task SuccessFully Deleted");
          setTask(newExpenselist)

        }
        else{
          toast("Sorry Unauthorized Access or invalid id");
        }
      })


  }


  const editItem = (id) => {
    const finditem = tasks.find((element) => {
      return element._id === id;
    })
    if (finditem) {
      setEdit(true)
      setDescription(finditem.des)
      setName(finditem.name)
      setId(finditem._id)
    }
  }

  const completeItem = (id) => {
    const finditem = tasks.find((element) => {
      return element._id === id;
    })
    if (finditem) {
      fetch(`http://localhost:5000/completeTask/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify({status:1})
      }).then(res => res.json())
        .then(({ acknowledged, modifiedCount }) => {
          if (acknowledged && modifiedCount == 1) {
            const newTasklist = tasks.map((element) => {
              if (element._id === id) {
                element.status = 1;
              }
              return element;
            })
            toast("Wow your task is now completed");
            setTask(newTasklist)
          }
          else{
            toast("Sorry Unauthorized Access or invalid id");
        }
        })
    }
  }


  const handleFormsubmit = (e) => {
    e.preventDefault();
    //  const exist=
    if (edit) {
      const task = { name: name, des: des ,status:0}
      fetch(`http://localhost:5000/updateExpense/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(task)
      }).then(res => res.json())
        .then(({ acknowledged, modifiedCount }) => {
          if (acknowledged && modifiedCount == 1) {
            const newTasklist = tasks.map((element) => {
              if (element._id === id) {
                element.des = des;
                element.name = name;
              }
              return element;
            })
            toast("Task Successfully Updated");
            setTask(newTasklist)
            setEdit(false)
            setDescription('')
            setName('')
            setId('')
          }
          else{
            toast("Sorry Unauthorized Access or invalid id");
        }
        })


    }
    else {
      const task = { name: name, des: des ,status:0}
      fetch("http://localhost:5000/addExpense", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(task)
      }).then(res => res.json())
        .then(({ acknowledged, insertedId }) => {
          if (acknowledged) {
            const newTask = { _id: insertedId, name: name, des: des, status:0 };
            toast("Task Successfully added");
            setTask([...tasks, newTask])
            setName('');
            setDescription('');
          }
          else{
            toast("Sorry Unauthorized Access or invalid id");
        }
        })
    }
  }

    return (
        <>
            <div className="">
                <div className="container mt-5">
                    <div className="row my-5 g-3">
                      <ToastContainer></ToastContainer>
                        <div className="col-8 mx-auto">
                            <AddTaskForm name={name} des={des} edit={edit} handledesInput={handledesInput} handleFormsubmit={handleFormsubmit} handlenameInput={handlenameInput} ></AddTaskForm>
                        </div>
                        <div className="col-8 mx-auto">
                            <Tasks tasks={tasks} deleteItem={deleteItem} editItem={editItem} completeItem={completeItem}></Tasks>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;