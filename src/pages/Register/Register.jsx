import { Box, styled } from "@mui/material";
import React from "react";
import RegisterForm from "../../components/Login/RegisterForm";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px  solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const Register = () => {
  return (
    <MainBox>
      <RegisterForm />
    </MainBox>
  );
};

export default Register;
