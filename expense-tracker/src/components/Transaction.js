import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import { db } from "../firebase";
import firebase from "firebase";
import CancelIcon from "@material-ui/icons/Cancel";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Input } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display:'flex',
    flexDirection:'column'
  },
}));
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  

  };
}
function Transaction({ transaction }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [amountData, setAmount] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateExpense = () => {
    db.collection("transactions")
      .doc(user?.uid)
      .collection("user-transaction")
      .doc(transaction.id)
      .set(
        {
          text: input,
          amount: +amountData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    setOpen(false);
  };
  // Checking if it's expense or income

  const sign = transaction.data.amount < 0 ? "-" : "+";
  const user = firebase.auth().currentUser;
  function deleteTransaction() {
    db.collection("transactions")
      .doc(user?.uid)
      .collection("user-transaction")
      .doc(transaction.id)
      .delete();
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal">
        <div style={modalStyle} className={classes.paper}>
          <CancelIcon onClick={handleClose} color="secondary"></CancelIcon>
          <h2>Update {transaction.data.amount < 0 ?"Expense":"Income"}</h2>
          <Input
            placeholder={transaction.data.text}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Input
            placeholder={transaction.data.amount}
            value={amountData}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Button onClick={updateExpense} color="primary" variant="contained">
            Update
          </Button>
        </div>
      </Modal>
      {/* Making className Dynamic..To change the border color. */}
      <li className={transaction.data.amount < 0 ? "minus" : "plus"}>
        {transaction.data.text}{" "}
        <span>
          {sign} Rs.{Math.abs(transaction.data.amount)}
        </span>
        <button className="delete-btn" onClick={deleteTransaction}>
          <DeleteIcon />
        </button>
        <button onClick={handleOpen} className="edit-btn">
          <EditOutlinedIcon />
        </button>
      </li>
    </div>
  );
}

export default Transaction;
