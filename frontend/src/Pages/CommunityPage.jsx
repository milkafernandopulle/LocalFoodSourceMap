import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityPage.css";
import NavBar from "./Navbar";

function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const userTypeStored = localStorage.getItem('user');
  const users = JSON.parse(userTypeStored);
  const user = users.id;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/community-posts/")
      .then((response) => {
        setPosts(
          response.data.map((post) => ({
            ...post,
            tempLikes: post.likes,
            tempDislikes: post.dislikes,
          }))
        );
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePost = () => {
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
    if (!newPostContent || !user) {
      alert("Please enter content for the post or login again.");
      return;
    }
    axios
      .post("http://localhost:4000/api/community-posts/", {
        content: newPostContent,
        creatorId: user.id,
        creatorName: users.name,
      })
      .then((response) => {
        setPosts([
          ...posts,
          { ...response.data, tempLikes: 0, tempDislikes: 0, comments: [] },
        ]);
        setNewPostContent("");
        alert("Post added successfully!");
      })
      .catch((error) => {
        console.error("Failed to add post:", error);
        alert("Failed to add post. Please try again.");
      });
  };

  const handleReply = (postId) => {
    if (!replyContent[postId]) {
      alert("Please enter a reply.");
      return;
    }
    axios
      .post(`http://localhost:4000/api/community-posts/reply/${postId}`, {
        content: replyContent[postId],
        userName: users.name,
      })
      .then((response) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return { ...post, comments: [...response.data.comments] };
          }
          return post;
        });
        setPosts(updatedPosts);
        setReplyContent({ ...replyContent, [postId]: "" });
        alert("Reply posted successfully!");
      })
      .catch((error) => {
        console.error("Failed to post reply:", error);
        alert("Failed to post reply. Please try again.");
      });
  };

  const handleLikeDislike = (postId, type) => {
    axios
      .patch(`http://localhost:4000/api/community-posts/${type}/${postId}`)
      .then(() => {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              tempLikes: type === "like" ? post.tempLikes + 1 : post.tempLikes,
              tempDislikes: type === "dislike" ? post.tempDislikes + 1 : post.tempDislikes,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        alert(`Post ${type}d successfully!`);
      })
      .catch((error) => {
        console.error(`Failed to ${type} the post:`, error);
        alert(`Failed to ${type} the post. Please try again.`);
      });
  };

  return (
    <div className="community-container">
      <NavBar />
      <div className="main-content">
        <div className="posts">
          <div className="post-input">
            <input
              type="text"
              placeholder={`What's on your mind, ${users.name}?`}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <button onClick={handlePost}>Post</button>
          </div>
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <div className="user">
                <img className="avatar" src='https://xsgames.co/randomusers/avatar.php?g=pixel' alt="Avatar" />
                {post.creatorName}
              </div>
              <div className="content">{post.content}</div>
              <div className="actions">
                <button
                  className="like"
                  onClick={() => handleLikeDislike(post._id, "like")}
                >
                  Like ({post.tempLikes})
                </button>
                <button
                  className="dislike"
                  onClick={() => handleLikeDislike(post._id, "dislike")}
                >
                  Dislike ({post.tempDislikes})
                </button>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyContent[post._id] || ""}
                  onChange={(e) =>
                    setReplyContent({
                      ...replyContent,
                      [post._id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleReply(post._id)}>Reply</button>
              </div>
              {post.comments &&
                post.comments.map((comment, index) => (
                  <div className="comment" key={index}>
                    <span className="user">
                      {comment.userName || comment.creatorName}
                    </span>
                    : <span className="content">{comment.content}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
