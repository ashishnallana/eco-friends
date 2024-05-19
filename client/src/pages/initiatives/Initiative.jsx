import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import TruncatedText from "../Home/TruncatedText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";

export function formatDate(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function Initiative({ data }) {
  const [auth, setAuth] = useAuth();

  const joinInitiative = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/initiatives/${data._id}/join`,
        data,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        // navigate(`/initiatives`);
        console.log(res);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex bg-white my-3 max-[800px]:flex-col">
      {/* <img src={data.photo} alt="" /> */}
      <div
        className="w-[300px] h-[300px] rounded-md max-[800px]:w-full"
        style={{
          backgroundImage: `url(${data.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="p-3 flex-1">
        <h1 className="text-3xl font-semibold mb-3">{data.name}</h1>
        <h3 className="text-md mb-5">
          <TruncatedText text={data.description} maxLength={100} />
        </h3>
        {/*  */}
        <div className="flex flex-col space-y-2">
          {/* location */}
          <div className="flex space-x-2 items-center">
            <LocationOnIcon />
            <p>{data.location}</p>
          </div>
          {/* date */}
          <div className="flex space-x-2 items-center">
            <TodayIcon />
            <p className="text-sm">{formatDate(data.date)}</p>
          </div>
          {/* created by */}
          <NavLink
            to={`/profiles/${data.createdBy._id}`}
            className="flex space-x-2 items-center"
          >
            <PersonIcon />
            <p className="text-sm">
              Organizer : <strong>{data.createdBy.name}</strong>
            </p>
          </NavLink>
          {/* participants */}
          <div className="flex space-x-2 items-center">
            <GroupIcon />
            <p className="text-sm">
              Participants : <strong>{data.participants.length}</strong>
            </p>
          </div>

          {/* join button */}
          <button
            onClick={() => joinInitiative()}
            disabled={
              auth.user._id === data.createdBy._id ||
              data.participants.includes(auth.user._id)
                ? true
                : false
            }
            className={`${
              auth.user._id === data.createdBy._id && "opacity-60"
            } bg-green-500 m-2 text-white px-3 py-2 rounded-md font-bold`}
          >
            {data.participants.includes(auth.user._id) ? "JOINED" : "JOIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Initiative;
