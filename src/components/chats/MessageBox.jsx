import { Box, Typography, styled } from "@mui/material";
import React from "react";

const MessageMain = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#1e1e1e",
  padding: "10px",
  borderRadius: "5px",
}));
const TextBox = styled(Typography)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#C5C6C9",
  color: "#1e1e1e",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
  padding: "10px",
  borderRadius: "5px",
}));
const UserInfo = styled(Typography)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "#1e1e1e",
  width: "100%",
  padding: "2px",
  "&>p": {
    fontSize: "10px",
  },
}));

const MessageBox = () => {
  return (
    <MessageMain>
      <TextBox>Message</TextBox>
      <UserInfo>
        <Typography>Abhishek</Typography>
      </UserInfo>
    </MessageMain>
  );
};

export default MessageBox;
