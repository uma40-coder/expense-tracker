import "./Header.css";

function Header({ isLoggedIn, username, onLogout }) {
  return (
    <header className="site-header">
      <div className="header-brand">
        <span className="brand-logo">📊</span>
        <h1>Expense Tracker</h1>
      </div>

      {isLoggedIn && (
        <div className="header-user-actions">
          <span className="user-welcome">
            Hello, <strong>{username || "User"}</strong> 👋
          </span>
          <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
