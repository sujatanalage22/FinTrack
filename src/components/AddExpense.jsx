import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("⚠️ Please fill all fields");
      return;
    }

    onAdd({ title, amount: parseFloat(amount), date, category });

    // reset fields
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("Food");

    // navigate back
    navigate("/expenses");
  }

  return (
    <div className="form-card card">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter expense title"
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">
            Add Expense
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={() => navigate("/expenses")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
