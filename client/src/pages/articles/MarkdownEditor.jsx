import React, { useState } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMarkdown from "react-markdown";
import ImageIcon from "@mui/icons-material/Image";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

const MarkdownEditor = ({ onSave }) => {
  const [value, setValue] = useState("Start writing....");
  const [selectedTab, setSelectedTab] = useState("write");
  const navigate = useNavigate();

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const handleSave = () => {
    onSave(value);
    navigate("/articles");
  };

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    // setuploadStatus(true);
    const storageRef = ref(storage, "reports/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log(downloadUrl);
        return downloadUrl;
      });
    });
  };

  const imageUploadHandler = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // Add a change event listener instead of clicking
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          // ... rest of your image upload logic using file
          const imageUrl = await handleImageUpload(file);
          setMarkdown((prev) => `${prev}\n![Image](${imageUrl})\n`);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
    input.dispatchEvent(new Event("click")); // Simulate a click event
  };

  return (
    <div>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        toolbarCommands={[
          ["bold", "italic", "header"],
          ["quote", "code", "link"],
          ["unordered-list", "ordered-list"],
          ["image"],
          //   ["image"],
        ]}
      />
      <button
        onClick={handleSave}
        className="bg-green-800 text-white font-bold py-2 px-3 rounded-md w-[100px] mt-5"
      >
        Save
      </button>
      <div className="mt-5">
        <h3 className="text-center">Article preview</h3>
        <ReactMarkdown className="bg-white p-5 mt-3">{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
