import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import { useLocation } from 'react-router'

const Status = () => {

	const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();

	const [msg1, setMsg1] = useState('')
	const [msg2, setMsg2] = useState('')
	const [msg3, setMsg3] = useState('')
	const [msg4, setMsg4] = useState('')
	const [msgs, setMsgs] = useState([])
	const [check, setCheck] = useState('')
	const check1 = "PHASE ONE LOAN LETTER ALLODED"
	const check2 = "PHASE TWO LOAN LETTER ISSUED"

	useEffect(() => {
		console.log(`All Learning License Details`)
		//getStatus()
	}, [])


	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};
		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);
	const id = isSignin.user.userId

	const getStatus = () => {

		const userId = isSignin.user.userId

		const role = isSignin.user.role
		// send user info to the API
		console.log(role)
		console.log(userId)


		axios.get(url + "/user/status/" + userId).then((response) => {
			const result = response.data;
			console.log("**********************");
			console.log(result);
			setMsgs(result)

			setMsg1(result.m1)
			setMsg2(result.m2)
			setMsg3(result.m3)
			setMsg4(result.m4)

			if (result.m1 === "Please apply for Phase one Process first!") {

				alert("Please apply for Phase one process first!");
				//used to redirect to another component
				history.push('/user/home')

			}
			if (result.m1 === "PHASE ONE LOAN LETTER ALLODED")
				setCheck("PHASE ONE LOAN LETTER ALLODED")

		});
	}

	return (
		<div className='container mt-5'>
			<div className="container mt-3">
      <div className="row justify-content-between">
        
        <div className="col-md-2" >
          <div className="card text-center text-white" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/license/learning" className="text-dark nav-link">
               Apply Phase 1 Loan Process
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-center" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/license/permanent" className="text-dark nav-link">
                Apply Phase 2 Loan Process
              </Link>
            </div>
          </div>
        </div>

        

        <div className="col-md-2">
          <div className="card text-center text-white" style={{backgroundColor:"paleturquoise"}}>
            <div className="">
              <Link to="/user/status" className="text-dark nav-link">
               Loan Application Status
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card">
            <div className="p-2 text-center" style={{backgroundColor:"paleturquoise"}}>
              <b style={{ color: "ActiveBorder", fontFamily: "" }}>
                Welcome {isSignin.user.firstName}
              </b>
              <div className="mt-3 p-2">
                <Link to="/user/logout" className="btn bg-danger btn-info btn-sm">
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
			<div className="container mt-4" align="center">
				<div className="card">
					<div className="card-header text-body" ><h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> <b>Know Your Status</b></h5></div>
					<div className="">
						<div className="row">
							<div className="col-md-12">
								<div className="error-template">

									<div id="accordion">

										<div className="card">
											<a className="card-link" data-toggle="collapse" href="#collapseLearning" onClick={getStatus}>
												<div className="card-header bg-light text-body" >
													<h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> <b>Click Here To Know Your Phase 1 Loan Process Status</b> </h5>
												</div></a>

											<div id="collapseLearning" className="collapse" data-parent="#accordion">
												<div className="card-body">
													<br />
													<div className="alert alert-primary">
														<strong>{msg1} &nbsp; : &nbsp; </strong>{msg2} &nbsp; &nbsp;
													</div>

													{msg1.match(check1) ? (
														<button className="btn btn-outline-success" ><Link className="nav-link" to={{ pathname: "/user/lcard" }}> DownLoad your Approved Phase 1 Loan Letter</Link></button>
													) : ''

													}

												</div>
											</div>
										</div>

										<br />

										<div className="card">
											<a className="card-link" data-toggle="collapse" href="#collapsePermanent" onClick={getStatus}>
												<div className="card-header text-body" >
													<h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> <b>Click Here To Know Your Phase 2 Loan Process Status</b> </h5>
												</div></a>

											<div id="collapsePermanent" className="collapse" data-parent="#accordion">
												<div className="card-body">
													<h5 hidden="true">isSignin.user.email </h5>
													<br />
													{msg3 == null ? (<div className="alert alert-primary">
														<strong>Not Applied for Phase 2 Loan Process </strong>
													</div>) : (
														<div className="alert alert-primary">
															<strong>{msg3} &nbsp; : &nbsp; </strong>{msg4} &nbsp; &nbsp;
														</div>
													)

													}

													{(msg3 !== null && msg3.match(check2)) ?
														(<button className="btn btn-outline-success" ><Link className="nav-link" to={{ pathname: "/user/pcard" }}>DownLoad your Loan Approved Letter</Link></button>)
														: ''
													}

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Status