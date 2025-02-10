import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { url } from "../common/constants";
import Swal from "sweetalert2";

const Register = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3, 'Must be at least 3 characters').max(10, 'Must be at most 10 characters').required('Enter FirstName is Required'),
      lastName: Yup.string().min(3, 'Must be at least 3 characters').max(10, 'Must be at most 10 characters').required('Enter LastName is Required'),
      email: Yup.string().email('Invalid email address').required('Enter Email id is Required'),
      password: Yup.string().matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,20}/,
        'Your password must be 8-20 characters long, must contain 1 capital letter and 1 number, and must not contain spaces or emoticons.'
      ).required('Enter Password is Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      RegisterUser(values, setSubmitting);
    },
  });

  const RegisterUser = (data, setSubmitting) => {
    axios.post(url + "/user/register", data).then((response) => {
      const result = response.data;
      setSubmitting(false);

      if (result === "Registered Successfully!!") {
        Swal.fire({
          icon: 'success',
          title: "Registered Successfully!!",
          showConfirmButton: false,
          timer: 1500
        })
        history.push("/user/login");
      } else if (result === "Email already Registered!!!") {
        Swal.fire('Email already Registered!!!');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to register',
          
        });
      }
    }).catch((error) => {
      setSubmitting(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to register',
        
      });
    });
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ width: "600px", height: "550px" }}>
            <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>
              <h5>Register/SignUp</h5>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="form-group text-body">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="Enter First name"
                        id="firstName"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group text-body">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="Enter Last name"
                        id="lastName"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-4 text-body">
                  <label htmlFor="email">Email Id :</label>
                  <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group mt-4 text-body">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                  {/* <small id="passwordHelpBlock" className="form-text mt-4 text-body">
                    Your password must be 8-20 characters long. Must contain 1 capital letter and 1 number. Must not contain spaces or emoticons.
                  </small> */}
                </div>
                <button className="btn btn-primary mt-5 mx-auto d-block " type="submit" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'Registering...' : 'Register/SignUp'}
                </button>
                <p className="text-body" style={{ textAlign: "center" }}>
                  <br /> Already Registered ? <Link to="/user/login" className="text-primary" style={{ textDecoration: "underline" }}>Click Here to Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
