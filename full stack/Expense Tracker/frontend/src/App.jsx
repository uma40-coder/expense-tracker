import { useState, useRef } from "react";
import Header from "./component/Header";
import ExpenseForm from "./component/ExpenseForm";
import ExpenseTable from "./component/ExpenseTable";
import Footer from "./component/Footer";
import Login from "./component/Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [showTable, setShowTable] = useState(false);

  const tableRef = useRef();

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setShowTable(false);
  };

  const handleExpenseAdded = () => {
    if (tableRef.current) {
      tableRef.current.refreshExpenses();
    }
  };

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
      />

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <main className="dashboard-content">
          {/* Expense Addition Form */}
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />

          {/* View / Hide Previous Expenses Button */}
          <div className="toggle-section">
            <button
              className={`btn ${showTable ? "btn-secondary" : "btn-primary"} btn-lg`}
              onClick={() => setShowTable((prev) => !prev)}
            >
              {showTable ? "🙈 Hide Expenses" : "👁️ See Previous Added Expenses"}
            </button>
          </div>

          {/* Previous Expenses Table - Displayed on Button Click */}
          {showTable && <ExpenseTable ref={tableRef} />}
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
