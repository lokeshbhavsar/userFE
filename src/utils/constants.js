//END POINTS 
const BACKEND_PORT = "https://userbackend-gamma.vercel.app/api"
//USER
const USER_ENDPOINTS = "users/";
const REGISTER = "users/register";
const LOGIN = "users/login";
const GET_ALL_USERS = "users/getAllUser";
const GET_BY_LIKE_USERNAME = "users/search/?username=";
const GET_BY_USERNAME = "users/getByUsername/";
const UPDATE_USER = "users/updateUser/";
const DELETE_USER = "users/delete/";

//POST
const POST_ENDPOINTS = "posts/";
const CREATE_POST = "posts/createPost"
const GET_ALL_POST_BY_USER_NAME = "posts/getAllPostByUserName"
const GET_ALL_POST = "posts/getAllPost"
const GET_POST_BY_ID = "posts/getPostById"
const UPDATE_POST = "posts/updatePost"
const DELETE_POST = "posts/deletePost"
const GET_ALL_POST_BY_DESCRIPTION = "posts/getPostByDescription"
const ADD_COMMENT = "posts/addComment"
export {
  BACKEND_PORT,
  USER_ENDPOINTS,
  REGISTER,
  LOGIN,
  GET_ALL_USERS,
  GET_BY_LIKE_USERNAME,
  GET_BY_USERNAME,
  UPDATE_USER,
  DELETE_USER,
  POST_ENDPOINTS,
  CREATE_POST,
  GET_ALL_POST_BY_USER_NAME,
  UPDATE_POST,
  DELETE_POST,
  GET_POST_BY_ID,
  GET_ALL_POST,
  GET_ALL_POST_BY_DESCRIPTION,
  ADD_COMMENT
};

export function formatTime(objectId) {
  // Extract the timestamp from the ObjectID
  if (objectId) {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000; // Convert to milliseconds
    const postDate = new Date(timestamp);
    const currentDate = new Date();

    const diffInSeconds = (currentDate - postDate) / 1000; // Time difference in seconds

    // Time units
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    // Check for different time intervals and return relative times
    if (diffInSeconds < minute) {
      return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInSeconds < hour) {
      return `${Math.floor(diffInSeconds / minute)} minutes ago`;
    } else if (diffInSeconds < day) {
      return `${Math.floor(diffInSeconds / hour)} hours ago`;
    } else if (diffInSeconds < week) {
      return `${Math.floor(diffInSeconds / day)} days ago`;
    } else if (currentDate.getFullYear() === postDate.getFullYear()) {
      // If the post was made earlier this year, return "DD MMM" (e.g., "12 Sept")
      return `${postDate.getDate()} ${postDate.toLocaleString('default', { month: 'short' })}`;
    } else {
      // If it was made in a different year, return "DD MMM YYYY" (e.g., "12 Sept 2023")
      return `${postDate.getDate()} ${postDate.toLocaleString('default', { month: 'short' })} ${postDate.getFullYear()}`;
    }
  }
  else {
    return "2 sec ago"
  }
}

export function debounce(func, delay) {
  let timeoutId;

  function debounced(...args) {
    if (timeoutId) clearTimeout(timeoutId); // Clear the previous timeout
    timeoutId = setTimeout(() => func.apply(this, args), delay); // Start a new timeout
  }
  // Clear the timeout when needed
  debounced.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null; // Reset the timeoutId
    }
  };
  return debounced;
}


