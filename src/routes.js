import Login from "./components/Login.js";
import Owner from "./components/Owner.js";
import Manager from "./components/Manager.js";
import Clerk from "./components/Clerk.js";
import CreateUser from "./components/CreateUser.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forgot_password from "./components/forgot_password.js";
import Otp from "./components/OTP.js";
import ChangePassword from "./components/ChangePassword.js";
import Navbar from "./components/sidebar.js";
import Home from "./components/Home.js";
import LogOut from "./components/logout.js";
import PrimaryAppBar from "./components/PrimaryAppBar.js";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Home" component={Home} />
      <Route path="/Owner" component={Owner} />
      <Route path="/Manager" component={Manager} />
      <Route path="/Clerk" component={Clerk} />
      <Route path="/CreateUser" component={CreateUser} />
      <Route path="/ForgotPassword" component={Forgot_password} />
      <Route path="/Otp" component={Otp} />
      <Route path="/changePassword" component={ChangePassword} />
      <Route path="/sidebar" component={Navbar} />
      <Route path="/Logout" component={LogOut} />
      <Route path="/Demo" component={PrimaryAppBar} />
    </Switch>
  </Router>
);

export default Routes;
