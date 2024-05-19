import React from "react";
import { useNavigate } from "react-router-dom";
import EcoActions from "./EcoActions";
import ProfilePosts from "./ProfilePosts";

function ProfileCard({ data, user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex max-[800px]:flex-col max-[800px]:space-y-5">
      {/* basic details */}
      <div>
        <div className="flex flex-col justify-between">
          <div>
            <img
              src={data.photo}
              alt="Profile"
              className="h-32 w-32 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold text-center mt-4">
              {data.name}
            </h2>
            <p className="text-gray-500 text-center">@{data.username}</p>
          </div>
          {user && user._id === data._id && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          {/* <p className="text-gray-700">
            <span className="font-semibold">Followers:</span>{" "}
            {data.followers.length}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Following:</span>{" "}
            {data.following.length}
          </p> */}
          <p className="text-gray-700">
            <span className="font-semibold">Interests:</span>{" "}
            {data.interests.join(", ")}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Posts:</span> {data.posts.length}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Initiatives Created:</span>{" "}
            {data.createdInitiatives.length}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Joined Initiatives:</span>{" "}
            {data.joinedInitiatives.length}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Eco Actions:</span>{" "}
            {data.ecoActions.length}
          </p>
        </div>
      </div>
      {/* other details */}
      <div className="flex-1 p-3">
        {/* eco actions */}
        <EcoActions data={data} user={user} />
        {/* posts */}
        <ProfilePosts data={data} />
      </div>
    </div>
  );
}

export default ProfileCard;

{
  /* {user && <button>Edit Profile</button>} */
}
