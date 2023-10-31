import React from "react";
import Navbar from "../../components/navbar/Navbar";
import UsersDetails from "../../components/usersandgroups/UsersDetails";
import ChatBox from "../../components/chats/ChatBox";
import { Box, styled } from "@mui/material";

const MainBox = styled(Box)(({ theme }) => ({
  // border: "1px  solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  minHeight: "100vh",
}));
const NavBox = styled(Box)(({ theme }) => ({
  // border: "1px  solid black",
  display: "flex",
  width: "100%",
  height: "10vh",
}));
const BottomBox = styled(Box)(({ theme }) => ({
  // border: "1px  solid black",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  height: "90vh",
}));

const Home = () => {
  return (
    <MainBox>
      <NavBox>
        <Navbar />
      </NavBox>
      <BottomBox>
        <UsersDetails />
        <ChatBox />
      </BottomBox>
    </MainBox>
  );
};

export default Home;
