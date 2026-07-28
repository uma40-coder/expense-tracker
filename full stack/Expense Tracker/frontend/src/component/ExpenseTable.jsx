import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const ExpenseTable = forwardRef(({ username }, ref) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const currentUser = username || localStorage.getItem("username");
      const url = currentUser
        ? `${API_URL}/expenses?username=${encodeURIComponent(currentUser)}`
        : `${API_URL}/expenses`;

      const response = await axios.get(url);

      console.log("Fetched expenses:", response.data);

      const dataList = Array.isArray(response.data)
        ? response.data
        : (response.data && response.data.data) || [];

      setExpenses(dataList);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshExpenses: fetchExpenses
  }));

  useEffect(() => {
    fetchExpenses();
  }, [username]);

  return (
    <div className="card expense-table-card">
      <div className="table-header-flex">
        <h2>📋 Previous Added Expenses</h2>
        <button className="btn btn-secondary btn-sm" onClick={fetchExpenses}>
          🔄 Refresh List
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading expenses...</div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount (₹)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses && expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={expense.id || index}>
                    <td className="expense-title-cell">{expense.title}</td>
                    <td className="expense-amount-cell">₹{Number(expense.amount).toLocaleString("en-IN")}</td>
                    <td>
                      <span className="category-badge">{expense.category}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    No Expenses Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

ExpenseTable.displayName = "ExpenseTable";

export default ExpenseTable;
