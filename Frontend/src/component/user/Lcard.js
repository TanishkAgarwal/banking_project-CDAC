// import axios from 'axios'
// import React, { useRef } from 'react';
// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { url } from '../common/constants'
// import { useSelector } from 'react-redux'
// import { useHistory } from "react-router-dom";
// import $, { data } from 'jquery'
// // import pic from '../images/team/team lead.jpg'
// import './Lcard.css'
// import SJ from '../images/SJ.jpg'
// import ReactToPrint from 'react-to-print'
// import { ComponentToPrint } from './ComponentToPrint';
// //import reactToprint from react-to-print;
// //import { useLocation } from 'react-router'

// const Lcard = () => {

//   const [license, setLicense] = useState('')
//   const isSignin = useSelector((state) => state.isSignin);
//   const history = useHistory();
//   const [status, setStatus] = useState('')
//   const [image, setImage] = useState('')
//   const [name, setName] = useState('')
//   const [exDate, setExDate] = useState('')
//   const [date1, setDate1] = useState('')
//   const componentRef = useRef();


//   //   if(isSignin.status === false){
//   //     alert('please signin first!!')
//   //     history.push('/user/login')
//   //   }

//   useEffect(() => {
//     console.log(`All Learning License Details`)
//     getLearning()
//     getImage()
//   }, [])


//   useEffect(() => {
//     const unloadCallback = (event) => {
//       event.preventDefault();
//       event.returnValue = "";
//       return "";
//     };
//     window.addEventListener("beforeunload", unloadCallback);
//     return () => window.removeEventListener("beforeunload", unloadCallback);
//   }, []);



//   const getLearning = () => {
//     const id = isSignin.user.userId
//     axios.get(url + '/license/learningg/' + id).then((response) => {
//       const res = response.data
//       if (res.status === 'OK') {

//         // const fullName = isSignin.user.firstName+" "+isSignin.user.lastName
//         const fullName = res.result.firstName + " " + res.result.lastName
//         setName(fullName)
//         console.log(license)

//         var date = new Date(res.result.createdAt);
//         var month = date.getMonth() + 7;
//         var year = date.getFullYear();
//         if ((date.getMonth() + 7) > 12) {
//           month = (date.getMonth() + 7) % 12
//           year = date.getFullYear() + 1

//         }
//         var day = date.getDate();

//         if (month < 10) {
//           month = "0" + month;
//         }
//         if (day < 10) {
//           day = "0" + day;
//         }

//         var mindate = (year) + "-" + (month)
//           + "-" + day;
//         setDate1(mindate)

//         var maxdate = (year) + "-" + (month)
//           + "-" + day;

//         setExDate(maxdate)

//         setLicense(res.result)

//       }
//     })


//   }

//   const getImage = () => {
//     const id = isSignin.user.userId
//     axios.get(url + '/user/getimage/' + id).then((response) => {
//       const res = response.data
//       if (res.status === 'OK')
//         setImage(res.result)

//     })

//   }


//   return (


// <div id="body">
// <div className="card-container">
//   <div className="card">
//     <div className="print-button mt-5">
//       <ReactToPrint
//         trigger={() => (
//           <a className="btn text-light bg-success" role="button" href="#">
//             Print Learning License
//           </a>
//         )}
//         content={() => componentRef.current}
//       />
//     </div>

//     {license !== '' ? (
//       <div className="container-fluid" ref={componentRef}>
//         <section id="div1" className='container-fluid' >
//               <img className='img5' src={SJ} style={{ width: "70px", height: "70px", position: "relative", marginLeft: "0px", marginTop: "0px" }}></img><p id="p1">INDIAN UNION DRIVING LICENSE</p>
//               <p id="p5"><p id='p6'>MAHARASTRA STATE MOTOR DRIVING LICENCE</p></p>


//               <div id="div2">
//                 <p id="p2 text-justify"><label id="label1">Name:</label> <label id="label2">{name}</label></p>
//                 <p id="p2 text-justify"><label id="label1">City:</label> <label id="label2">{license.district}</label></p>
//                 <p id="p2 text-justify"><label id="label1">D.O.B:</label> <label id="label2">{license.dob}</label></p>
//                 <p id="p2 text-justify"><label id="label1">ID NO:</label> <label id="label2">{license.applicantId}</label></p>
//                 <p id="p2 text-justify"><label id="label1">Expiry:</label> <label id="label2">{exDate}</label></p>
//                 <p id="p2 text-justify"><label id="label1">Gender:</label> <label id="label2">{license.gender}</label></p>

