import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditExpense({ onUpdate, expenses }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const exp = expenses.find(e => e.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    if (exp) {
      setTitle(exp.title);
      setAmount(exp.amount);
      setDate(exp.date);
      setCategory(exp.category);
    }
  }, [exp]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount || !date) {
      alert("Please fill all fields");
      return;
    }
    onUpdate(exp.id, { title, amount: parseFloat(amount), date, category });
  }

  if (!exp) return <div className="empty card">Expense not found.</div>;

  return (
    <div className="form-card card">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Utilities</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <button type="submit" className="btn">Update Expense</button>
      </form>
    </div>
  );
}

export default EditExpense;
