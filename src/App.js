import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Login from './components/login';
import { connect } from "react-redux";
import {loadUser} from './redux/user/authAction'

const App = (props) => {
  useEffect(()=>{
    props.loadUser();
  },[])
  console.log("Props::",props)
  return (
    <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route path={["/"]} component={Dashboard} />
          </Switch>
        </div>
    </BrowserRouter>
  )
}
const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  })
}

export default connect(mapStateToProps,{loadUser})(App);
