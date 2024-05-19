import React, { useRef, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APIKEY,
  authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECTID,
  storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FB_APPID,
};

const app = initializeApp(firebaseConfig);

function NewPost({ posts, setposts }) {
  const [auth, setAuth] = useAuth();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setuploadStatus] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setmessage] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/posts/new`,
        {
          photo: files[0],
          text: message,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setmessage("");
        setFiles([]);
        setposts([res.data.post, ...posts]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
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
    <div className="bg-white p-3 flex flex-1 flex-col rounded-md shadow-lg">
      <div className="flex items-start space-x-5">
        {/* <button
          className="bg-green-500 hover:bg-green-700 p-3 rounded-full"
          onClick={handleButtonClick}
        >
          <AddAPhotoIcon className="text-[#E4F9DC]" />
        </button> */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <textarea
            value={message}
            type="text"
            placeholder="Caption here...."
            className="w-full text-lg bg-transparent outline-none h-[100px]"
            onChange={(e) => setmessage(e.target.value)}
          />
        </form>
        <div className="flex flex-col items-center space-y-2">
          <button
            className="bg-green-500 hover:bg-green-700 p-3 rounded-full"
            onClick={handleButtonClick}
          >
            <AddAPhotoIcon className="text-[#E4F9DC]" />
          </button>
          {/*  */}
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 px-3 py-2 font-extrabold text-white rounded-md"
          >
            Post
          </button>
        </div>
      </div>

      {uploadStatus && <LinearProgress color="success" className="mt-3" />}
      {/* uploaded images */}
      {files && (
        <div className="flex mt-3 justify-end">
          {files.map((e, i) => (
            <img src={e} key={i} alt="" className="h-[100px]" />
          ))}
        </div>
      )}

      {/* File input element */}
      <input
        type="file"
        accept="image/*"
        // multiple
        ref={fileInputRef}
        className="hidden"
        onChange={uploadImages}
      />
    </div>
  );
}

export default NewPost;
