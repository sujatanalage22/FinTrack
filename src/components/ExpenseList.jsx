import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function ExpenseList({ expenses, onDelete }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const set = new Set(expenses.map(e => e.category));
    return ["All", ...Array.from(set)];
  }, [expenses]);

  const filtered = expenses.filter(e => {
    if (category !== "All" && e.category !== category) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="top-bar">
        <h2>Expenses</h2>
        <Link to="/add" className="btn">+ Add Expense</Link>
      </div>

      <div className="filters card">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="expense-list">
        {filtered.length === 0 && <div className="empty card">No expenses found.</div>}
        {filtered.map(exp => (
          <div key={exp.id} className="expense-item card">
            <div>
              <div className="expense-title">
                {exp.title} <span className={`badge ${exp.category}`}>{exp.category}</span>
              </div>
              <div className="meta">{format(new Date(exp.date), "dd MMM yyyy")} • ₹{exp.amount}</div>
            </div>
            <div className="actions">
              <Link to={`/edit/${exp.id}`} className="icon-btn"><FiEdit2 /></Link>
              <button onClick={() => onDelete(exp.id)} className="icon-btn"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
