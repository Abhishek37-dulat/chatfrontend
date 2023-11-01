import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

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

const RegisterForm = ({ registerDisplay, setRegisterDisplay }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [formCondition, setFormCondition] = useState(false);
  const { setUser } = ChatState();
  const handleRegister = async () => {
    if (
      userName !== "" &&
      userEmail !== "" &&
      userPassword !== "" &&
      userConfirmPassword !== ""
    ) {
      if (userPassword !== userConfirmPassword) {
        alert("Password and ConfirmPassword Doesn't match!");
      } else {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "https://chat-server-7zey.onrender.com/api/user",
            {
              name: userName,
              email: userEmail,
              password: userPassword,
            },
            config
          );
          console.log(data);
          setUser(data);
          localStorage.setItem(
            "userInformationChatAppAbhishekDulat",
            JSON.stringify(data)
          );

          navigate("/home");
        } catch (error) {
          alert("not able to register", error);
        }
      }
    }
  };
  return (
    <MainBox>
      <Typography style={{ fontSize: "24px" }}>Register</Typography>
      <InputComponent
        title={userName}
        setTitle={setUserName}
        titlename="Name"
        errorname="Please Enter Valid Name"
        placeholdername="Enter your name"
        errorContition={formCondition}
        importantRequired={true}
        inputType="text"
      />
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
      <InputComponent
        title={userConfirmPassword}
        setTitle={setUserConfirmPassword}
        titlename="Confirm Password"
        errorname="password and confirm password don't match"
        placeholdername="re-enter password"
        errorContition={formCondition}
        importantRequired={true}
        inputType="text"
      />
      <Button
        style={{
          marginTop: "10px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
          backgroundColor: "#536DFE",
          color: "#fff",
        }}
        onClick={() => handleRegister()}
      >
        Register
      </Button>
      <Typography style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#536DFE", cursor: "pointer" }}
          onClick={() => setRegisterDisplay(false)}
        >
          Login
        </span>
      </Typography>
    </MainBox>
  );
};

export default RegisterForm;
