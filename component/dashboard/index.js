"use client";
import { useCallback, useEffect, useState, } from "react";
import Image from "next/image"; // Next.js optimized image component
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../sidebar"; // Adjust path based on your structure
import Comment from "./comment"; // Adjust path based on your structure
import s1 from "../../public/images/products/s1.jpg"; // Next.js public folder for images
import user1 from "../../public/images/profile/user1.jpg";
import { useSelector } from "react-redux";
import { GET_ALL_POST, GET_ALL_POST_BY_DESCRIPTION, GET_ALL_USERS, GET_BY_LIKE_USERNAME, debounce } from "@/utils/constants";
import apiRequest from "@/services/ApiService";
import { useRouter } from 'next/navigation';

export default function DashBoard() {
  const [isOn, setIsOn] = useState(false);
  const [activePostId, setActivePostId] = useState(null); // State for the active post ID
  const [myConnections, setMyConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [postSearchTerm, setPostSearchTerm] = useState("");
  const [page, setPage] = useState(1);  // Track current page
  const [loading, setLoading] = useState(false); // Track loading state
  const username = useSelector((state) => state?.user);
  const router = useRouter();

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleCommentToggle = (postId) => {
    setActivePostId(activePostId === postId ? null : postId); // Toggle comment section for selected post
  };

  const fetchPosts = async (page) => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const response = await apiRequest('get', `${GET_ALL_POST}?page=${page}`);
      setAllPosts(prevPosts => [...prevPosts, ...response?.data?.posts]); // Append new posts
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postSearchTerm === "") {
      fetchPosts(page); // Fetch posts only if search term is empty
    }
  }, [page, postSearchTerm]);

  const handleScroll = () => {
    if (postSearchTerm === "") {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
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
      const response = await apiRequest('get', `${GET_ALL_USERS}?search=${query}`);
      setMyConnections(response?.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const searchUserName = async (query = "") => {
    try {
      const response = await apiRequest('get', `${GET_BY_LIKE_USERNAME}${query}`);
      setMyConnections(response?.data);
    } catch (error) {
      console.error("Error fetching users", error);
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
      const response = await apiRequest('post', GET_ALL_POST_BY_DESCRIPTION, { description: query });
      setAllPosts(response?.data);
    } catch (error) {
      console.error("Error searching posts by description", error);
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
      prevPosts.map(post =>
        post.pid === postId
          ? { ...post, comments: [...post.comments, ...newComment] }
          : post
      )
    );
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <section id="content-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="mt-4">
              <div className="row">
                <button className="btn btn-primary connections" onClick={handleToggle}>
                  My connections
                </button>
                {/* Search and Results Section */}
                <div className="col-md-6 mobile_res">
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
                  {allPosts?.map((item) => (
                    <div className="card post" key={item?.pid}>
                      <Image src={item?.image} width={100} height={100} className="card-img-top" alt="Product Image" />
                      <div className="card-body">
                        <p className="card-text">
                          {item?.description}
                        </p>
                        <FontAwesomeIcon 
                          onClick={() => handleCommentToggle(item?.pid)} 
                          icon={faComment} 
                          className="heart" 
                        />
                        {activePostId === item?.pid && (
                          <Comment 
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
                </div>

                {/* Connections Section */}
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
                      {myConnections.map((elem, idx) => (
                          <div className="col-6 col-lg-3 text-center mb-3" key={idx}>
                            <div className="avatar">
                              <Image
                               width={100} height={100}
                                src={elem?.profileImage}
                                alt="Avatar"
                                className="img-fluid rounded-circle  cursor-pointer"
                                onClick={() => { toast.info("Redirecting...")
                                 router.push(`/profile/${elem?.username}`)}}
                              />
                              <div className={`status-indicator status-${idx % 3}`} />
                              <div className="active"></div>
                            </div>
                            <p className="mt-2">{elem?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
