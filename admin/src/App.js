import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import { useSelector } from "react-redux";

function App() {
  // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  // const currentUser = user && JSON.parse(user).currentUser;
  // const admin = currentUser?.isAdmin;
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const History = useHistory()
  return (
    <Router>
      <Switch>
        <Route path="/login">
        {admin ?  <Home /> : <Login/> }
        </Route>
        {/* {admin && (
          <> */}
        <Route exact path="/">
        {admin ?  <Home /> : <Login/> }
        </Route>
        <Route path="/users">
           {admin ?  <UserList /> : <Login/> }
        </Route>
        <Route path="/user/:userId">
        {admin ?  <User /> : <Login/> }
        </Route>
        <Route path="/newUser">
        {admin ?  <NewUser /> : <Login/> }
        </Route>
        <Route path="/products">
        {admin ?  <ProductList /> : <Login/> }
        </Route>
        <Route path="/product/:productId">
        {admin ?  <Product /> : <Login/> }
        </Route>
        <Route path="/newproduct">
        {admin ?  <NewProduct /> : <Login/> }
        </Route>
        <Route path="/orders">
        {admin ?  <Order /> : <Login/> }
        </Route>
        {/* </>
        )} */}
      </Switch>
    </Router>
  );
}

export default App;
