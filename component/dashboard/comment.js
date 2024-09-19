import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import user1 from "../../public/images/profile/user1.jpg";
import { useSelector } from "react-redux";
import apiRequest from "@/services/ApiService";
import { ADD_COMMENT, formatTime } from "@/utils/constants";
import { toast } from "react-toastify";

export default function Comment({ owner, pid, comments, setIsComment, updatePostComments }) {
  const { username } = useSelector((state) => state?.user); // Get username from state
  const [commentText, setCommentText] = useState(""); // State to hold comment input
  const [isMounted, setIsMounted] = useState(false); // State to check if the component is mounted

  // Set the mounted state to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useCallback to memoize functions
  const handleCommentChange = useCallback((e) => {
    setCommentText(e.target.value); // Update the comment input value
  }, []);

  const addComment = useCallback(async () => {
    try {
      const payload = {
        pid, // Use dynamic post ID
        username: owner, // User's username from the Redux state
        comments: [
          {
            username: username, // Username from state
            text: commentText, // User's comment input
          }
        ]
      };

      // Make the API request to add the comment
      await apiRequest('put', ADD_COMMENT, payload);

      // Optionally, clear the input after adding the comment
      setCommentText("");

      // Update the post comments in the parent component
      updatePostComments(pid, [
        {
          username: username, // Username from state
          text: commentText, // User's comment input
        }
      ]);
      toast.success("Comment added.")
    } catch (error) {
      console.error("Error adding comment", error);
    }
  }, [commentText, username, owner, pid, updatePostComments]);

  // Conditionally render the component only if it has been mounted
  if (!isMounted) {
    return null; // Avoid rendering mismatched HTML during hydration
  }

  return (
    <div className="container mt-4 comment">
      <div className="d-flex align-items-start mb-3">
        <Image
          src={user1}
          className="rounded-circle me-2"
          alt="User Avatar"
          width={50}
          height={50}
        />
        <div className="w-100">
          <input
            className="form-control"
            type="text"
            placeholder="Leave a comment here"
            value={commentText} // Bind input value to state
            onChange={handleCommentChange} // 
          />
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setIsComment(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={addComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {comments?.map((el, i) => (
        <div className="d-flex align-items-start mb-3" key={i}>
          <img
            src="https://via.placeholder.com/50"
            className="rounded-circle me-2"
            alt="User Avatar"
          />
          <div className="w-100">
            <h6 className="mb-1">
              {el?.username} <span className="text-muted small">• {formatTime(el?._id)}</span>
            </h6>
            <p className="mb-1">{el?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
