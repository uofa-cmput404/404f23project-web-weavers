import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();
  const onButtonClick = () => {
        navigate("/home")
  }
  return (<div className = {"mainContainer"}>
      <div> <title>Login </title> </div>

      <div className = {"loginContainer"}>
        <input
          value = {password}
          placeholder = "Enter Password"
          className = {"inputBox"}
          onChange = {ev => setPassword(ev.target.value)} />
      </div>
      <br />

      <div className = {"loginContainer"}>
        <input
          value = {username}
          placeholder = "Enter Username"
          className = {"inputBox"}
          onChange = {ev => setUsername(ev.target.value)} />
      </div>
      <br />
      <div className = {"loginContainer"}>
        <input
        className={"InputButton"}
        type="button"
        onClick={onButtonClick}
        value = {"Login"} />
      </div>

    </div>
  );
}

export default Login;
