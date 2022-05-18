import { async } from '@firebase/util';
import React from 'react';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Tasks from '../Tasks/Tasks';

const Home = () => {
    
  const [user] = useAuthState(auth);
  const email= user?.email
  const token=localStorage.getItem('accessToken')
  const [task, setTask] = useState([]);
  const [name, setName] = useState('');
  const [des, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/readExpense')
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
          const newExpenselist = task.filter((element) => {
            return element._id !== id;

          })
          setTask(newExpenselist)
        }
        else{
            alert("Error")
        }
      })


  }


  const editItem = (id) => {

    const finditem = task.find((element) => {
      return element._id === id;
    })
    if (finditem) {
      setEdit(true)
      setDescription(finditem.cost)
      setName(finditem.item)
      setId(finditem._id)
    }

  }

  const handleFormsubmit = (e) => {
    e.preventDefault();
    //  const exist=
    if (edit) {
      const expense = { item: name, cost: des }
      fetch(`http://localhost:5000/updateExpense/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(expense)
      }).then(res => res.json())
        .then(({ acknowledged, modifiedCount }) => {
          if (acknowledged && modifiedCount == 1) {
            const newExpenselist = task.map((element) => {
              if (element._id === id) {
                element.cost = des;
                element.item = name;
              }
              return element;
            })
            setTask(newExpenselist)
            setEdit(false)
            setDescription('')
            setName('')
            setId('')
          }
          else{
            alert("Error")
        }
        })


    }
    else {
      const expense = { item: name, cost: des }
      fetch("http://localhost:5000/addExpense", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(expense)
      }).then(res => res.json())
        .then(({ acknowledged, insertedId }) => {
          if (acknowledged) {
            const newExpense = { _id: insertedId, item: name, cost: des };
            setTask([...task, newExpense])
            setName('');
            setDescription('');
          }
          else{
            alert("Error")
        }
        })
    }

  }

    return (
        <>
            <div className="">
                <div className="container mt-5">
                    <div className="row my-5 g-3">
                        <div className="col-8 mx-auto">
                            <AddTaskForm name={name} des={des} edit={edit} handledesInput={handledesInput} handleFormsubmit={handleFormsubmit} handlenameInput={handlenameInput} ></AddTaskForm>
                        </div>
                        <div className="col-8 mx-auto">
                            <Tasks expenses={task} deleteItem={deleteItem} editItem={editItem}></Tasks>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;