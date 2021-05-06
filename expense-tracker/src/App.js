import "./App.css";
import AddTransaction from "./components/AddTransaction";
import Balance from "./components/Balance";
import Header from "./components/Header";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";

import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <>
              <Header />
              <Login />
            </>
          ) : (
            <>
              <Header />
              <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
              </div>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
