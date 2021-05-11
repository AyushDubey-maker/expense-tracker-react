import React,{useState} from 'react'
// import { getTotalExpenses, getTotalIncome, GlobalContext } from '../context/GlobalState'
import './AddTransaction.css'
import { useId } from "react-id-generator";
import { db } from '../firebase';
import firebase from 'firebase'
function AddTransaction() {
    const [text,setText]=useState('')
    const [amount,setAmount]=useState(0)
    // const {transactions}=useContext(GlobalContext)
    
    const [randomId]=useId()
    const user=firebase.auth().currentUser
    function submitTransaction(e){
      e.preventDefault()
      db.collection('transactions').doc(user?.uid).collection('user-transaction').add({
        id:randomId,
        text,
        amount:+amount,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
    
      setText('')
      setAmount(0)
    }
    return ( 
        <div>
          <h3>Add new transaction</h3>
      <form onSubmit={submitTransaction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input required type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>  
        </div>
    )
}

export default AddTransaction
