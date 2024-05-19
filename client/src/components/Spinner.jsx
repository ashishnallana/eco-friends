import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ComponentStyles/Other.css";

const Spinner = () => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div className="spinner" style={{ height: "100vh" }}>
        <p>Login/Register to use the webapp.</p>
        <h1 className="text-center text-sm">redirecting in {count} secs</h1>
        <div className="spinner-border text-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
