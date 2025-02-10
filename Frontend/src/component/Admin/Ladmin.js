import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { url } from '../common/constants';
import { Redirect } from 'react-router-dom';

const Ladmin = () => {
  const [licenses, setLicenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [licensesPerPage] = useState(10); // Number of licenses per page
  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    console.log('All Learning License Details');
    getLearning();
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

  const openModal = (license) => {
    setSelectedLicense(license);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getLearning = () => {
    axios.get(url + '/admin/llist').then((response) => {
      const res = response.data;
      if (res.status === 'OK') {
        setLicenses(res.result);
      } else {
        alert('Error while loading list of Licenses');
      }
    });
  };

  const deletelicense = (license) => {
    console.log(license.applicantId);
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
        axios.delete(url + '/admin/ldelete/' + license.applicantId).then((response) => {
          const res = response.data;
          if (res.status === 'OK') {
            alert('Successfully deleted');
            getLearning();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
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
  if (!isSignin) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div>
    
    <nav className="navbar navbar-expand-sm">
      <h1> Phase 1 Process</h1>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <a className="nav-link" href="/">
          <button
              type="button"
              className="btn bg-danger my-2 my-sm-0 text-white"
             
            >
              Log Out
            </button>
          </a>
        </li>
      </ul>
    </nav>
    <div className="container-fluid mt-2">
      <input type="text" className="form-control" placeholder="Searching... " id="myInput" />
      <hr />
      <div className="container-fluid">
        <h2 className="bg-light" style={{ textAlign: 'center', fontFamily: 'redressed georgia garamond serif' }}>
          Phase 1 Loan List
        </h2>
        <table className="table table-bordered table-hover table-secondary">
          <thead className="thead-dark">
            <tr>
              <th>applicantId</th>
              <th>firstName</th>
              <th>Email</th>
              <th>aadharNo</th>
              <th>district</th>
              <th>Application Date</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {currentLicenses.length >= 1
              ? currentLicenses.map((license) => (
                  <tr key={license.applicantId}>
                    <td>{license.applicantId}</td>
                    <td>{license.firstName}</td>
                    <td>{license.email}</td>
                    <td>{license.aadharNo}</td>
                    <td>{license.district}</td>
                    <td>{license.appointmentDate}</td>
                    <td>{license.learningStatus}</td>
                    <td>
                      <a type="button" className="btn btn-primary mr-2" onClick={() => openModal(license)}>
                        View 
                      </a>
                      <a
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          history.push('/ledit', { license: license });
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
    <div
      className={`modal ${isModalVisible ? 'show' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: isModalVisible ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Applicant Details</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {selectedLicense && (
              <div>
                <p> <b>applicantId: </b>  {selectedLicense.applicantId}</p>
                <p> <b>firstName: </b>  {selectedLicense.firstName}</p>
                <p> <b>lastName: </b>  {selectedLicense.lastName}</p>
                   <p> <b>Email: </b> {selectedLicense.email}</p>
                   <p> <b>Aadhar Number: </b> {selectedLicense.aadharNo}</p>
                   <p><b>Mobile Number: </b>{selectedLicense.mobileNo}</p>
                   <p><b>Date of Birth: </b>{selectedLicense.dob}</p>
                   <p><b>Gender: </b>{selectedLicense.gender}</p>
                   <p><b>Blood Group: </b>{selectedLicense.bloodGroup}</p>
                   <p><b>Identification Mark: </b>{selectedLicense.identificationMark}</p>
                   <p><b>State: </b>{selectedLicense.state}</p>
                   <p><b>District: </b>{selectedLicense.district}</p>
                   <p><b>Village: </b>{selectedLicense.village}</p>
                   <p><b>Landmark: </b>{selectedLicense.landmark}</p>
                   <p><b>Pincode: </b>{selectedLicense.pincode}</p>
                   <p><b>Street: </b>{selectedLicense.street}</p>
                   <p><b>Created At: </b>{selectedLicense.createdAt}</p>
                   <p><b>Application Date: </b>{selectedLicense.appointmentDate}</p>
                   <p><b>Application Time: </b>{selectedLicense.appointmentTime}</p>
                   <p><b>Phase 1 Status: </b>{selectedLicense.learningStatus}</p>
                   
                {/* Include other fields here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Ladmin;