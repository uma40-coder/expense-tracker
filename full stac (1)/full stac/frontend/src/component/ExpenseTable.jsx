import { useEffect, useState } from "react";
import axios from "axios";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
     const response = await axios.get(`${API_URL}/expenses`);
     setExpenses(response.data.data);
    } catch (error) {
      console.log(error) ;
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
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
