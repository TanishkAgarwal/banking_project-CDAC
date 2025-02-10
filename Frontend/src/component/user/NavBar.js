// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// function NavBar() {
//     const isSignin = useSelector((state) => state.isSignin);
//   return (
//     <nav className="navbar navbar-expand-sm sticky-top bg-primary navbar-dark ">
// 				<ul className="navbar-nav m-2">
// 					<li className="nav-item active mr-2"><Link to="/" className=" nav-item text-white">
//                   Home
//                 </Link></li>
		
// 					<li className="nav-item mr-3"><Link to="/contactus" className=" nav-item text-white">
//                   ContactUs
//                 </Link></li>
// 				</ul>
    
// 				<ul className="navbar-nav ml-auto">
// 					<li className="nav-item"><a className="nav-link"
// 						href="/user/login"><button type="button" className="btn bg-success btn-outline-light my-2 my-sm-0" >Login</button>
// 						<Link className="nav-link" to={
// 							/* this object inside the  tag */
// 							{
// 								pathname: '/users'
// 							}
// 						} >
// 						</Link>

// 					</a></li>
// 					<li className="nav-item"><a className="nav-link"
// 						href="/user/register">
// 						<button type="button" className="btn bg-success btn-outline-light my-2 my-sm-0">Register</button>
// 					</a></li>

// 				</ul>
// 			</nav>
//   )
// }

// export default NavBar


import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const isSignin = useSelector((state) => state.isSignin);

  return (
    <nav className="navbar navbar-expand-sm sticky-top bg-info navbar-dark">
      <ul className="navbar-nav m-2">
        <li className="nav-item active mr-2">
          <Link to="/" className="nav-link text-white">
            Home
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link to="/contactus" className="nav-link text-white">
            Contact Us
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        {!isSignin ? (
          <>
            <li className="nav-item">
              <Link to="/user/login" className="nav-link">
                <button
                  type="button"
                  className="btn bg-success btn-outline-light my-2 my-sm-0"
                >
                  Login
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user/register" className="nav-link">
                <button
                  type="button"
                  className="btn bg-success btn-outline-light my-2 my-sm-0"
                >
                  Register
                </button>
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
