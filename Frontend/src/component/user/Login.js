import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { url } from '../common/constants';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinAction } from '../../actions/signinActions';
import Swal from 'sweetalert2';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Enter Valid Email Address'),
      password: Yup.string().required('Enter valid Password'),
    }),
    onSubmit: (values) => {
      LoginUser(values);
    },
  });

  const LoginUser = (data) => {
    axios.post(url + '/user/login', data).then((response) => {
      const result = response.data;

      if (result.status === 'OK') {
        dispatch(signinAction(result.result));

        const role = result.result.role;
        Swal.fire({
          icon: 'success',
          title: 'Login As ' + data.email + ' Successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        if (role === 'ADMIN') {
          history.push('/ladmin');
        } 
       else if (role === 'EMPLOYEE') {
          history.push('/lemp');
        } 
        else {
          history.push('/user/home');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password Incorrect!',
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-header text-body"
              style={{ textAlign: 'center', fontFamily: 'redressed georgia garamond serif' }}
            >
              <h4>Login</h4>
            </div>

            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                  <label htmlFor="email">Email Id:</label>
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

                <div className="form-group mt-4">
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
                </div>

                <button className="btn btn-primary mt-5 mx-auto d-block" type="submit">
                  Login
                </button>

                <p className="text-body" style={{ textAlign: 'center' }}>
                  <br />
                  <a href="/user/forgot" className="text-primary" style={{ textDecoration: 'underline' }}>
                    Forgot Password
                  </a>{' '}
                  Not Registered ?{' '}
                  <a href="/user/register" className="text-primary" style={{ textDecoration: 'underline' }}>
                    Create an account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
