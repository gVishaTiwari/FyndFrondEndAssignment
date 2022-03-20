import React from "react";
import Search from "./Search";
import LocalNav from "./LocalNav";
import Trending from "./Trending";
import Favorites from "./Favorites";
import Detail from "./Detail";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Results from "./Results";
import { connect } from "react-redux";

const Dashboard = (props) => {
  return (
    <div>
      {props.isLoading ?
        <div style={{}}>
          <div style={{ fontSize: '32px', color: '#00c3cc', marginTop: '100px' }}>
            Please wait...
          </div>

        </div>
        :
        <BrowserRouter>
          <Search />
          <LocalNav />
          {""}
          <Switch>
            <Route
              exact
              path={["/", "/dashboard/trending"]}
              component={Trending}
            />
            <Route exact path="/dashboard/favorites" component={Favorites} />
            <Route path="/details/:movieId" component={Detail} />
            <Route path="/dashboard/searchResult" component={Results} />
          </Switch>
        </BrowserRouter>

      }

    </div>
  );
};

const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading
  })
}

export default connect(mapStateToProps)(Dashboard);
