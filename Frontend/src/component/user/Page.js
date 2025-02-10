import axios from "axios";
import { useState, useEffect } from 'react'
//import { url } from "../common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './page.css';
import uicon from '../images/usericon.png'
import Swal from 'sweetalert2';

const Page = () => {


  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();

  if (!isSignin.status) {
    Swal.fire({
      title: 'Not Signed In',
      text: 'Please sign in first!',
      icon: 'warning',
      showConfirmButton: false,
      timer: 1500, // Display for 1.5 seconds
      onClose: () => {
        history.push('/user/login'); // Redirect to login route
      },
    });
  }
  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions here
        // alert('Logged out successfully');
        history.push('/user/logout'); // Redirect to logout route
      }
    });
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);




  return (
    <div className="container">
      <div className="container mt-3">
      <div className="row justify-content-between">
        
        <div className="col-md-2" >
          <div className="card text-center text-white" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/license/learning" className="text-dark nav-link">
                Apply For Phase 1 Loan Process 
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/license/permanent" className="text-dark nav-link">
              Apply For Phase 2 Loan Process 
              </Link>
            </div>
          </div>
        </div>

        

        <div className="col-md-2">
          <div className="card text-center text-white" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/user/status" className="text-dark nav-link">
              Loan Application  Status
              </Link>
            </div>
          </div>
        </div>
        

        <div className="col-md-2">
          <div className="card">
            <div className="card text-center p-2" style={{backgroundColor:"paleturquoise"}}>
              <b style={{ color: "ActiveBorder", fontFamily: "" }}>
                Welcome {isSignin.user.firstName}
              </b>
              <div className="mt-3 p-2">
                <Link to="/user/logout" onClick={handleLogout} className="btn btn-bg-danger btn-info btn-sm">
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    

      <div id ="phase1" className="container LL text-dark">
        <h1>Phase 1 Loan Process</h1>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <h3>Loan Application & Pre-Approval</h3>
            <br />
            <br />
            <p>The borrower submits a loan application along with necessary documents such as income proof, identity verification, and credit history.</p>
            <p>The lender evaluates the applicant's creditworthiness, employment status, and financial history.</p>
            <br />
            <p>A preliminary loan offer is provided based on the applicant's eligibility and loan requirements.</p>
            <p>The lender may conduct initial verifications and request additional documents if necessary.</p>
            <p>If the pre-approval is successful, the applicant moves to the next phase for further processing.</p>
          </div>
        </div>
      </div>


      <div id ="phase2" className="container DL text-dark">
        <h1>Phase 2 Loan Process</h1>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <h3>Loan Verification & Disbursement</h3>
            <br />
            <br />
            <p>The lender conducts a thorough verification of the submitted documents, including employment and property verification (if applicable).</p>
                      <p>The loan is assessed for risks, and underwriting is completed based on financial and collateral evaluations.</p>
            <p>A final loan agreement is prepared, and the borrower is required to sign the terms and conditions.</p>
            <p>If required, legal and technical checks are performed before final approval.</p>
            <p>Once all criteria are met, the loan is sanctioned, and the funds are disbursed to the borrower’s account..</p>
          </div>
        </div>
      </div>

      <hr />     

    </div>
  )
}

export default Page;