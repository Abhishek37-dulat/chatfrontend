import { Box, styled } from "@mui/material";
import React from "react";
import LoginForm from "../../components/Login/LoginForm";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px  solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const Login = () => {
  return (
    <MainBox>
      <LoginForm />
    </MainBox>
  );
};

export default Login;
