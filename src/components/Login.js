import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useAuth } from "../AuthContext";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(fieldsState);
  var [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  //Handle Login API Integration here
  const authenticateUser = () => {
    const endpoint = "http://127.0.0.1:8000/auth/login/";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginState),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          setErrorMessage("Unauthorized");
        } else {
          setErrorMessage("Something went wrong");
        }
      })
      .then((data) => {
        sessionStorage.setItem("auth-token", data.access);
        navigate("/doc");
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    try {
      e.preventDefault();
      authenticateUser();
      const userData = { username: "exampleUser" }; // Replace with actual data
      login(userData);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      {errorMessage ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{errorMessage}</span>
        </div>
      ) : (
        ""
      )}
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleLogin} text="Login" />
    </form>
  );
};

export default Login;
