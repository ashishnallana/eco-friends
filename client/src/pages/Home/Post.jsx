import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TruncatedText from "./TruncatedText";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import Comments from "./Comments";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}

function Post({ e }) {
  const [auth, setAuth] = useAuth();
  const [like, setlike] = useState(e.likes.includes(auth.user._id));
  const [likeCount, setLikeCount] = useState(e.likes.length);
  const [commentCount, setCommentCount] = useState(e.comments.length);
  const [commentBox, setcommentBox] = useState(false);

  const handleLike = async (like) => {
    if (like === true) {
      setlike(false);
      setLikeCount(likeCount - 1);
      let res = await axios.post(
        `${import.meta.env.VITE_API}/posts/dislike`,
        {
          postId: e._id,
          userId: e.user._id,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success == true) {
        console.log("disliked");
      }
    } else if (like === false) {
      setlike(true);
      setLikeCount(likeCount + 1);
      let res = await axios.post(
        `${import.meta.env.VITE_API}/posts/${e._id}/like`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success == true) {
        console.log("liked");
      }
    }
  };

  return (
    <div className="bg-[white] my-5 py-5">
      <div className="flex justify-between px-5">
        <NavLink
          to={`/profiles/${e.user._id}`}
          className="flex space-x-2 items-center"
        >
          <div
            className="rounded-full"
            style={{
              width: "35px",
              height: "35px",
              backgroundImage: `url(${e.user.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <p className="font-semibold">@{e.user.username}</p>
            <p className="text-[12px] font-regular">{e.user.name}</p>
          </div>
        </NavLink>
        {/* <p className="text-[10px]">{formatDate(e.createdAt)}</p> */}
      </div>
      <div className="flex justify-center py-2">
        <img src={e.photo} alt="" className="w-fit" />
      </div>
      <div className="mt-3 px-3">
        {/*  */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {like ? (
              <FavoriteIcon
                className="text-green-400 transition-all hover:scale-150"
                onClick={() => handleLike(true)}
                fontSize="small"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => handleLike(false)}
                fontSize="small"
              />
            )}
            <p className="text-[10px]">
              {likeCount} {likeCount == 1 ? "like" : "likes"}
            </p>
          </div>
          <div
            className="flex items-center space-x-1"
            onClick={() =>
              commentBox ? setcommentBox(false) : setcommentBox(true)
            }
          >
            <ChatBubbleOutlineIcon fontSize="small" />
            <p className="text-[10px]">
              {commentCount} {commentCount == 1 ? "comment" : "comments"}
            </p>
          </div>
        </div>
        {/*  */}
        <TruncatedText text={e.text} maxLength={100} />

        <p className="text-[10px] text-right">{formatDate(e.createdAt)}</p>
        {commentBox && <Comments data={e} />}
      </div>
    </div>
  );
}

export default Post;
