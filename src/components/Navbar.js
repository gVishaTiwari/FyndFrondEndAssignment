import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/user/authAction";
const UserProfile = ({ user, logout }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div onClick={() => setToggle(!toggle)} style={{ position: 'relative', borderRadius: '50%', marginTop: '12px', width: '40px', height: '40px', backgroundColor: 'gray' }}>
      <div style={{ position: 'absolute', bottom: '-11px', left: '13px', fontSize: '20px' }}>
        {user.name[0].toUpperCase()}
      </div>
      {toggle &&
        <div style={{
          borderTop: '1px solid ',
          borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: '#263238', position: 'absolute', left: '-100px', top: '40px', display: 'flex', flexDirection: 'column',
          width: 'auto'
        }}>
          <h7 style={{ height: '35px',padding: '0px 10px' }}>Name: {user.name}</h7>
          {/* <hr/> */}
          <h7 style={{ height: '35px',padding: '0px 10px',width:'max-content' }}>Email: {user.Email}</h7>
          <h7 style={{ height: '35px',padding: '0px 10px' }}>Profile: {user.profile}</h7>
          <button onClick={logout} className="btn btn-primary" style={{ height: '35px', marginTop: '15px' }}>Logout</button>
        </div>}
    </div>
  )
}
const Navbar = (props) => {
  const { isAuthenticated, user } = props;
  console.log(user)

  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper blue-grey darken-4">
            <NavLink
              to="/dashboard/trending"
              className="brand-logo center active"
            >
              Movie Mania
            </NavLink>

            <ul id="nav-mobile" className="right" >
              <li>
                <NavLink to="/">
                  {" "}
                  <strong>Home</strong>
                </NavLink>
              </li>


              <li>
                <NavLink to="/about">
                  {" "}
                  <strong>About </strong>
                </NavLink>
              </li>
              <li>

                <NavLink to="/login">
                  {" "}
                  <strong>{isAuthenticated ? <UserProfile logout={props.logout} user={user} /> : <button className="btn btn-primary"  >Login</button>} </strong>
                </NavLink>

              </li>
              {/* {isAuthenticated &&
              <button style={{marginRight:'10px'}} onClick={()=>props.logout()} className="btn btn-primary">Logout</button>
              } */}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.userDetails,
  })
}

export default connect(mapStateToProps, { logout })(Navbar);
