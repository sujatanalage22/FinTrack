import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";
import Summary from "./components/Summary";
import api from "./services/api";
import "./index.css";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const res = await api.get("/expenses?_sort=date&_order=desc");
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses!");
    }
  }

  async function handleAdd(exp) {
    try {
      const res = await api.post("/expenses", exp);
      setExpenses([res.data, ...expenses]);
      alert("Expense added successfully ✅");
      navigate("/");
    } catch (err) {
      alert("Failed to add expense ❌");
    }
  }

  async function handleUpdate(id, updated) {
    try {
      const res = await api.put(`/expenses/${id}`, updated);
      setExpenses(expenses.map(e => (e.id === id ? res.data : e)));
      alert("Expense updated successfully ✅");
      navigate("/");
    } catch (err) {
      alert("Failed to update expense ❌");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e.id !== id));
      alert("Expense deleted successfully ✅");
    } catch (err) {
      alert("Failed to delete expense ❌");
    }
  }

  return (
    <div className="app">
      <Summary expenses={expenses} />
      <Routes>
        <Route path="/" element={<ExpenseList expenses={expenses} onDelete={handleDelete} />} />
        <Route path="/add" element={<AddExpense onAdd={handleAdd} />} />
        <Route path="/edit/:id" element={<EditExpense onUpdate={handleUpdate} expenses={expenses} />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
