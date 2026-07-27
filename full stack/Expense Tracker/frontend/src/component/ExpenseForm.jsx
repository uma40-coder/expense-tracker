import { useState } from "react";
import axios from "axios";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!title || !amount || !category) {
      setMessage("Please fill in all fields.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const expense = {
      title: title,
      amount: amount,
      category: category,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const response = await axios.post(`${API_URL}/expenses`, expense);
      console.log(response.data);
      setTitle("");
      setAmount("");
      setCategory("");
      setMessage("Expense Added Successfully!");

      if (onExpenseAdded) {
        onExpenseAdded();
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="card expense-form-card">
      <h2>➕ Add New Expense</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="e.g. 1200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Food, Bills, Travel"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Expense
      </button>

      {message && (
        <p className={`message ${message.includes("Successfully") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ExpenseForm;
