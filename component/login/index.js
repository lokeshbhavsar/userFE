import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'; // Next.js Image component
import Link from 'next/link'; // Next.js Link component
import logo from '/public/images/logos/dark-logo.svg'; // Update the path for the logo
import { useDispatch } from 'react-redux';
import apiRequest from '@/services/ApiService';
import { resetUserState, setUserInfo } from '@/Redux/userSlice/userSlice';
import { LOGIN } from '@/utils/constants';
import { toast } from 'react-toastify';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resetUserState());
    localStorage.clear();
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiRequest('post', LOGIN, values); // Adjust the endpoint for Next.js API
      const token = response?.data?.token;

      if (token) {
        toast.success("Login Successfull");
        localStorage.setItem('authToken', token);
        dispatch(setUserInfo({ username: values.username, isLoggedIn: true }));
        router.push('/dashboard'); // Use Next.js router for navigation
      } else {
        setErrors({ general: 'Login failed, please check your credentials' });
      }
    } catch (error) {
      toast.error("Login Unsuccessfull");
      console.error('Error during login', error);
      setErrors({ general: 'An error occurred during login. Please try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Image className='logo_sign' src={logo} width={180} alt="Logo" priority /> {/* Next.js Image */}
                  <p className="text-center">Your Social Campaigns</p>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, errors }) => (
                      <Form>
                        {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">Username</label>
                          <Field type="text" name="username" className="form-control" id="username" />
                          <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label">Password</label>
                          <Field type="password" name="password" className="form-control" id="password" />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fs-4 mb-4 rounded-2" disabled={isSubmitting}>
                          Sign In
                        </button>
                      </Form>
                    )}
                  </Formik>

                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0">New to Spike?</p>
                    <Link href="/register" className="text-primary fw-bold ms-2">
                      Create an account
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
