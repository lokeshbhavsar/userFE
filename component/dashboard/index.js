"use client";
import { useCallback, useEffect, useState, } from "react";
import Image from "next/image"; // Next.js optimized image component
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../sidebar"; // Adjust path based on your structure
import Comment from "./comment"; // Adjust path based on your structure
import { useSelector } from "react-redux";
import { DELETE_POST, GET_ALL_POST, GET_ALL_POST_BY_DESCRIPTION, GET_ALL_POST_BY_USER_NAME, GET_ALL_USERS, GET_BY_LIKE_USERNAME, UPDATE_DESCRIPTION, debounce, timeAgo } from "@/utils/constants";
import apiRequest from "@/services/ApiService";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";

export default function DashBoard() {
  const [isOn, setIsOn] = useState(false);
  const [activePostId, setActivePostId] = useState(null); // State for the active post ID
  const [myConnections, setMyConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [postSearchTerm, setPostSearchTerm] = useState("");
  const [page, setPage] = useState(1);  // Track current page
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter();
  const [hasMorePost, setHasMorePost] = useState(false)
  const [usersLoading, setUsersLoading] = useState(false); // Track loading state
  const { posts } = useParams()
  const [editPostId, setEditPostId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [userDB, setUserDB] = useState([])
  const [profileImages, setProfileImages] = useState({})
  const { webSocket } = useSelector((state) => state?.user);
  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    if (userDB?.length) {
      const result = userDB?.reduce((acc, user) => {
        acc[user.username] = user?.profileImage;
        return acc;
      }, {});
      setProfileImages(result)
    }
  }, [userDB])
  useEffect(() => {
    if (!hasMorePost) {
      setLoading(false)
    }
  }, [hasMorePost, loading])
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleCommentToggle = (postId) => {
    setActivePostId(activePostId === postId ? null : postId); // Toggle comment section for selected post
  };

  const fetchPosts = async (page) => {
    if (loading || posts) return; // Prevent multiple requests
    try {
      setLoading(true)
      const response = await apiRequest('get', `${GET_ALL_POST}?page=${page}`);
      setAllPosts(prevPosts => [...prevPosts, ...response?.data?.posts]); // Append new posts
      setHasMorePost(response?.data?.hasMorePosts);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
    finally {
      setLoading(false)
      setIsMount(true)
    }
  };

  const deletePost = async (pid) => {
    try {
      const response = await apiRequest('delete', `${DELETE_POST}/${pid}/${posts}`);
      fetchPostsByUsername()
      toast.success("Post deleted succussfully")
    } catch (error) {
      console.error("Error deletePost ", error);
      toast.error("Cannot delete the post.")
    }
  };

  const fetchPostsByUsername = async () => {
    if (loading) return; // Prevent multiple requests
    try {
      setLoading(true)
      const response = await apiRequest('post', GET_ALL_POST_BY_USER_NAME, { username: posts });
      setAllPosts(response?.data); // Append new posts
      // setHasMorePost(response?.data?.hasMorePosts);
    } catch (error) {
      console.error("Error fetching fetchPostsByUsername", error);
    }
    finally {
      setLoading(false)
      setIsMount(true)
    }
  };
  useEffect(() => {
    if (posts)
      fetchPostsByUsername()
  }, [webSocket])

  useEffect(() => {
    if (postSearchTerm === "") {
      fetchPosts(page); // Fetch posts only if search term is empty
    }
  }, [page, postSearchTerm]);

  const handleScroll = () => {
    if (postSearchTerm === "") {
      const bottom = window.innerHeight + window.scrollY >= document?.documentElement.scrollHeight;
      if (bottom && !loading) {
        setPage(prevPage => prevPage + 1); // Load next page
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, postSearchTerm]);

  const getAllUserApi = async (query = "") => {
    try {
      setUsersLoading(true)
      setMyConnections([])
      const response = await apiRequest('get', `${GET_ALL_USERS}?search=${query}`);
      setMyConnections(response?.data);
      if (userDB?.length == 0) {
        setUserDB(response?.data)
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
    finally {
      setUsersLoading(false)
    }
  };

  const searchUserName = async (query = "") => {
    try {
      setUsersLoading(true)
      setMyConnections([])
      const response = await apiRequest('get', `${GET_BY_LIKE_USERNAME}${query}`);
      setMyConnections(response?.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    finally {
      setUsersLoading(false)
    }
  };

  // Debounced search function
  const debouncedGetAllUserApi = useCallback(
    debounce((query) => {
      if (query) {
        searchUserName(query);  // Only search if the query is non-empty
      }
    }, 1000), []
  );

  // Debounced search function for posts
  const debouncedGetAllPostsApi = useCallback(
    debounce((query) => {
      if (query) {
        getPostByDescription(query);  // Only search if the query is non-empty
      }
    }, 1000), []
  );

  useEffect(() => {
    getAllUserApi();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      debouncedGetAllUserApi.clear();
      getAllUserApi();
    } else {
      debouncedGetAllUserApi(searchTerm);
    }
  }, [searchTerm, debouncedGetAllUserApi]);

  const getPostByDescription = async (query = "") => {
    try {
      setLoading(true)
      setAllPosts([])
      const response = await apiRequest('post', GET_ALL_POST_BY_DESCRIPTION, { description: query });
      setAllPosts(response?.data);
    } catch (error) {
      console.error("Error searching posts by description", error);
    }
    finally {
      setLoading(false)
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      getAllUserApi();
    }
  };

  const handlePostSearchChange = (e) => {
    const value = e.target.value;
    setPostSearchTerm(value);
    if (value === "") {
      debouncedGetAllPostsApi.clear();
      setPage(1); // Reset page number
      setAllPosts([]); // Clear all posts
      fetchPosts(1); // Fetch posts from the first page
    } else {
      debouncedGetAllPostsApi(value);
    }
  };

  const updatePostComments = (postId, newComment) => {
    setAllPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.pid === postId
          ? { ...post, comments: [...post?.comments, ...newComment] }
          : post
      )
    );
  };

  useEffect(() => {
    if (!loading) {
      setLoading(false)
    }
  }, [loading])
  const { username: currentUser } = useSelector((state) => state?.user);



  const handleEdit = (postId, description) => {
    setEditPostId(postId);
    setEditDescription(description);
  };
  const handleUpdate = async () => {
    if (!editDescription) return;

    try {
      const response = await apiRequest('put', UPDATE_DESCRIPTION, { description: editDescription, pid: editPostId, username: posts });
      if (response) {
        setAllPosts(prevPosts =>
          prevPosts.map(post =>
            post.pid === editPostId ? { ...post, description: editDescription } : post
          )
        );
        toast.success("Post updated successfully");
        setEditPostId(null);
        setEditDescription("");
      }
    } catch (error) {
      console.error("Error updating post", error);
      toast.error("Failed to update the post.");
    }
  };
  const imgstyle = {
    objectFit: 'cover',
    width: '100px',
    height: '100px',
    borderRadius: '50%'
  }
  return (
    <div id="wrapper">
      <Sidebar />
      <section id="content-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="mt-4">
              <div className={posts ? "row justify-content-center" : "row"}>
                {
                  !posts &&
                  <button className="btn btn-primary connections" onClick={handleToggle}>
                    My connections
                  </button>
                }
                {/* Search and Results Section */}
                <div className="col-md-6 mobile_res">
                  {
                    !posts &&
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search posts by description"
                        aria-label="Search posts by description"
                        value={postSearchTerm}
                        onChange={handlePostSearchChange}
                      />
                      <button className="btn btn-primary" type="button">
                        Go
                      </button>
                    </div>
                  }
                  {allPosts?.map((item,i) => (
                    <div className="card post" key={i}>
                      <Image src={item?.image} width={100} height={100} className="card-img-top" alt="Product Image" />
                      <div className="card-body">
                        {editPostId === item.pid ? (
                          <div>
                            <input
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              rows={3}
                              className="form-control"
                            />
                            <button onClick={handleUpdate} className="btn btn-success mt-2 me-2">Update</button>
                            <button onClick={() => { setEditPostId(null); setEditDescription(""); }} className="btn btn-secondary mt-2 ml-2">Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <p className="card-text">
                              {item?.description}
                              <span className="text-muted small">• {timeAgo(item?.timestamp)}</span>
                            </p>
                            <div className="row flex justify-content-end">
                              <div className="col-auto">
                                <FontAwesomeIcon
                                  onClick={() => handleCommentToggle(item?.pid)}
                                  icon={faComment}
                                  className="heart"
                                />
                              </div>
                              {(posts === currentUser) && (
                                <>
                                  <div className="col-auto">
                                    <FontAwesomeIcon
                                      onClick={() => handleEdit(item?.pid, item.description)}
                                      icon={faEdit}
                                      className="heart"
                                    />
                                  </div>
                                  <div className="col-auto">
                                    <FontAwesomeIcon
                                      onClick={() => deletePost(item?.pid)}
                                      icon={faRemove}
                                      className="heart"
                                      title="Delete post"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                        {activePostId === item?.pid && (
                          <Comment
                            profileImages={profileImages}
                            updatePostComments={updatePostComments}
                            owner={item?.username}
                            pid={item?.pid}
                            comments={item?.comments}
                            setIsComment={() => setActivePostId(null)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {
                    (loading || !isMount) &&
                    <div className="card post p-5" >
                      <div className="row h-100 d-flex justify-content-center align-items-center">
                        <div className="col text-center">
                          <div
                            className="spinner-border text-warning p-3"
                            role="status"
                            style={{ width: "4rem", height: "4rem" }}  // Custom size
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  {
                    allPosts?.length == 0 && !loading && isMount && <h2 className="text-center">No records found</h2>
                  }
                </div>

                {/* Connections Section */
                  !posts &&
                  <div className={`col-md-6 ${isOn ? 'activeTab' : 'unActiveTab'}`}>
                    <div className="card p-4 user_live">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search connection"
                          aria-label="Search connection"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" type="button">
                          Go
                        </button>
                      </div>

                      {/* Connections Grid */}

                      <div className="connections">
                        <h6>My connections</h6>
                        <div className="row">
                          {myConnections?.map((elem, idx) => (
                            currentUser != elem.username &&
                            <div className="col-6 col-lg-3 text-center mb-3  cursor-pointer" key={idx}>
                              <div className="avatar" onClick={() => {
                                toast.info("Redirecting...");
                                router.push(`/profile/${elem?.username}`);
                              }}>
                                <Image
                                  width={100}
                                  height={100}
                                  src={elem?.profileImage}
                                  alt="Avatar"
                                  className="img-fluid avatar-img rounded-circle"
                                  style={imgstyle}
                                />
                                <div className={`status-indicator status-${idx % 3}`} />
                                <div className="active"></div>
                              </div>
                              <p className="mt-2">{elem?.name}</p>
                            </div>

                          ))}
                          {usersLoading &&
                            <div className="row h-100 d-flex justify-content-center align-items-center">
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
                          <div className="row h-100 d-flex justify-content-center align-items-center">
                            <div className="col text-center">
                              {
                                myConnections?.length == 0 && !usersLoading && <h2>No records found</h2>
                              }
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
