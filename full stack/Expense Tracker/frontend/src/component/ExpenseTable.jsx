import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const ExpenseTable = forwardRef(({ username }, ref) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", amount: "", category: "" });
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const currentUser = username || localStorage.getItem("username");
      const url = currentUser
        ? `${API_URL}/expenses?username=${encodeURIComponent(currentUser)}`
        : `${API_URL}/expenses`;

      const response = await axios.get(url);

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

  // Edit Handlers
  const handleEditStart = (expense) => {
    setEditingId(expense.id);
    setEditFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category
    });
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData({ title: "", amount: "", category: "" });
  };

  const handleEditSave = async (id) => {
    if (!editFormData.title || !editFormData.amount || !editFormData.category) {
      setActionMessage("Please fill out all fields before saving.");
      setTimeout(() => setActionMessage(""), 3000);
      return;
    }

    try {
      const currentUser = username || localStorage.getItem("username");
      const updatedExpense = {
        title: editFormData.title,
        amount: Number(editFormData.amount),
        category: editFormData.category,
        username: currentUser
      };

      await axios.put(`${API_URL}/expenses/${id}`, updatedExpense);
      setEditingId(null);
      setActionMessage("Expense updated successfully!");
      fetchExpenses();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (error) {
      console.error("Error updating expense:", error);
      setActionMessage("Failed to update expense.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  // Delete Handlers
  const handleDeleteClick = (expense) => {
    setDeletingExpense(expense);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExpense) return;
    try {
      await axios.delete(`${API_URL}/expenses/${deletingExpense.id}`);
      setDeletingExpense(null);
      setActionMessage("Expense deleted successfully!");
      fetchExpenses();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting expense:", error);
      setActionMessage("Failed to delete expense.");
      setDeletingExpense(null);
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingExpense(null);
  };

  const totalAmount = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="card expense-table-card">
      <div className="table-header-flex">
        <h2>📋 Previous Added Expenses</h2>
        <button className="btn btn-secondary btn-sm" onClick={fetchExpenses}>
          🔄 Refresh List
        </button>
      </div>

      {actionMessage && (
        <p className={`message ${actionMessage.includes("successfully") ? "success" : "error"}`}>
          {actionMessage}
        </p>
      )}

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses && expenses.length > 0 ? (
                <>
                  {expenses.map((expense) => {
                    const isEditing = editingId === expense.id;

                    if (isEditing) {
                      return (
                        <tr key={expense.id} className="edit-row">
                          <td>
                            <input
                              type="text"
                              className="edit-input"
                              value={editFormData.title}
                              onChange={(e) => handleEditChange("title", e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="edit-input"
                              value={editFormData.amount}
                              onChange={(e) => handleEditChange("amount", e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="edit-input"
                              value={editFormData.category}
                              onChange={(e) => handleEditChange("category", e.target.value)}
                            />
                          </td>
                          <td>
                            <div className="action-buttons-cell">
                              <button
                                className="btn-icon btn-save"
                                onClick={() => handleEditSave(expense.id)}
                              >
                                💾 Save
                              </button>
                              <button
                                className="btn-icon btn-cancel"
                                onClick={handleEditCancel}
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={expense.id}>
                        <td className="expense-title-cell">{expense.title}</td>
                        <td className="expense-amount-cell">
                          ₹{Number(expense.amount).toLocaleString("en-IN")}
                        </td>
                        <td>
                          <span className="category-badge">{expense.category}</span>
                        </td>
                        <td>
                          <div className="action-buttons-cell">
                            <button
                              className="btn-icon btn-edit"
                              onClick={() => handleEditStart(expense)}
                              title="Edit Expense"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-icon btn-delete"
                              onClick={() => handleDeleteClick(expense)}
                              title="Delete Expense"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  <tr className="summary-row">
                    <td colSpan="1">Total Expenses</td>
                    <td className="summary-amount">₹{totalAmount.toLocaleString("en-IN")}</td>
                    <td colSpan="2"></td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No Expenses Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingExpense && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon">⚠️</div>
            <h3>Delete Expense</h3>
            <p>
              Are you sure you want to delete <strong>"{deletingExpense.title}"</strong> (₹
              {Number(deletingExpense.amount).toLocaleString("en-IN")})? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleDeleteCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ExpenseTable.displayName = "ExpenseTable";

export default ExpenseTable;
