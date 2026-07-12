import { useEffect, useState } from "react";
import axios from "axios";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const response = await axios.get(`${API_URL}/expenses`);

      console.log(response.data);

      // Take only the array from the response
      setExpenses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Expenses Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
