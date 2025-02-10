import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import './Lcard.css'
import SJ from '../images//loan.png'
import ReactToPrint from 'react-to-print'
import React, { useRef } from 'react';
import { ComponentToPrint } from './ComponentToPrint';
//import { useLocation } from 'react-router'
import ManagerSignature from '../images/managerSign.png';
import RegionalSignature from '../images/regional.png';
import LoanHeadSignature from '../images/Loan Head.png';
const Pcard = () => {

  const [license, setLicense] = useState('')
  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();
  const [status, setStatus] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [exDate, setExDate] = useState('')
  const [date1, setDate1] = useState('')
  const componentRef = useRef();
  const [profileImage, setProfileImage] = useState('');
   const [aadharCardPhotoImage, setAadharCardPhotoImage] = useState('');
    const [panCardPhotoImage, setPanCardPhotoImage] = useState('');
  useEffect(() => {
    console.log(`All Learning Permanent Details`)
    getLearning()
    getImage()
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

  const getLearning = () => {
    const id = isSignin.user.userId
    axios.get(url + '/license/permanent/' + id).then((response) => {
      const res = response.data
      if (res.status === 'OK') {

        const fullName = res.result.firstName + " " + res.result.lastName
        setName(fullName)
        console.log(license)
        console.log(license.createdAt)

        var date = new Date(res.result.createdAt);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year1 = date.getFullYear() + 10;
        var year = date.getFullYear();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }

        var mindate = (year) + "-" + (month)
          + "-" + day;
        setDate1(mindate)

        var maxdate = (year1) + "-" + (month)
          + "-" + day;
        setExDate(maxdate)
        setLicense(res.result)
      }
    })
  }

  const getImage = () => {
    const id = isSignin.user.userId;
    axios.get(`${url}/user/getimage/${id}`).then((response) => {
      const res = response.data;
      if (res.status === 'OK') {
        setProfileImage(res.result.profilePhoto);
        setAadharCardPhotoImage(res.result.aadharCardPhoto);
        setPanCardPhotoImage(res.result.panCardPhoto);
      }
    });
  };

  return (
    <div id='body' style={{marginBottom:"100px"}}>
      <div className="card-container">
      <div className="card">
      <div className="print-button mt-5">
      <div style={{ alignContent: "center" }}>
        <ReactToPrint
          trigger={() => <a class="btn text-light bg-success" role="button" href="#">Print Permanent License</a>}
          content={() => componentRef.current}
        />
      </div>
      </div>
      {
        license != null ? (
          <div className='container-fluid' ref={componentRef}>

            <section id="div1" className='container-fluid'>
              <img className='img5' src={SJ} style={{ width: "70px", height: "70px", position: "relative", marginLeft: "0px", marginTop: "0px" }}></img><p id="p1">LOAN APPROVAL</p>
              

             <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
             
                           <div id="div2">
                             <p id="p2 text-justify"><label id="label1">Applicant Name:</label> <label id="label2">{name}</label></p>
                             <p id="p2 text-justify"><label id="label1">Applicant City:</label> <label id="label2">{license.district}</label></p>
                             <p id="p2 text-justify"><label id="label1">Applicant D.O.B:</label> <label id="label2">{license.dob}</label></p>
                             <p id="p2 text-justify"><label id="label1">Application ID:</label> <label id="label2">{license.applicantId}</label></p>
                             {/* <p id="p2 text-justify"><label id="label1">Expiry:</label> <label id="label2">{exDate}</label></p> */}
                             <p id="p2 text-justify"><label id="label1">Applicant Gender:</label> <label id="label2">{license.gender}</label></p>
             
                           </div>
                           {profileImage ? (
                             <img className="img5" src={`/Uimages/${profileImage}`} alt="" />
                           ) : (<div id='a1'><Link className="nav-link" to={{ pathname: "/user/addimage" }}>Upload Photo</Link></div>)
                         }
                         </div>
                         <h5><b>Your Phase Two loan application has been successfully approved. Please find the authorized signatures below.</b>
                
              </h5>
              <table id='table'>
                {/* <tr><td className='td5' >Vehicle Class</td><td td className='td5'>LMV</td><td td className='td5'>MCWG</td><td td className='td5'></td><td td className='td5'></td></tr> */}
                <tr><td td className='td5'>Date Of Issue</td><td td className='td5'>{date1}</td></tr>
              </table>
              <hr />
              <table id='table' border="1" width="100%" style={{ marginTop: '10px' }}>
                  <tr>
                    <th className='td5'>Authority</th>
                    <th className='td5'>Signature</th>
                  </tr>
                  <tr>
                    <td className='td5'>Manager</td>
                    <td className='td5'><img src={ManagerSignature} alt="Manager Signature" style={{ width: "100px" }} /></td>
                  </tr>
                  <tr>
                    <td className='td5'>Regional Officer</td>
                    <td className='td5'><img src={RegionalSignature} alt="Manager Signature" style={{ width: "100px" }} /></td>
                  </tr>
                  <tr>
                    <td className='td5'>Loan Approval Head </td>
                    <td className='td5'><img src={LoanHeadSignature} alt="Manager Signature" style={{ width: "100px" }} /></td>
                  </tr>
                </table>
                <br />
                <p><b>Attached Documents For Phase 1 Application Process</b></p>
                {aadharCardPhotoImage ? (
                <img className="img5" src={`/Uimages/${aadharCardPhotoImage}`} alt="" />
              ) : (<div id='a1'><Link className="nav-link" to={{ pathname: "/user/addimage" }}>Upload Photo</Link></div>)
            }
                {panCardPhotoImage ? (
                <img className="img5" src={`/Uimages/${panCardPhotoImage}`} alt="" />
              ) : (<div id='a1'><Link className="nav-link" to={{ pathname: "/user/addimage" }}>Upload Photo</Link></div>)
            }
            </section>
          </div>
        ) : ''
      }
        </div>
        </div>
    </div>
  )
}

export default Pcard