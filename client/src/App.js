import './App.css';
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Login from './pages/login/Login';
import Cart from "./pages/cartpage/Cart";
import ReturnsAndOrders from './pages/returnandorders/ReturnsAndOrders';
import PaymentSuccess from './pages/paymentsuccesspage/PaymentSuccess';
import YourAccount from "./pages/youraccount/YourAccount"
import EditInfo from './pages/editinfo/EditInfo';
import ChangeMobile from './pages/editinfo/ChangeMobile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ChangeMobileVerify from './pages/editinfo/ChangeMobileVerify';
import ChangeName from './pages/editinfo/ChangeName';
import ChangeEmail from './pages/editinfo/ChangeEmail';
import ChangeEmailVerify from './pages/editinfo/ChangeEmailVerify';
import ChangePassword from './pages/editinfo/ChangePassword';
import AddAddress from './pages/editinfo/AddAddress';
import YourAddresses from './pages/youraddresses/YourAddresses';
import Register from './pages/register/Register';
import EditAddress from "./pages/editaddress/EditAddress";
import Image from "./pages/imagesPage/Image"
import Chat from "./pages/chat/Chat"
import CustomerService from './pages/customerServicePage/CustomerService';
import VideoCall from './pages/videoCallPage/VideoCall';

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <Router>
        <Routes>

          <Route exact path="/" element={user ? <Home /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/returnsAndOrders" element={user ? <ReturnsAndOrders /> : <Navigate to="/login" />} />
          <Route path="/paymentSuccess" element={user ? <PaymentSuccess /> : <Navigate to="/login" /> } />
          <Route path="/yourAccount" element={user ? <YourAccount /> : <Navigate to="/login" />} />
          <Route path="/editInfo" element={user ? <EditInfo /> : <Navigate to="/login" />} />
          <Route path="/changeMobile" element={user ? <ChangeMobile /> : <Navigate to="/login" />} />
          <Route path="/changeMobileVerify" element={user ? <ChangeMobileVerify /> : <Navigate to="/login" />} />
          <Route path="/changeName" element={user ? <ChangeName /> : <Navigate to="/login" />} />
          <Route path="/changeEmail" element={user ? <ChangeEmail /> : <Navigate to="/login" />} />
          <Route path="/changeEmailVerify" element={user ? <ChangeEmailVerify /> : <Navigate to="/login" />} />
          <Route path="/changePassword" element={user ? <ChangePassword /> : <Navigate to="/login" />} />
          <Route path="/addAddress" element={user ? <AddAddress /> : <Navigate to="/login" />} />
          <Route path="/yourAddresses" element={user ? <YourAddresses /> : <Navigate to="/login" />} />
          <Route path="/editAddress" element={user ? <EditAddress /> : <Navigate to="/login" />} />
          <Route path="/image" element={<Image />} />
          <Route path="/customerService" element={<CustomerService />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videoCall" element={<VideoCall />} />
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
