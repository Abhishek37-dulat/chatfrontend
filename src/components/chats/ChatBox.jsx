import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  styled,
  Button,
} from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MessageBox from "./MessageBox";
import { ChatState } from "../../Context/ChatProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import io from "socket.io-client";
var socket, selectedChatCompare;

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
  const [socketConnected, setSocketConnected] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
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
        `${process.env.REACT_APP_URL}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      setNewMessage("");
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket = io(process.env.REACT_APP_URL);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  console.log(selectedChat, messages, user);
  return (
    <ChatMain>
      {/* <EmptyBox>
        <Typography>Start Chating</Typography>
      </EmptyBox> */}
      <TopBox>
        <Box style={{ marginLeft: "10px" }}>
          <Typography style={{ fontSize: "24px" }}>
            {selectedChat?.isGroupChat
              ? selectedChat?.chatName
              : selectedChat?.users?.map((data) => {
                  return data?._id !== user?._id ? data.name : "";
                })}
            {selectedChat?.isGroupChat
              ? `(${selectedChat?.users?.length} Group)`
              : ""}
          </Typography>
        </Box>
        <Box style={{ marginRight: "10px" }}>
          <IconButton onClick={() => handleClickOpen()}>
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
          <input
            type="text"
            placeholder="Enter Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={(e) => sendMessage(e)}>send</button>
        </Box>
      </FooterBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedChat?.isGroupChat ? "Group Members" : "Profile"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedChat &&
              selectedChat?.users?.map((data) => {
                return data?._id !== user?._id ? (
                  <>
                    <Box style={{ display: "flex" }}>
                      <AccountCircleIcon />
                      <Typography
                        style={{
                          marginLeft: "5px",
                          marginRight: "5px",
                          color: "#536DFE",
                        }}
                      >
                        {data.name}
                      </Typography>
                    </Box>
                    <Box style={{ marginTop: "10px" }}>{data.email}</Box>
                  </>
                ) : (
                  ""
                );
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ChatMain>
  );
};

export default ChatBox;
