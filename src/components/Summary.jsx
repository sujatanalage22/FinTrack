import React, { useMemo } from "react";

function Summary({ expenses }) {
  const total = useMemo(() => expenses.reduce((a, e) => a + e.amount, 0), [expenses]);
  const categoryTotals = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return map;
  }, [expenses]);

  return (
    <div className="summary-card card">
      <h2>Total Expenses: ₹{total}</h2>
      <div className="category-summary">
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <div key={cat} className={`category-badge ${cat}`}>{cat}: ₹{amt}</div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
