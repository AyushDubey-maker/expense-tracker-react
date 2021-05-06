// eslint-disable-next-line
import React,{useEffect,useState} from 'react'
// import { GlobalContext } from '../context/GlobalState'
import { db } from '../firebase';
import firebase from 'firebase'
import './Balance.css'
function Balance() {
    // const {transactions}=useContext(GlobalContext)
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
    // The toFixed() method converts a number into a string, rounding to a specified number of decimals.
    const total=amounts.reduce((acc,item)=>(acc += item),0).toFixed(2)
    return (
        <div>
            <h4>Your Balance</h4>
          
              <h1 className={total>0?'balance':'balance-danger'}>Rs {total}</h1>
         
        </div>
    )
}

export default Balance
