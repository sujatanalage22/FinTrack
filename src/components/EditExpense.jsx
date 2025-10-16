import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditExpense({ expenses, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (expenses.length > 0) {
      const existingExpense = expenses.find(
        (exp) => exp.id === parseInt(id, 10)
      );

      if (existingExpense) {
        setTitle(existingExpense.title);
        setAmount(existingExpense.amount);
        setDate(existingExpense.date);
        setCategory(existingExpense.category);
      }

      setIsLoading(false);
    }
  }, [expenses, id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !amount || !date) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const existingExpense = expenses.find(
      (exp) => exp.id === parseInt(id, 10)
    );

    if (!existingExpense) {
      alert("Expense not found!");
      return;
    }

    onUpdate(existingExpense.id, {
      title: title.trim(),
      amount: parseFloat(amount),
      date,
      category,
    });

    navigate("/");
  }

  // show loading
  if (isLoading) {
    return (
      <div className="form-card card">
        <p>⏳ Loading expense...</p>
      </div>
    );
  }

  // if expense doesn't exist
  const existingExpense = expenses.find((exp) => exp.id === parseInt(id, 10));
  if (!existingExpense) {
    return (
      <div className="form-card card">
        <p>⚠️ Expense not found!</p>
      </div>
    );
  }

  return (
    <div className="form-card card">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="btn">
          Update Expense
        </button>
      </form>
    </div>
  );
}

export default EditExpense;
