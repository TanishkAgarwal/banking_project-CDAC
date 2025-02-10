import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert2';

const ContactForm = () => {
    
    const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3,'name atleast 3 charecter').required('Name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      subject: Yup.string().required('Subject is Required'),
      message: Yup.string().min(10,'message atleast 10 charecter').max(50,'message max length is 50 charecter').required('message is Required'),
    }),
    onSubmit: (values) => {
        // Handle form submission
        console.log(values);
        
        swal.fire({
            title: "Success!",
            text: "feedback send successfully. Thanks for visiting us.",
            icon: "success",
            button: "OK",
          });
          
      },
      
  });

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: '#FBF1D3' }}>
            <div className="card-body">
              <h5 className="card-title text-center">Contact us</h5>

              <form className="text-center border border-light p-5" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select
                    className="form-control"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>Choose option</option>
                    <option value="1">Feedback</option>
                    <option value="2">Report a bug</option>
                    <option value="3">Feature request</option>
                    <option value="4">Other</option>
                  </select>
                  {formik.touched.subject && formik.errors.subject && (
                    <div className="text-danger">{formik.errors.subject}</div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-danger">{formik.errors.message}</div>
                  )}
                </div>


                <button className="btn btn-info btn-block" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
