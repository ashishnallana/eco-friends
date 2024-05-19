import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import ProfileCard from "./ProfileCard";
import Loader from "../../components/Loader";

function Profile() {
  const { id } = useParams();
  const [auth, setAuth] = useAuth();
  const [data, setdata] = useState(null);
  // const [user, setuser] = useState(false); // to check if the profile is the current user's profile
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/users/profile/${id}`
      );
      if (res.data.success) {
        console.log(res);
        setdata(res.data.user);
        // if (res.data.user._id === auth.user._id) setuser(true);
        // if (res.data.user._id === auth.user._id) navigate("/my_profile");
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
    fetchProfile();
    // console.log(auth);
  }, []);

  return (
    <Layout>
      <div>
        {data ? <ProfileCard data={data} user={auth.user} /> : <Loader />}
      </div>
    </Layout>
  );
}

export default Profile;
