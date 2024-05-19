import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function EditProfile() {
  const [auth, setAuth] = useAuth();
  const [data, setdata] = useState(null);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setuploadStatus] = useState(false);
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/users/profile/${auth.user._id}`
      );
      if (res.data.success) {
        console.log(res);
        setdata(res.data.user);
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

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/users/profile`,
        data
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/profiles/${auth.user._id}`);
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

  // function to update the user object
  const updateUser = (key, value) => {
    setdata((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  async function uploadImages(ev) {
    const files = Array.from(ev.target.files);
    if (files.length === 0) return;
    else {
      const storage = getStorage();
      setuploadStatus(true);
      files.map((file, i) => {
        const storageRef = ref(storage, "reports/" + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
            console.log(downloadUrl);
            if (i == 0) {
              updateUser("photo", downloadUrl);
            }
            setFiles((fileURls) => {
              if (i == files.length - 1) {
                setuploadStatus(false);
              }
              return [...fileURls, ...[downloadUrl]];
            });
          });
        });
      });
    }
  }

  useEffect(() => {
    fetchProfile();
    document.title = "My profile";
  }, []);

  return (
    <Layout>
      {data ? (
        <div className="bg-white m-5 rounded-md p-3">
          <form
            onSubmit={handleSubmit}
            className="flex min-[1200px]:flex-row-reverse min-[1200px]:flex-wrap flex-col"
          >
            <div className="flex flex-col items-center mx-5">
              <img src={data.photo} alt="" className="w-[300px]" />
              {uploadStatus && (
                <LinearProgress color="success" className="mt-3" />
              )}
              <button
                className="bg-green-500 hover:bg-green-700 py-2 px-3 rounded-full text-white font-bold mt-3"
                onClick={handleButtonClick}
              >
                Change photo
              </button>
            </div>
            {/* File input element */}
            <input
              required
              type="file"
              accept="image/*"
              // multiple
              ref={fileInputRef}
              className="hidden"
              onChange={uploadImages}
            />
            <div className="flex-1 flex-col">
              <div className="flex flex-col space-y-1">
                <label>Name : </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => updateUser("name", e.target.value)}
                  className="outline-none text-lg bg-[#f0f0f0] p-2"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>username : </label>
                <input
                  type="text"
                  placeholder="username"
                  value={data.username}
                  onChange={(e) => updateUser("username", e.target.value)}
                  className="outline-none text-lg bg-[#f0f0f0] p-2"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>interests : </label>
                <textarea
                  type="text"
                  placeholder="interests"
                  className="outline-none text-lg bg-[#f0f0f0] p-2"
                  value={data.interests}
                  onChange={(e) => {
                    const interestsArray = e.target.value
                      .split(",")
                      .map((interest) => interest.trim());
                    updateUser("interests", interestsArray);
                  }}
                />
              </div>
              <button
                type="submit"
                className="mt-3 bg-green-800 hover:bg-green-500 py-2 px-3 rounded-full text-white font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default EditProfile;
