import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/users/register`,
        {
          name,
          username,
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(`/login`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      // console.log(error.response.data.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen w-full text-[black] font-semibold">
        <form
          onSubmit={handleSubmit}
          className="bg-white py-3 rounded-lg flex flex-col px-10"
        >
          <h1 className="py-10 text-5xl font-extrabold flex justify-center text_shadow">
            Register
          </h1>

          <input
            value={name}
            type="text"
            placeholder="Name"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            value={username}
            type="text"
            placeholder="username"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            value={password}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none placeholder:text-black text-xl py-2 border-b-2 my-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#00BF63] text-white px-3 py-2 rounded-md mt-5 mb-10"
          >
            Register
          </button>
        </form>
        <br />
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Register;
