import { Link, Route, Routes } from 'react-router-dom';
import CustomerPage from './components/customer/CustomerPage';
import './style.css';
import OrderPage from './components/order/OrderPage';
import ItemPage from './components/items/ItemPage';
import OrderItemPage from './components/order_item/OrderItemPage';
import { useAppDispatch } from './state/hooks';
import { setCurrentPage, setIsModal, toggleEditMode } from './state/dataSlice';
// import Home from './components/Home';

const App = () => {
 const dispatch = useAppDispatch();
 return (
  <div className="app">
   <nav className="navbar">
    {/* <Link to="/" onClick={() => dispatch(setCurrentPage('home'))}>
     Home
    </Link> */}
    <Link to="/customers" onClick={() => dispatch(setCurrentPage('customer'))}>
     customers
    </Link>
    <Link to="/orders" onClick={() => dispatch(setCurrentPage('order'))}>
     orders
    </Link>
    <Link to="/items" onClick={() => dispatch(setCurrentPage('item'))}>
     items
    </Link>
    <Link
     to="/orders-items"
     onClick={() => dispatch(setCurrentPage('order_item'))}
    >
     orders-items
    </Link>
    <a className="edit" onClick={() => dispatch(toggleEditMode())}>
     EDIT
    </a>
    <a className="delete" onClick={() => dispatch(setIsModal(true))}>
     DELETE
    </a>
   </nav>
   <div className="content">
    <Routes>
     {/* <Route path="/" Component={() => <Home />} /> */}
     <Route path="/customers" Component={() => <CustomerPage />} />
     <Route path="/orders" Component={() => <OrderPage />} />
     <Route path="/items" Component={() => <ItemPage />} />
     <Route path="/orders-items" Component={() => <OrderItemPage />} />
    </Routes>
   </div>
  </div>
 );
};

export default App;
