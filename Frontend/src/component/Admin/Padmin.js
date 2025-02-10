import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { url } from '../common/constants';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';

const Padmin = () => {
  const [licenses, setLicenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [licensesPerPage] = useState(3); // Number of licenses per page
  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();

  useEffect(() => {
    console.log('All Permanent License Details');
    getPermanent();
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  $(document).ready(function () {
    $('#myInput').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#myTable tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  const getPermanent = () => {
    axios.get(url + '/admin/plist').then((response) => {
      const res = response.data;
      console.log(res.result);
      if (res.status === 'OK') {
        setLicenses(res.result);
      } else {
        alert('Error while loading list of Licenses');
      }
    });
  };

  const deletelicense = (license) => {
    console.log(license.applicantId);
    const id = license.applicantId;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url + '/admin/pdelete/' + id).then((response) => {
          const res = response.data;
          if (res.status === 'OK') {
            alert('Successfully deleted');
            getPermanent();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              text: 'Error Deleting License',
            });
          }
        });
      }
    });
  };

  const indexOfLastLicense = currentPage * licensesPerPage;
  const indexOfFirstLicense = indexOfLastLicense - licensesPerPage;
  const currentLicenses = licenses.slice(indexOfFirstLicense, indexOfLastLicense);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        
       
      </ul>
      <nav className="navbar navbar-expand-sm">
          <h1>Phase 2 Process</h1>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            <a className="nav-link" href="/">
              <button type="button" className="btn bg-danger my-2 my-sm-0 text-white">
                Log Out
              </button>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-2">
        <input type="text" className="form-control" placeholder="Searching..." id="myInput" />

        <hr />

        <div className="container-fluid">
          <h2 className="bg-light" style={{ textAlign: 'center', fontFamily: 'redressed georgia garamond serif' }}>
            Phase 2 Loan Application List
          </h2>
          <table className="table table-bordered table-hover table-secondary">
            <thead className="thead-dark">
              <tr>
                <th>applicantId</th>
                <th>firstName</th>
                {/* <th>lastName</th> */}
                <th>email</th>
                <th>aadharNo</th>
                <th>mobileNo</th>
                {/* <th>dob</th> */}
                {/* <th>gender</th> */}
                {/* <th>bloodGroup</th> */}
                {/* <th>identificationMark</th> */}
                {/* <th>state</th> */}
                <th>district</th>
                {/* <th>village</th> */}
                {/* <th>landmark</th> */}
                {/* <th>pincode</th> */}
                {/* <th>street</th> */}
                {/* <th>createdAt</th> */}
                {/* <th>appointmentDate</th> */}
                {/* <th>appointmentTime</th> */}
                <th>permanentStatus</th>
                {/* <th>writtenTestFlag</th> */}
                <th>Action</th> 
              </tr>
            </thead>
            <tbody id="myTable">
              {currentLicenses.length >= 1
                ? currentLicenses.map((license) => (
                    <tr key={license.applicantId}>
                    <td>{license.applicantId}</td>
                    <td>{license.firstName}</td>
                    {/* <td>{license.lastName}</td> */}
                    <td>{license.email}</td>
                    <td>{license.aadharNo}</td>
                    <td>{license.mobileNo}</td>
                    {/* <td>{license.dob}</td> */}
                    {/* <td>{license.gender}</td> */}
                    {/* <td>{license.bloodGroup}</td> */}
                    {/* <td>{license.identificationMark}</td> */}
                    {/* <td>{license.state}</td> */}
                    <td>{license.district}</td>
                    {/* <td>{license.village}</td> */}
                    {/* <td>{license.landmark}</td> */}
                    {/* <td>{license.pincode}</td> */}
                    {/* <td>{license.street}</td> */}
                    {/* <td>{license.createdAt}</td> */}
                    {/* <td>{license.appointmentDate}</td> */}
                    {/* <td>{license.appointmentTime}</td> */}
                    <td>{license.permanentStatus}</td>
                    {/* <td>{license.writtenTestFlag}</td> */}
                      {/* Other td elements */}
                      <td>
                        <a
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            history.push('/pedit', { license: license });
                          }}
                        >
                          Update
                        </a>
                        <a
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            deletelicense(license);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>
          <nav className="pagination justify-content-center">
            <ul className="pagination">
              {licenses.length > 0 && (
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#!" onClick={() => paginate(currentPage - 1)}>
                    Previous
                  </a>
                </li>
              )}
              {Array.from({ length: Math.ceil(licenses.length / licensesPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#!" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}
              {licenses.length > 0 && (
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(licenses.length / licensesPerPage) ? 'disabled' : ''
                  }`}
                >
                  <a className="page-link" href="#!" onClick={() => paginate(currentPage + 1)}>
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Padmin;
