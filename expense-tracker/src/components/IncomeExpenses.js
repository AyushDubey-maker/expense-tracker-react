import React,{ useEffect, useState} from 'react'

import { db } from '../firebase';
import './IncomeExpenses.css'
import firebase from 'firebase'
function IncomeExpenses() {

  const [transactionsData,setTransactionsData]=useState([])
  const user=firebase.auth().currentUser
  useEffect(()=>{
    db.collection('transactions').doc(user?.uid).collection('user-transaction').onSnapshot(snapshot=>{
      setTransactionsData(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
        })))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const amounts = transactionsData.map(transaction => transaction.data.amount);
  const income = amounts
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
    const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
    return (
        <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p  className="money plus">{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p  className="money minus">{expense}</p>
        </div>
        </div>
    )
}

export default IncomeExpenses
