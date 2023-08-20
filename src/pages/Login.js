import Header from "../components/Header";
import Login from "../components/Login";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </>
  );
}
