import React,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'

//Initial State
const initialState={
    transactions:[]
}
export const getTotalIncome=(transactions)=>
transactions?.filter(item => item > 0)
.reduce((acc, item) => (acc += item), 0)
.toFixed(2);

export const getTotalExpenses=(transactions)=>(
transactions?.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
-1
).toFixed(2);
//Create Context
export const GlobalContext=createContext(initialState)

//Provider Component
export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState)
    //Actions
    function addTransaction(id){
        dispatch({
            type:'ADD_TRANSACTION',
            payload:id
        })
     }
    function deleteTransaction(transaction){
       dispatch({
           type:'DELETE_TRANSACTION',
           payload:transaction
       })
    }
    
    return(
        <GlobalContext.Provider value={{transactions:state.transactions,deleteTransaction,addTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}