import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCall";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector((state)=>state.user)

  const handleSubmit = (e) => {
    e.preventDefault();  
    login(dispatch, { username, password });
  };

  return (
    <div>
      <form
        action=""
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{ padding: 10, marginBottom: 20 }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ padding: 10, marginBottom: 20 }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{ padding: 10, width: 100 }} onClick={handleSubmit} disabled={isFetching}>
          Login
        </button>
        { error && <span style={{marginTop: 10, color:"red"}}>Something went wrong</span>}
      </form>
    </div>
  );
};

export default Login;
