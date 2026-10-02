import { useState } from "react";
import axios from "axios";

function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const expense = {
      title: title,
      amount: amount,
      category: category,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/expenses",
        expense,
      );
      console.log(response.data);
      setTitle("");
      setAmount("");
      setCategory("");
      setMessage("Expense Added Successfully!");

        setTimeout(() => {

            setMessage("");

        },3000);

    } catch (error) {
        setMessage("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>You entered: {title}</p>
      <br />
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p>You entered Amount: {amount}</p>
      <br />
      <input
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <p>You entered Category: {category}</p>
      <button onClick={handleSubmit}>Add Expense</button>
      <p>{message}</p>
    </div>
  );
}

export default ExpenseForm;
