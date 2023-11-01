import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import RegisterForm from "./RegisterForm";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px  solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  minHeight: "70vh",
  marginTop: "100px",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
  borderRadius: "10px",
  padding: "10px",
  "&>p": {
    "&>span": {
      ":hover": {
        textDecoration: "underline",
      },
    },
  },
}));

const LoginForm = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formCondition, setFormCondition] = useState(false);
  const [registerDisplay, setRegisterDisplay] = useState(false);
  const { setUser } = ChatState();
  const handleLogin = async () => {
    if (userEmail !== "" && userPassword !== "") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/api/user/login`,
          { email: userEmail, password: userPassword },
          config
        );

        setUser(data);
        localStorage.setItem(
          "userInformationChatAppAbhishekDulat",
          JSON.stringify(data)
        );

        navigate("/home");
      } catch (error) {
        alert("not able to login", error);
      }
    } else {
      alert("please fill all the fields");
    }
  };
  return (
    <>
      <MainBox style={{ display: `${registerDisplay ? "none" : "flex"}` }}>
        <Typography style={{ fontSize: "24px" }}>Login</Typography>

        <InputComponent
          title={userEmail}
          setTitle={setUserEmail}
          titlename="Email Id"
          errorname="Please Enter Valid Email id"
          placeholdername="Enter email id"
          errorContition={formCondition}
          importantRequired={true}
          inputType="email"
        />
        <InputComponent
          title={userPassword}
          setTitle={setUserPassword}
          titlename="Password"
          errorname="Please Enter Valid Password"
          placeholdername="Create Password"
          errorContition={formCondition}
          importantRequired={true}
          inputType="password"
        />

        <Button
          style={{
            marginTop: "40px",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
            backgroundColor: "#536DFE",
            color: "#fff",
          }}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
        <Typography style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#536DFE", cursor: "pointer" }}
            onClick={() => setRegisterDisplay(true)}
          >
            Register
          </span>
        </Typography>
      </MainBox>
      <div style={{ display: `${registerDisplay ? "flex" : "none"}` }}>
        <RegisterForm
          registerDisplay={registerDisplay}
          setRegisterDisplay={setRegisterDisplay}
        />
      </div>
    </>
  );
};

export default LoginForm;
