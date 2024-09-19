import React from 'react';
import Link from 'next/link'; // Use Next.js Link
import Image from 'next/image'; // Use Next.js Image for logo
import logo from '/public/images/logos/dark-logo.svg'; // Update path for the logo
import { useFormik } from 'formik'; // Use Formik hooks for form management
import * as Yup from 'yup';
import apiRequest from '@/services/ApiService';
import { REGISTER } from '@/utils/constants';
import { toast } from 'react-toastify';

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  name: Yup.string().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(18, 'You must be at least 18 years old'),
  username: Yup.string().required('Username is required'),
  image: Yup.mixed().required('Profile image is required'),
});

export default function Signup() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      gender: 'Female',
      age: '',
      username: '',
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('name', values.name);
        formData.append('gender', values.gender);
        formData.append('age', values.age);
        formData.append('username', values.username);
        const result = await apiRequest('post', REGISTER, formData, { 'Content-Type': 'multipart/form-data' });
        if (result) {
          toast.success("Registered Successfully");
          window.location.href = '/login';
        }
        // Redirect after successful registration
      } catch (error) {
        console.error('Error during registration', error);
        toast.error("Error during registration")
        setErrors({ general: 'An error occurred during registration. Please try again.' });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Link href="/dashboard">
                    <Image src={logo} width={180} alt="Logo" priority /> {/* Use Next.js Image */}
                  </Link>
                  <p className="text-center">Your Social Campaigns</p>
                  <form onSubmit={formik.handleSubmit}>
                    {formik.errors.general && <div className="alert alert-danger">{formik.errors.general}</div>}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.username && formik.touched.username && <div className="text-danger">{formik.errors.username}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                      {formik.errors.gender && formik.touched.gender && <div className="text-danger">{formik.errors.gender}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.age && formik.touched.age && <div className="text-danger">{formik.errors.age}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                      />
                      {formik.errors.image && formik.touched.image && <div className="text-danger">{formik.errors.image}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fs-4 mb-4 rounded-2" disabled={formik.isSubmitting}>
                      Sign Up
                    </button>
                  </form>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">Already have an account?{' '}</p>
                    <Link href="/login">
                      <span className="text-primary fw-bold ms-2">Sign In</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
