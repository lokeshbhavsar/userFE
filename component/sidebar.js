"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faUserCircle, faUserShield, faAdd, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logos/dark-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CREATE_POST } from "@/utils/constants";
import apiRequest from "@/services/ApiService";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { setWebSocket } from "@/Redux/userSlice/userSlice";

// Validation schema for Formik
const PostSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
});

export default function Sidebar() {
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const router = useRouter();
  const dispatch = useDispatch();


  useEffect(() => {
    const $button = document?.querySelector("#sidebar-toggle");
    const $wrapper = document?.querySelector("#wrapper");

    const handleToggle = (e) => {
      e.preventDefault();
      $wrapper.classList.toggle("toggled");
    };

    if ($button) {
      $button.addEventListener("click", handleToggle);
    }

    return () => {
      if ($button) {
        $button.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  const { username } = useSelector((state) => state?.user);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImgUrl(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("username", username);

    if (values.image) {
      formData.append("image", values.image);
    }
    try {
      setIsModalOpen(false); // Close the modal
      toast.info("uploading....")
      await apiRequest("post", CREATE_POST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post uploaded successfully!.");
      resetForm();
      setProfileImgUrl(null);
      dispatch(setWebSocket())
      router.push(`/posts/${username}`);
    } catch (error) {
      console.error("Error uploading post", error);
      toast.error("Failed to upload post.");
    }
  };

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand cursor-pointer">
          <Image src={logo} width={180} alt="logo" onClick={() => router.push("/dashboard")} />
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link href="/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link href={`/profile/${username}`} className="sidebar-link">
              <FontAwesomeIcon icon={faUserCircle} /> Profile
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="sidebar-link"
              onClick={() => router.push(`/posts/${username}`)} // Open modal on click
            >
              <FontAwesomeIcon icon={faUsersViewfinder} /> View posts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="sidebar-link"
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              <FontAwesomeIcon icon={faAdd} /> Upload post
            </a>
          </li>

          <li>
            <Link href="/login" className="sidebar-link">
              <FontAwesomeIcon icon={faUserShield} /> Logout
            </Link>
          </li>
        </ul>
      </aside>

      <div id="navbar-wrapper">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link href="#" className="navbar-brand" id="sidebar-toggle">
                <FontAwesomeIcon icon={faBars} />
              </Link>
            </div>
            <h6 className="user_name">{username}</h6>
          </div>
        </nav>
      </div>

      {/* Modal for Add Post */}
      {isModalOpen && (
        <div className="modal fade show" id="addPostModal" tabIndex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addPostModalLabel">Add New Post</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ image: null, description: "" }}
                  validationSchema={PostSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue, resetForm }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, setFieldValue)}
                        />
                        <ErrorMessage name="image" component="div" className="text-danger" />
                      </div>
                      {/* Image Preview */}
                      {profileImgUrl && (
                        <div className="mb-3">
                          <h6>Image Preview:</h6>
                          <img src={profileImgUrl} alt="Preview" className="img-fluid" />
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Image Description</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="Enter image description"
                        />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => {
                          setProfileImgUrl(null)
                          resetForm()
                          setIsModalOpen(false)
                        }}>Close</button>
                        <button type="submit" className="btn btn-primary">upload Post</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
