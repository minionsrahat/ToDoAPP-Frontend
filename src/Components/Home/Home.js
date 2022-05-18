import { async } from '@firebase/util';
import React from 'react';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import Expenses from '../Expenses/Expenses';

const Home = () => {
    
  const [user] = useAuthState(auth);
  const email= user?.email
  const token=localStorage.getItem('accessToken')
  const [expenses, setExpense] = useState([]);
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/readExpense')
      .then(res => res.json())
      .then(data => setExpense(data))
  }, [])

  const calculateTotalExpense = () => {
    return expenses.reduce((acc, item) => acc + parseInt(item.cost), 0);
  }
  const handleitemInput = (e) => {
    setItem(e.target.value);
  }
  const handlecostInput = (e) => {
    setCost(e.target.value);
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
          const newExpenselist = expenses.filter((element) => {
            return element._id !== id;

          })
          setExpense(newExpenselist)
        }
        else{
            alert("Error")
        }
      })


  }


  const editItem = (id) => {

    const finditem = expenses.find((element) => {
      return element._id === id;
    })
    if (finditem) {
      setEdit(true)
      setCost(finditem.cost)
      setItem(finditem.item)
      setId(finditem._id)
    }

  }

  const handleFormsubmit = (e) => {
    e.preventDefault();
    //  const exist=
    if (edit) {
      const expense = { item, cost }
      fetch(`http://localhost:5000/updateExpense/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(expense)
      }).then(res => res.json())
        .then(({ acknowledged, modifiedCount }) => {
          if (acknowledged && modifiedCount == 1) {
            const newExpenselist = expenses.map((element) => {
              if (element._id === id) {
                element.cost = cost;
                element.item = item;
              }
              return element;
            })
            setExpense(newExpenselist)
            setEdit(false)
            setCost('')
            setItem('')
            setId('')
          }
          else{
            alert("Error")
        }
        })


    }
    else {
      const expense = { item, cost }
      fetch("http://localhost:5000/addExpense", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' ,
        accesstoken:`${email} ${token}`},
        body: JSON.stringify(expense)
      }).then(res => res.json())
        .then(({ acknowledged, insertedId }) => {
          if (acknowledged) {
            const newExpense = { _id: insertedId, item, cost };
            setExpense([...expenses, newExpense])
            setItem('');
            setCost('');
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
                            <ExpenseForm item={item} cost={cost} edit={edit} handlecostInput={handlecostInput} handleFormsubmit={handleFormsubmit} handleitemInput={handleitemInput} ></ExpenseForm>
                        </div>
                        <div className="col-8 mx-auto">
                            <Expenses expenses={expenses} deleteItem={deleteItem} editItem={editItem}></Expenses>
                        </div>
                        <div className="col-8 mx-auto">
                            <h5 className="text-center">
                                Total Expense: ${calculateTotalExpense()}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;