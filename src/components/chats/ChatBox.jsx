import { Box, IconButton, Typography, styled } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MessageBox from "./MessageBox";
import { ChatState } from "../../Context/ChatProvider";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const sendMessage = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        "/api/message",
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      setMessages([...messages, data]);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  console.log(selectedChat, messages, user);
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
        {messages?.length > 0
          ? messages?.map((data) => {
              console.log(data?._id, user?._id);
              return data?.sender?._id === user?._id ? (
                <YourMessages>
                  <MessageBox data={data} userid={true} />
                </YourMessages>
              ) : (
                <UserMessages>
                  <MessageBox data={data} userid={false} />
                </UserMessages>
              );
            })
          : `start chatting with me`}
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
