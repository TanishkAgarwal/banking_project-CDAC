
import axios from "axios";
import { useState, useEffect } from 'react'
import { url } from "../component/common/constants";
import { useHistory } from "react-router-dom";
//import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import './learningForm.css'
import { Link } from "react-router-dom";
import { signinAction } from "../actions/signinActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LearningForm = () => {
	const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
	const [image, setImage] = useState(undefined)
	const [profile, setProfile] = useState(undefined);
    const [aadharCard, setAadharCard] = useState(undefined);
    const [panCard, setPanCard] = useState(undefined);


	
	if (isSignin.status === false) {
		alert('please signin first!!')
		history.push('/user/login')
	}

	console.log("8.4675210430.1450.34053");
	console.log(isSignin.user.email);

	var today = new Date();
	var date = today.getFullYear() + '-'
		+ (today.getMonth() + 1) + '-'
		+ today.getDate();
	var time = today.getHours() + ":"
		+ today.getMinutes() + ":"
		+ today.getSeconds();
	var date = date + ' ' + time;
	//  const[max,setMax]=useState('')
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
	const [flag, setFlag] = useState(0)


	//for age verification
	var todayTime = new Date();
	var month = todayTime.getMonth() + 1;
	var day = todayTime.getDate();
	var year = todayTime.getFullYear();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	var maxdate = (year - 18) + "-" + month
		+ "-" + day;

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
		verify()
	})

	const verify = () => {

		axios.get(url + '/license/lverify/' + isSignin.user.userId).then((response) => {
			const res = response.data
			console.log(res)
			if (res === "User Already Registered for Phase 1") {
				
				toast.info(res, { position: toast.POSITION.TOP_RIGHT, autoClose: false })
				history.push("/user/status")
			}
		})
	}

	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};
		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);
	const SaveImage = () => {
        const email = isSignin.user.email;
        const data = new FormData();
        data.append("profile", profile);
        data.append("aadharCard", aadharCard);
        data.append("panCard", panCard);
        data.append("email", email);

        axios.post(url + "/user/addimage", data)
            .then((response) => {
                const res = response.data;
                if (res.status === "OK") {
                    toast.info("Images Uploaded Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: false,
                    });
                    setFlag(1);
                } else {
                    toast.info(res.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: false,
                    });
                }
            })
            .catch((error) => {
                toast.error("Error uploading images", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: false,
                });
            });
    };

	// const SaveImage = () => {
	// 	console.log(isSignin.user.userId)
	// 	const email = isSignin.user.email
	// 	const data = new FormData()
	// 	data.append('profile', image)
	// 	data.append('email', email)
	// 	console.log(image)
	// 	console.log(email)
	// 	console.log(data)
	// 	axios.post(url + '/user/addimage', data).then((response) => {
	// 		const res = response.data
	// 		if (res.status === 'OK') {
	// 			if (res.message === 'Success') {
					
	// 				toast.info("Image Uploaded Succesfully", { position: toast.POSITION.TOP_RIGHT, autoClose: false })
	// 				setFlag(1);
	// 			}

	// 			else
	// 				toast.info(res.message, { position: toast.POSITION.TOP_RIGHT, autoClose: false })
				
	// 		}
	// 	})

	// }

	const onFileSelect = (event) => {
		setImage(event.target.files[0])
	}

	const license = () => {

		let data = {
			firstName: firstName,
			lastName: lastName,
			email: isSignin.user.email,
			aadharNo: aadharNo,
			mobileNo: mobileNo,
			dob: dob,
			gender: gender,
			bloodGroup: bloodGroup,
			identificationMark: identificationMark,
			state: state,
			district: district,
			village: village,
			landmark: landmark,
			pincode: pincode,
			street: street,
			appointmentDate: appointmentDate,
			appointmentTime: appointmentTime
		};

		console.log(data);
		
		axios.post(url + "/license/learning", data).then((response) => {
			const result = response.data;
			console.log("**********************");
			console.log(result);
			if (result === "Registered Successfully!!") {
				
				toast.info("Registered Successfully for Phase 1 Loan Process", { position: toast.POSITION.TOP_RIGHT, autoClose: 8000 })
				
				history.push('/user/status')
			} else {
				
				toast.info(response.error, { position: toast.POSITION.TOP_RIGHT, autoClose: false })
			}
		});
	}

	return (
		<div className="container mt-5 mb-5 d-flex justify-content-center align-items-center" >
			<div className="row">
				<div className="col-md-12">
					<div className="card"  >
						<div className="card-header" style={{ textAlign: "center" }}>
							<h5>Apply Phase 1 Loan Process</h5>
						</div>
						<div className="card-body">

							<div className="was-validated"  >
								<div className="row">
									<div className="col">
										<div className="form-group">
											<label for="firstName">First Name</label> <input type="text"
												className="form-control" placeholder="Enter First name"
												id="firstName" name="firstName" pattern="[A-Za-z]{3,15}" required onChange={(event) => {
													setFirstName(event.target.value)
												}} />

										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="lastname">Last Name</label> <input type="text"
												className="form-control" placeholder="Enter Last name"
												id="lastName" name="lastName" pattern="[A-Za-z]{3,15}" required onChange={(event) => {
													setLastName(event.target.value)
												}} />

										</div>
									</div>
								</div>

								<div className="form-group">
									<label for="email">Email Id :</label> <input type="email"
										className="form-control" placeholder="Enter email" id="email"
										name="email" required value={isSignin.user.email} onChange={(event) => {
											setEmail(event.target.value)
										}} />


								</div>
								<div className="form-group">
									<label for="aadharNo">Aadhar No.</label> <input type="text"
										className="form-control" placeholder="Enter Aadhar No" id="aadharNo"
										name="aadharNo" pattern="[1-9]{1}[0-9]{11}" required onChange={(event) => {
											setAadharNo(event.target.value)
										}} />
								</div>

								<div className="form-group">
									<label for="mobileNo">Mobile No.</label> <input type="text"
										className="form-control" placeholder="Eg. +918888888888"
										id="mobileNo" name="mobileNo" pattern="^[+]91(9|8|7)\d{9}$" required onChange={(event) => {
											setMobileNo(event.target.value)
										}} />
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<label for="dob">Choose Birth Date</label> <input type="date"
												className="form-control" id="dob" name="dob" max={maxdate}
												onChange={(event) => {
													setDob(event.target.value)
												}} required /><span></span>
										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="gender" >Gender</label> <select class="form-control"
												id="gender" name="gender" required onChange={(event) => {
													setGender(event.target.value)
												}}>
												<option value="">Choose...</option>
												<option value="MALE">MALE</option>
												<option value="FEMALE">FEMALE</option>
												<option value="PreferNotToSay">Prefer Not to Say</option>
												<option value="Other">Other</option>
											</select>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<label for="bloodGroup">Blood Group</label> <select
												className="form-control" id="bloodGroup" name="bloodGroup" required onChange={(event) => {
													setBloodGroup(event.target.value)
												}}>
												<option value="">Choose...</option>
												<option value="A+">A+</option>
												<option value="A-">A-</option>
												<option value="B+">B+</option>
												<option value="B-">B-</option>
												<option value="O+">O+</option>
												<option value="O-">O-</option>
												<option value="AB+">AB+</option>
												<option value="AB-">AB-</option>
											</select>

										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="identificationMark" >Identification Mark</label> <input
												type="text" class="form-control"
												placeholder="Identification Mark" id="identificationMark"
												name="identificationMark" pattern="[A-Za-z\s]{1,}" required onChange={(event) => {
													setIdentificationMark(event.target.value)
												}} />

										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<div className="form-group">
												<label for="state">State</label> <select class="form-control"
													id="state" name="state" required onChange={(event) => {
														setState(event.target.value)
													}}>
													<option value="">Choose...</option>
													<option value="Maharashtra">Maharashtra</option>
													<option value="Uttar Pradesh" disabled>Uttar Pradesh</option>
												</select>
											</div>

										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="district">District</label> <select
												className="form-control" id="district" name="district" required onChange={(event) => {
													setDistrict(event.target.value)
												}}>
												<option value="">Choose...</option>
												<option value="Pune">Pune</option>
												<option value="Aurangabad">Aurangabad</option>

											</select>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<div className="form-group">

												<label for="pincode">PinCode</label> <input type="text"
													className="form-control" placeholder="Enter PinCode" id="pincode"
													name="pincode" pattern="[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}"
													maxlength="6" required onChange={(event) => {
														setPincode(event.target.value)
													}} />
											</div>

										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="village">Village/City</label> <input type="text"
												className="form-control" placeholder="Enter Village/City"
												id="village" name="village" pattern="[A-Za-z]{1,}" required onChange={(event) => {
													setVillage(event.target.value)
												}} />
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<div className="form-group">

												<label for="landmark">Landmark</label> <input type="text"
													className="form-control" placeholder="Enter Landmark"
													id="landmark" name="landmark" required onChange={(event) => {
														setLandmark(event.target.value)
													}} />

											</div>

										</div>
									</div>
									<div className="col">
										<div className="form-group">
											<label for="street">Street</label> <input type="text"
												className="form-control" placeholder="Enter Street" id="street"
												name="street" required onChange={(event) => {
													setStreet(event.target.value)
												}} />

										</div>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<div className="form-group">
											<div className="form-group">
												<label for="appointmentDate">Application Date:</label> <input
													type="date" name="appointmentDate" id="appointmentDate"
													className="form-control" min={mindate} required onChange={(event) => {
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

														<option value="11:00">11:00 AM</option>
														<option value="01:30">01:30 PM</option>
														<option value="03:30">03:30 PM</option>

													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label for="createdAt">Created At</label> <input type="text"
										className="form-control" id="createdAt" disabled value={date} />
								</div>

								<h2>Upload Documents</h2>
            <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input type="file" className="form-control" onChange={(event) => setProfile(event.target.files[0])} />
            </div>
            <div className="mb-3">
                <label className="form-label">Aadhar Card</label>
                <input type="file" className="form-control" onChange={(event) => setAadharCard(event.target.files[0])} />
            </div>
            <div className="mb-3">
                <label className="form-label">PAN Card</label>
                <input type="file" className="form-control" onChange={(event) => setPanCard(event.target.files[0])} />
            </div>
            <button className="btn btn-primary" onClick={SaveImage}>Upload</button>
        </div>
		{
									flag > 0 ? (<button className="btn btn-primary mx-auto d-block"
										value="Next" onClick={license}>Next</button>) : (<p style={{ fontFamily: "redressed georgia garamond serif" }}>
											<label for="passportImage">Upload Photo First To Move Further</label></p>)
								}
								<p style={{ textAlign: "center" }}>
									<br /> Already Applied For Phase 1 Loan ? <Link className="text-success" to={{ pathname: "/license/permanent" }}>
										Click Here to Apply for Phase 2 Loan</Link>
								</p>

							</div>
						</div>
					</div>
				</div>
			</div>
		
	)
}

export default LearningForm



