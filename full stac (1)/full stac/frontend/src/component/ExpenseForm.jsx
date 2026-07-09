import { useState } from "react";

function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    console.log("Button Clicked");
    console.log(title);
    console.log(amount);
    console.log(category);
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
    </div>
  );
}

export default ExpenseForm;
