import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import { useLocation } from 'react-router'
import Swal from 'sweetalert2'

const Pedit = () => {
	// maintain the state
	//const [licenses, setLicenses] = useState([])
	const [license, setLicense] = useState('')
	const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
	const [status, setStatus] = useState('')


	const location = useLocation()
	const licensedata = location.state.license


	useEffect(() => {
		console.log(`All permanent License Details`)
		getPermanent()
	}, [])
	const applicantId = licensedata.applicantId
	console.log(applicantId + " applicant id")
	const getPermanent = () => {
		console.log("****************")
		console.log(applicantId + " applicant id")
		axios.get(url + '/admin/permanent/', { params: { id: applicantId } }).then((response) => {
			const res = response.data
			console.log(res.result)
			if (res.status === 'OK') {
				setLicense(res.result)
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error while loading  License data',
					showConfirmButton: false,
					timer: 1500
				})
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

	const changeStatus = () => {
		const change = {
			"applicantId": applicantId,
			"permanentStatus": status
		};
		console.log(change)
		axios.post(url + '/admin/pedit', change).then((response) => {
			const res = response.data
			if (res.status === 'OK') {
				setLicense(res.result)
				console.log(res.result)
				Swal.fire({
					icon: 'success',
					title: 'Your work has been saved',
					showConfirmButton: false,
					timer: 1500
				})
				history.push('/padmin')
			} else {
				Swal.fire({
					icon: 'error',
					title: 'error while updating license status',
					showConfirmButton: false,
					timer: 1500
				})
			}
		})
	}


	return (
		<div className='container mt-5 mb-5'>
			{
				license != '' ? (
					<div className="row justify-content-center">
						<div className="col-md-8">
							<div className="card bg-light " style={{ width: "800px", height: "1500px" }}>
								<div className="card-header" style={{ textAlign: "center" }}><h5> <b>Phase 2 Loan Process</b> </h5></div>
								<div className="card-body">

									<table className="table table-hover">
										<tbody>

											<tr>
												<td>First Name</td>
												<td><input value={license.firstName} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Last Name</td>
												<td><input value={license.lastName} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>User Email</td>
												<td><input value={license.email} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Aadhar No</td>
												<td><input value={license.aadharNo} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Mobile No</td>
												<td><input value={license.mobileNo} className="form-control" disabled="true" /></td>
											</tr>
											<tr>
												<td>Birth Date</td>
												<td><input type="date" value={license.dob} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td> Gender</td>
												<td><input value={license.gender} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Blood Group</td>
												<td><input value={license.bloodGroup} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Identification Mark</td>
												<td><input value={license.identificationMark} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>State</td>
												<td><input value={license.state} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>District</td>
												<td><input value={license.district} className="form-control" disabled="true" /></td>
											</tr>
											<tr>
												<td>Pin code</td>
												<td><input value={license.pincode} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Village</td>
												<td><input value={license.village} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Landmark</td>
												<td><input value={license.landmark} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Street</td>
												<td><input value={license.street} className="form-control" disabled="true" /></td>
											</tr>
											<tr>
												<td>Created At</td>
												<td><input value={license.createdAt} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Application Date:</td>
												<td><input type="date" value={license.appointmentDate} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Application Time</td>
												<td><input type="time" value={license.appointmentTime} className="form-control" disabled="true" /></td>
											</tr>

											<tr>
												<td>Application Status:</td>
												{/* <td><select  value={license.permanentStatus} className="form-control" onChange={(e)=>{setStatus(e.target.value)}}> */}
												<td><select defaultValue={license.permanentStatus} className="form-control" onChange={(e) => { setStatus(e.target.value) }}>
													{/* <option  defaultValue={license.permanentStatus} label="BOOKED"/> */}
													{/* <option>{license.permanentStatus}</option> */}
													{/* <!-- <option value="APPLIEDFORPERMANENT" label="APPLIEDFORPERMANENT"/> --> */}
													{/* <option value="DRIVINGSLOTISSUED" label="DRIVINGSLOTISSUED" /> */}
													<option value="BOOKED" label="BOOKED" />

													{/* <option value="DRIVINGPASS" label="DRIVINGPASS" />
													<option value="DRIVINGFAIL" label="DRIVINGFAIL" /> */}
													<option value="COMPLETED" label="COMPLETED" />
													<option value="REJECTED" label="REJECTED" />
												</select>
												</td>
												{/* <td><errors path="learningStatus" value={license.dob} /></td> */}
											</tr>

											<tr>
												<td></td>
												<td><input value="Save" className="btn btn-primary " onClick={changeStatus} /></td>
												<td></td>
											</tr>
										</tbody>
									</table>

								</div>
							</div>
						</div>

					</div>
				) : <div>
					<h4>No Permanent License Available For Approval</h4>
				</div>
			}
			<hr />
		</div>

	)
}

export default Pedit