import axios from "axios";
import { useState, useEffect } from 'react'
import { url } from "../component/common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import './learningForm.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Swal from "sweetalert2";
const PermanentForm =()=>{

	const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
	const [license, setLicense] = useState('')
  
	//   if(isSignin.status === false){
	// 	  alert('please signin first!!')
	// 	  history.push('/user/login')
	// 	}

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [aadharNo, setAadharNo] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [dob, setDob] = useState('')
	const [gender, setGender] = useState('')
	const [bloodGroup, setBloodGroup] = useState('')
	const [identificationMark, setIdentificationMark] = useState('')
	const [state, setState] = useState('')
	const [district, setDistrict] = useState('')
	const [village, setVillage] = useState('')
	const [landmark, setLandmark] = useState('')
	const [pincode, setPincode] = useState('')
	const [street, setStreet] = useState('')
	const [appointmentDate, setAppointmentDate] = useState('')
	const [appointmentTime, setAppointmentTime] = useState('')

		useEffect(() => {
			const unloadCallback = (event) => {
			  event.preventDefault();
			  event.returnValue = "";
			  return "";
			};
			window.addEventListener("beforeunload", unloadCallback);
			return () => window.removeEventListener("beforeunload", unloadCallback);
		  }, []);
    
		  //for today date and time
    var today = new Date();
    var date = today.getFullYear() + '-'
            + (today.getMonth() + 1) + '-'
            + today.getDate();
    var time = today.getHours() + ":"
            + today.getMinutes() + ":"
            + today.getSeconds();
    var date = date + ' ' + time;

		//for appointment date 
		var todayTime = new Date();
		var month = todayTime.getMonth() + 2;
		var day = todayTime.getDate();
		var year = todayTime.getFullYear();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		var mindate = (year) + "-" + (month)
			+ "-" + day;

	useEffect(() => {
		console.log(`All Learning License Details`)
		getLearning()
	  }, [])

	const getLearning = () => {
      const id = isSignin.user.userId
		axios.get(url + '/license/learning/'+id).then((response) => {
			  const res = response.data
			  console.log(res)
			  if (res.status === 'OK') {
				setLicense(res.result)
				//console.log(res.result.firstName)
				//console.log(license.firstName)
				if(res.result==="Wait For Phase 1 Completion"){
					//alert(res.result)
					Swal.fire(
						res.result
					  )

					history.push("/user/status")
				}
				else if(res.result==="First Fill The Phase 1 Form"){
					alert(res.result)
					history.push("/license/learning")
				}
				else if(res.result==="Already applied for Phase 1"){
					//alert("ALredy Applied for permanent license")
					Swal.fire(
						"ALredy Applied for Phase 2",
					  )
					history.push("/user/status")
				}

			  } else {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: 'error while loading  License data',
					showConfirmButton: false,
					timer: 1500
				  })
				///Swal.fire('error while loading  License data')
			  }
			  setFirstName(res.result.firstName)
			setLastName(res.result.lastName)
			setDob(res.result.dob)
			setAadharNo(res.result.aadharNo)
			setMobileNo(res.result.mobileNo)
			setLandmark(res.result.landmark)
			})
			
	}

	const fillPermanent=()=>{
		let data ={
			firstName : firstName,
			lastName : lastName,
			email : isSignin.user.email,
			aadharNo : aadharNo,
			mobileNo : mobileNo,
			dob : dob,
			gender : license.gender,
			bloodGroup : license.bloodGroup,
			identificationMark : license.identificationMark,
			state : license.state,
			district : license.district,
			village : license.village,
			landmark : landmark,
			pincode : license.pincode,
			street : license.street,
			appointmentDate:appointmentDate,
			appointmentTime:appointmentTime
		};
		console.log("All the permanent address axios data")
		console.log(data);
		// send user info to the API
		axios.post(url + "/license/permanent", data).then((response) => {
		  const result = response.data;
		  console.log("**********************");
		  console.log(result);
		  if (result === "Your application is submitted sucessfully!!"){
			// dispatch(signinAction(result));
			Swal.fire({
			//	position: 'top-end',
				icon: 'success',
				title: 'Registered Successfully for Phase 2 Loan Process',
				showConfirmButton: false,
				timer: 1500
			  })
			//alert("Registered Successfully for permanent license");
			//used to redirect to another component
			history.push('/user/status')
		  }
		  else if(result === "Your application is not submitted, Please try Again!!"){
			//alert(result)
			Swal.fire({
			//	position: 'top-end',
				icon: 'error',
				title: result,
				showConfirmButton: false,
				timer: 1500
			  })
			history.push('/user/home')
			}

			else if(result==="User Already Registered for Phase 2"){
			//	alert(result)
				Swal.fire({
				//	position: 'top-end',
					icon: 'info',
					title: result,
					showConfirmButton: false,
					timer: 1500
				  })
				history.push('/user/status')
			}
			else{
				//alert("Some error occured")
				Swal.fire({
				//	position: 'top-end',
					icon: 'error',
					title: "Some error occured",
					showConfirmButton: false,
					timer: 1500
				  })
			}		
});
	}

    return(
        <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
	<div className="row">
		<div className="col-md-12">
        
			<div className="card bg-light " style={{width:"800px",height:"1265px"}} >
				<div className="card-header" style={{textAlign:"center"}}>
					<h5>Apply for Phase 2 Loan Process</h5>
				</div>
				<div className="card-body">

					<div className="was-validated">
						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="firstName">First Name</label>
									<input path="firstName" className="form-control" defaultValue={firstName} required onChange={(event) => {
											setFirstName(event.target.value)
										  }} />

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="lastname">Last Name</label>
									<input path="lastName" className="form-control" defaultValue={lastName} required onChange={(event) => {
											setLastName(event.target.value)
										  }} />

								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="email">Email Id :</label>
							<input path="email"  className="form-control" defaultValue={license.email}  required value={isSignin.user.email} onChange={(event) => {
									setEmail(event.target.value)
								  }}/>


						</div>
						<div className="form-group">
							<label for="aadharNo">Aadhar No.</label>
							<input path="aadharNo" className="form-control" defaultValue={aadharNo} required onChange={(event) => {
									setAadharNo(event.target.value)
								  }} />
						</div>

						<div className="form-group">
							<label for="mobileNo">Mobile No.</label>
							<input path="mobileNo" className="form-control"
								pattern="^[+]91(9|8|7)\d{9}$" defaultValue={mobileNo} required onChange={(event) => {
									setMobileNo(event.target.value)
								  }}/>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="dob">Choose Birth Date</label>
									<input type="date" path="dob" className="form-control" defaultValue={dob} required onChange={(event) => {
											setDob(event.target.value)
										  }} />
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="gender">Gender</label>
									<input path="gender" className="form-control" defaultValue={license.gender} />
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="bloodGroup">Blood Group</label>
									<input path="bloodGroup" className="form-control" defaultValue={license.bloodGroup}  />

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="identificationMark">Identification Mark</label>
									<input path="identificationMark" className="form-control" defaultValue={license.identificationMark} />

								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<label for="state">State</label>
										<input path="state" className="form-control" defaultValue={license.state} />

									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="district">District</label>
									<input path="district" className="form-control"  defaultValue={license.district} />

								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">

										<label for="pincode">PinCode</label>
										<input path="pincode" className="form-control" defaultValue={license.pincode} />
									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="village">Village/City</label>
									<input path="village" className="form-control" defaultValue={license.village} />

								</div>
							</div>
						</div>



						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">

										<label for="landmark">Landmark</label>
										<input path="landmark" className="form-control" defaultValue={landmark} required onChange={(event) => {
												setLandmark(event.target.value)
											  }} />

									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="street">Street</label>
									<input path="street" className="form-control" defaultValue={license.street} />

								</div>
							</div>
						</div>
						<hr />
						<p className="text-info"
							
                            style={{fontFamily: "redressed georgia garamond serif"}}>
							The above data is pre-filled using Phase 1 Loan Application
							Information.Please only change in case of any updation/changes in your details.</p>
						<hr />
						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<label for="appointmentDate">Application Date:</label> <input
											type="date" name="appointmentDate" id="appointmentDate"
											className="form-control" required min={mindate} onChange={(event) => {
												setAppointmentDate(event.target.value)
											  }} />
									</div>
								</div>
							</div>

							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<div className="form-group">
											<label for="appointmentTime">Application Time</label> <select
												className="form-control" id="appointmentTime"
												name="appointmentTime" required onChange={(event) => {
													setAppointmentTime(event.target.value)
												  }} >
												<option value="">Slot</option>
												<option value="09:00">09:00 AM</option>
												<option value="11:00">11:00 AM</option>
												<option value="01:30">01:30 PM</option>
												<option value="03:30">03:30 PM</option>
												<option value="05:00">05:00 PM</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label for="createdAt">Created At</label> <input type="text"
								className="form-control" id="createdAt" value={date} />
				
						</div>

						<button  className="btn btn-primary mx-auto d-block"
							value="Next" onClick={fillPermanent}>Next</button>
					</div>
					</div>
				</div>
			</div>

	</div>
	<hr />
        </div>
    )
}

export default PermanentForm