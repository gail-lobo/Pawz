import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from './pages/Signup';
import NewProduct from './pages/NewProduct';
import { useSelector } from 'react-redux';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import EditProductPage from './pages/EditProductPage';

function App() {
  const user = useSelector(state => state.user);
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
      <Navigation/>
      <Routes>
        <Route index element={<Home/>}/>
        {!user && (
          <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </>
        )}

        {user && (
          <>
            <Route path="/cart/" element={<CartPage/>} />
            <Route path="/orders/" element={<OrdersPage/>} />
          </>
        )}
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/category/:category" element={<CategoryPage />}></Route>


        {user && user.isAdmin &&(
          <>
            <Route path="/new-product" element={<NewProduct />}></Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/product/:id/edit" element={<EditProductPage />}></Route>

          </>
        )
        }

        <Route path="*" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;