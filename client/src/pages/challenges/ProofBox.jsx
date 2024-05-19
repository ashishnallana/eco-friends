import React, { useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";

function ProofBox({ setproofBlock, id }) {
  const [auth, setAuth] = useAuth();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setuploadStatus] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setmessage] = useState("");

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/challenges/complete`,
        {
          userId: auth.user._id,
          challengeId: id,
          proof: files[0],
          message,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setproofBlock(false);
        // navigate(`/challenges`);
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

  return (
    <div className="fixed top-[75px] left-0 h-screen w-screen bg-[#0000004d] -translate-x-5 -translate-y-5 flex justify-center items-center">
      <div
        className="flex h-full w-full absolute z-0"
        onClick={() => setproofBlock(false)}
      ></div>
      <div className="bg-white p-5 rounded-md z-10">
        <h1>Upload a picture and write you experience with this challenge.</h1>
        {/*  */}
        <form className="my-5" onSubmit={handleSubmit}>
          <textarea
            type="text"
            required
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Describe your experience.."
            className="flex w-full bg-[#f0f0f0] p-2 outline-none shadow-md"
          />
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
          <div className="flex space-x-5 mt-3">
            <button
              className="bg-green-500 hover:bg-green-700 p-3 rounded-full"
              onClick={handleButtonClick}
            >
              <AddAPhotoIcon className="text-[#E4F9DC]" />
            </button>
            <button
              disabled={!(files.length !== 0)}
              type="submit"
              className={`flex-1 bg-green-500 hover:bg-green-700 p-3 rounded-md text-white font-bold ${
                files.length == 0 && "opacity-60"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
        {/*  */}
        {uploadStatus && <LinearProgress color="success" className="mt-3" />}
        {/* uploaded images */}
        {files && (
          <div className="flex mt-3 justify-end">
            {files.map((e, i) => (
              <img src={e} key={i} alt="" className="h-[100px]" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProofBox;
