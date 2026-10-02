import Header from './component/Header';
import ExpenseForm from './component/ExpenseForm';
import ExpenseTable from './component/ExpenseTable';
import Footer from './component/Footer';
import './App.css'


function App() {
  return (
    <div className="app">
      <Header />
      <ExpenseForm />
      <ExpenseTable />
      <Footer />
    </div>
  );
}

export default App;