//               </div>
//               {
//                 image != '' ?
//                   (<img className='img5' src={'/Uimages/' + image} alt="" />) : (<div id='a1'><Link className="nav-link" to={{ pathname: "/user/addimage" }}>Upload Photo</Link></div>)
//               }
//               <table id='table'>
//                 <tr><td className='td5'>Vehicle Class</td><td td className='td5'>LMV</td><td td className='td5'>MCWG</td><td td className='td5'></td><td td className='td5'></td></tr>
//                 <tr><td td className='td5'>Date Of Issue</td><td td className='td5'>{license.appointmentDate}</td><td td className='td5'>{license.appointmentDate}</td><td td className='td5'></td><td td className='td5'></td></tr>
//               </table>

//               <hr />
//             </section>
//            <tr><td><h5 id='h5' >LEARNING LICENCE VALID FOR 6 MONTHS</h5></td></tr> 
//       </div>
//     ) : (
//       ''
//     )}

//     <br />
//     <hr id="hr" />
//   </div>
// </div>
// </div>

//   )
// }

// export default Lcard
import axios from 'axios'
import React, { useRef } from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
// import pic from '../images/team/team lead.jpg'
import './Lcard.css'
import SJ from '../images/loan.png'
import ReactToPrint from 'react-to-print'
import { ComponentToPrint } from './ComponentToPrint';
//import reactToprint from react-to-print;
//import { useLocation } from 'react-router'
import ManagerSignature from '../images/managerSign.png';

const Lcard = () => {

  const [license, setLicense] = useState('')
  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();
  const [status, setStatus] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const [aadharCardPhotoImage, setAadharCardPhotoImage] = useState('');
  const [panCardPhotoImage, setPanCardPhotoImage] = useState('');
  const [name, setName] = useState('')
  const [exDate, setExDate] = useState('')
  const [date1, setDate1] = useState('')
  const componentRef = useRef();


  //   if(isSignin.status === false){
  //     alert('please signin first!!')
  //     history.push('/user/login')
  //   }

  useEffect(() => {
    console.log(`All Learning License Details`)
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
    axios.get(url + '/license/learningg/' + id).then((response) => {
      const res = response.data
      if (res.status === 'OK') {

        // const fullName = isSignin.user.firstName+" "+isSignin.user.lastName
        const fullName = res.result.firstName + " " + res.result.lastName
        setName(fullName)
        console.log(license)

        var date = new Date(res.result.createdAt);
        var month = date.getMonth() + 7;
        var year = date.getFullYear();
        if ((date.getMonth() + 7) > 12) {
          month = (date.getMonth() + 7) % 12
          year = date.getFullYear() + 1

        }
        var day = date.getDate();

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }

        var mindate = (year) + "-" + (month)
          + "-" + day;
        setDate1(mindate)

        var maxdate = (year) + "-" + (month)
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


<div id="body" style={{marginBottom:"400px"}}>
<div className="card-container">
  <div className="card">
    <div className="print-button mt-5">
      <ReactToPrint
        trigger={() => (
          <a className="btn text-light bg-success" role="button" href="#">
            Print Loan pdf
          </a>
        )}
        content={() => componentRef.current}
      />
    </div>

    {license !== '' ? (
      <div className="container-fluid" ref={componentRef}>
        <section id="div1" className='container-fluid' >
              <img className='img5' src={SJ} style={{ width: "70px", height: "70px", position: "relative", marginLeft: "0px", marginTop: "0px" }}></img><p id="p1">LOAN APPROVAL</p>
              <p id="p5"><p id='p6'></p></p>

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
              <h5>Your Phase One loan application has been successfully approved. Please find the authorized signatures below.
                And <b>Now Apply for Second Phase application.</b>
              </h5>
              <table id='table'>
                {/* <tr><td className='td5'> </td><td td className='td5'></td><td td className='td5'></td><td td className='td5'></td><td td className='td5'></td></tr> */}
                <tr><td td className='td5'>Date Of Issue</td><td td className='td5'>{license.appointmentDate}</td></tr>
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
    ) : (
      ''
    )}

    <br />
    <hr id="hr" />
  </div>
</div>
</div>

  )
}

export default Lcard