import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import axios from "axios";

const actionTypes = [
  { type: "Biking instead of driving", score: 10 },
  { type: "Using reusable bags", score: 5 },
  { type: "Planting a tree", score: 20 },
  { type: "Participating in a cleanup", score: 15 },
  // Add more action types as needed
];

function EcoActions({ data, user }) {
  const [auth, setAuth] = useAuth();
  const [description, setDescription] = useState("");
  const [selectedAction, setSelectedAction] = useState(actionTypes[0].type);
  const [impactScore, setImpactScore] = useState(actionTypes[0].score);
  const [actionsList, setactionsList] = useState(null);
  const [totalScore, settotalScore] = useState(0);

  const handleActionChange = (e) => {
    const selectedType = e.target.value;
    const selected = actionTypes.find((action) => action.type === selectedType);
    setSelectedAction(selectedType);
    setImpactScore(selected.score);
  };

  const fetchActions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/eco-actions/${data._id}`
      );
      if (res.data.success) {
        console.log(res.data);
        // setdata(res.data.user);
        setactionsList(res.data.ecoActions);
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

  const fetchImpactScore = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/eco-actions/impact/${data._id}`
      );
      if (res.data.success) {
        console.log(res.data);
        settotalScore(res.data.totalImpact);
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

  useEffect(() => {
    fetchActions();
    fetchImpactScore();
  }, []);

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/eco-actions/`,
        {
          actionType: selectedAction,
          description,
          impactScore,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res.data);
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
    <div>
      <div className="flex bg-green-500 mx-4 mb-5 py-3 px-4 rounded-md justify-center items-center text-xl text-white font-bold">
        <h1>Total impact score : {totalScore}</h1>
      </div>
      {data._id === user._id && (
        <form className="m-2 px-2" onSubmit={handleSubmit}>
          {/* description */}
          <h1 className="text-lg font-semibold mb-2">Log a new eco-action!</h1>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="What cool eco-friendly activity did you do today?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* action type */}
          <div className="mb-4">
            <label
              htmlFor="actionType"
              className="block text-sm font-medium text-gray-700"
            >
              Action Type
            </label>
            <select
              id="actionType"
              value={selectedAction}
              onChange={handleActionChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {actionTypes.map((action) => (
                <option key={action.type} value={action.type}>
                  {action.type}
                </option>
              ))}
            </select>
          </div>
          {/* impact score */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Impact Score: {impactScore}</p>
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-3 rounded-md"
          >
            Submit
          </button>
        </form>
      )}
      {/* eco actioons list */}
      {actionsList && (
        <div
          className={`${
            actionsList.length > 2 && "h-[300px] overflow-y-scroll"
          } px-1`}
        >
          <h1 className="text-xl font-semibold">Logged eco-actions</h1>
          {actionsList.length == 0 && <p>No logged actions yet!</p>}
          {actionsList.map((e, i) => (
            <div
              key={i}
              className="flex space-x-3 items-center bg-[#f0f0f0] p-2 rounded-md my-2"
            >
              <img
                className="h-[100px] w-[100px] rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/016/484/258/non_2x/forest-icon-free-vector.jpg"
                alt=""
              />
              {/* text */}
              <div className="flex-1 flex justify-between flex-wrap items-center">
                <div>
                  <h1 className="text-lg">{e.description}</h1>
                  <p className="text-sm">type : {e.actionType}</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <p>score</p>
                  <div className="flex items-center justify-center h-10 w-10 text-white font-bold bg-green-500 rounded-full">
                    {e.impactScore}
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EcoActions;
