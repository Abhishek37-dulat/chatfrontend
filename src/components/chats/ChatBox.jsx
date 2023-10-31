import { Box, IconButton, Typography, styled } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MessageBox from "./MessageBox";

const ChatMain = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",
}));
const EmptyBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",
}));
const TopBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "15%",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
  zIndex: "700",
}));
const MidBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  height: "70%",
  backgroundColor: "#fff",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "0",
  },
}));
const UserMessages = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "#fff",
}));
const YourMessages = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  backgroundColor: "#fff",
}));
const FooterBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "15%",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
  "&>div": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    "&>input": {
      width: "90%",
      height: "100%",
      border: "none",
      outline: "none",
      paddingLeft: "10px",
    },
    "&>button": {
      border: "none",
      outline: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      backgroundColor: "#536DFE",
      color: "#fff",
    },
  },
}));
const ChatBox = () => {
  return (
    <ChatMain>
      {/* <EmptyBox>
        <Typography>Start Chating</Typography>
      </EmptyBox> */}
      <TopBox>
        <Box style={{ marginLeft: "10px" }}>
          <Typography style={{ fontSize: "24px" }}>Abhishek Dulat</Typography>
        </Box>
        <Box style={{ marginRight: "10px" }}>
          <IconButton>
            <RemoveRedEyeIcon />
          </IconButton>
        </Box>
      </TopBox>
      <MidBox>
        <UserMessages>
          <MessageBox />
        </UserMessages>
        <YourMessages>
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </YourMessages>
        <UserMessages>
          <MessageBox />
        </UserMessages>
        <UserMessages>
          <MessageBox />
        </UserMessages>
        <YourMessages>
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </YourMessages>
        <UserMessages>
          <MessageBox />
        </UserMessages>
      </MidBox>
      <FooterBox>
        <Box>
          <input type="text" placeholder="Enter Message" />
          <button>send</button>
        </Box>
      </FooterBox>
    </ChatMain>
  );
};

export default ChatBox;
