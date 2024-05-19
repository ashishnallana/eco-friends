import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ForestIcon from "@mui/icons-material/Forest";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/Auth";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();

  const dpStyle = {
    width: "25px",
    height: "25px",
    backgroundImage: `url(${
      auth.user
        ? auth.user.photo
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="flex flex-col h-screen absolute">
      <div className="flex space-x-3 items-center mb-5 fixed p-3 z-[1001] w-screen shadow-xl bg-white">
        <MenuIcon onClick={() => (menu ? setmenu(false) : setmenu(true))} />
        <NavLink
          to={"/"}
          className="text-3xl font-bold flex items-center space-x-2"
        >
          <img
            className="h-[30px] w-[30px] rounded-full"
            src="https://png.pngtree.com/element_our/png/20181214/human-character-with-green-tree-logo-png_270852.jpg"
            alt=""
          />
          <p className="tracking-wide">ECO-FRIENDS</p>
        </NavLink>
      </div>

      {/* nav options */}
      <motion.div
        className="flex flex-1 flex-col py-5 px-2 pt-20 justify-between w-[270px] bg-white shadow-xl fixed h-screen"
        initial={{ x: "-100%" }}
        animate={{ x: menu ? 0 : "-100%" }}
        transition={{ stiffness: 300 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "250px",
          backgroundColor: "white",
          boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
      >
        {!auth.user ? (
          <ul className="flex flex-col text-green-700 text-lg font-semibold space-y-2">
            <NavLink
              to={"/login"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <LoginIcon />
              <p>Login</p>
            </NavLink>
            {/*  */}
            <NavLink
              to={"/register"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <HowToRegIcon />
              <p>Register</p>
            </NavLink>
          </ul>
        ) : (
          <ul className="flex flex-col text-green-700 text-lg font-semibold space-y-2">
            <NavLink
              to={"/"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <HomeIcon />
              <p>Home</p>
            </NavLink>
            {/*  */}
            <NavLink
              to={"/articles"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <FeedIcon />
              <p>Articles</p>
            </NavLink>
            {/*  */}
            {/* <NavLink className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white">
              <DirectionsRunIcon />
              <p>Eco Actions</p>
            </NavLink> */}
            {/*  */}
            <NavLink
              to={"/initiatives"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <ForestIcon />
              <p>Initiatives</p>
            </NavLink>
            {/*  */}
            <NavLink
              to={"/challenges"}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <TaskAltIcon />
              <p>Challenges</p>
            </NavLink>
          </ul>
        )}

        {/*  */}
        {auth.user && (
          <ul className="flex flex-col text-green-700 text-lg font-semibold space-y-2">
            <NavLink
              to={`/profiles/${auth.user._id}`}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <div className="bg-white rounded-full" style={dpStyle}></div>
              <p>Profile</p>
            </NavLink>
            {/*  */}
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="flex space-x-2 items-center px-3 py-2 rounded-md transition-all hover:bg-green-700 hover:text-white"
            >
              <LogoutIcon />
              <p>Logout</p>
            </button>
          </ul>
        )}
      </motion.div>
    </div>
  );
}

export default Navbar;
