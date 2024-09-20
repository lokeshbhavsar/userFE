"use client";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GET_BY_USERNAME, UPDATE_USER } from "@/utils/constants";
import Sidebar from "../sidebar";
import apiRequest from "@/services/ApiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required(),
  gender: Yup.string().required(),
  profileImg: Yup.mixed().required(),
});

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const { profile: username } = useParams();
  const router = useRouter();
  const { username: currentUser } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)
        const response = await apiRequest("get", `${GET_BY_USERNAME}${username}`);
        const user = response.data[0];
        if (!user) {
          router.push("/dashboard");
          return;
        }
        setUserData(user);

        if (user?.profileImage?.data) {
          const blob = new Blob([new Uint8Array(user.profileImage.data)], {
            type: user.profileImage.contentType || "image/png",
          });
          setProfileImgUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchUserData();
  }, [username, router]);

  const handleToggle = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const initialValues = {
    name: userData?.name || "",
    gender: userData?.gender || "",
    profileImg: null,
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    if (values.profileImg) {
      formData.append("image", values.profileImg);
    }
    try {
      await apiRequest("put", `${UPDATE_USER}${username}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <section id="content-wrapper">
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              {!loading ? <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <Image
                        src={profileImgUrl || "/default-avatar.png"}
                        alt="Avatar"
                        width={80}
                        height={80}
                        className="img-fluid my-5"
                      />
                      <h5>{userData?.name}</h5>
                      <p>Web Designer</p>
                      <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between">
                          <h6>Information</h6>
                          {username === currentUser && (
                            <FontAwesomeIcon
                              style={{ cursor: "pointer" }}
                              icon={faEdit}
                              onClick={handleToggle}
                            />
                          )}
                        </div>

                        <hr className="mt-0 mb-4" />

                        {userData && (
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            enableReinitialize
                            onSubmit={handleSubmit}
                          >
                            {({ setFieldValue }) => (
                              <Form>
                                <div className="row pt-1">
                                  <div className="col-6 mb-3">
                                    <h6>Name</h6>
                                    <Field
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your name"
                                      disabled={!isEditing}
                                    />
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>

                                  <div className="col-6 mb-3">
                                    <h6>Gender</h6>
                                    <Field
                                      name="gender"
                                      as="select"
                                      className="form-control"
                                      disabled={!isEditing}
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage
                                      name="gender"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <h6>Profile Image</h6>
                                  <input
                                    type="file"
                                    className="form-control"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      setFieldValue("profileImg", file);
                                      if (file) {
                                        setProfileImgUrl(URL.createObjectURL(file));
                                      }
                                    }}
                                    disabled={!isEditing}
                                  />
                                  <ErrorMessage
                                    name="profileImg"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>

                                <div className="row pt-1">
                                  <div className="col-6 mb-3">
                                    <h6>Email</h6>
                                    <Field
                                      name="email"
                                      type="text"
                                      className="form-control"
                                      value={userData?.email || ""}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-6 mb-3">
                                    <h6>Username</h6>
                                    <Field
                                      name="username"
                                      type="text"
                                      className="form-control"
                                      value={userData?.username || ""}
                                      disabled
                                    />
                                  </div>
                                </div>

                                <div className="row pt-1">
                                  <div className="col-6 mb-3">
                                    <h6>Age</h6>
                                    <Field
                                      name="age"
                                      type="text"
                                      className="form-control"
                                      value={userData?.age || ""}
                                      disabled
                                    />
                                  </div>
                                </div>

                                {isEditing && (
                                  <button type="submit" className="btn btn-primary mt-3">
                                    Submit
                                  </button>
                                )}
                              </Form>
                            )}
                          </Formik>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                : <div className="row h-100 d-flex justify-content-center align-items-center">
                  <div className="col text-center">
                    <div
                      className="spinner-border text-warning p-5"
                      role="status"
                      style={{ width: "4rem", height: "4rem" }}  // Custom size
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
