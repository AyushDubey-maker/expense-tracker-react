import React,{ useEffect, useState} from 'react'

import Transaction from './Transaction'
import './TransactionList.css'
import firebase from 'firebase'
import { db } from '../firebase'
function TransactionList() {
 
  const user=firebase.auth().currentUser
  const [transactionData,setTransactionData]=useState([])
  
  useEffect(()=>{
  
      db.collection('transactions').doc(user?.uid).collection('user-transaction').orderBy('timestamp','desc').onSnapshot(snapshot=>(
        setTransactionData(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
        })))
      ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return (
        <div>
    <h3>History</h3>
      <ul id="list" className="list">
        {transactionData.map(transaction=>(

      <Transaction key={transaction.id}  transaction={transaction}/>
        ))}
      </ul> 
        </div>
    )
}

export default TransactionList
