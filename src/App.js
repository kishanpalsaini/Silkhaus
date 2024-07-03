import logo from './logo.svg';
import './App.css';
import Product from "./pages/Product";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <h1>Product List</h1>
      <Product />
      
      <ToastContainer />
    </div>
  );
}

export default App;
