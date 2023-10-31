import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SinglUser from "./SinglUser";
import InputComponent from "./InputComponent";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import ChatUsers from "./ChatUsers";

const UserMain = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "30%",
  height: "100%",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
}));
const TopBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "50px",
  backgroundColor: "#fff",
  //   boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
}));
const SearchBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  height: "100%",
  backgroundColor: "#fff",
  "&>form": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "&>input": {
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      paddingLeft: "10px",
    },
  },
}));
const GroupBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30%",
  height: "100%",
  backgroundColor: "#fff",
  "&>div": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid black",
    width: "80%",
    height: "80%",
    borderRadius: "3px",
    backgroundColor: "#536DFE",
    color: "#fff",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
    cursor: "pointer",

    ":active": {
      transform: "scale(0.98)",
    },
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "80vh",
  overflowY: "scroll",
  backgroundColor: "#fff",
  paddingTop: "10px",
  "::-webkit-scrollbar": {
    width: "0",
  },
}));
const ResultBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "80vh",
  overflowY: "scroll",
  backgroundColor: "#fff",
  paddingTop: "10px",
  "::-webkit-scrollbar": {
    width: "0",
  },
}));
const UserScrollSearch = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  overflowY: "scroll",
  height: "30vh",
  width: "300px",
  //   border: "1px solid black",
  "::-webkit-scrollbar": {
    width: "0",
  },
}));
const UsersDetails = () => {
  const InputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [formCondition, setFormCondition] = useState(false);
  const [dataShowCondition, setDataShowCondition] = useState(false);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:7000/api/user?search=${search}`,
        config
      );

      setUsers(data);
    } catch (error) {
      alert(error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setFormCondition(true);
  };
  const handleRemoveUser = () => {};
  const handleInputBox = () => {
    setDataShowCondition(true);
  };
  const handleSelected = async (userId) => {
    setDataShowCondition(false);
    console.log(userId);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:7000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
    } catch (error) {
      alert(error.message);
    }
  };
  console.log(users, chats);
  return (
    <UserMain>
      <TopBox>
        <SearchBox>
          <form onSubmit={handleSearch}>
            <input
              ref={InputRef}
              onClick={() => handleInputBox()}
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </SearchBox>
        <GroupBox>
          <Box onClick={() => handleClickOpen()}>
            <AddIcon style={{ fontSize: "36px" }} />
          </Box>
        </GroupBox>
      </TopBox>
      {!dataShowCondition ? (
        <UserBox>
          <ChatUsers iconSize={36} nameSize={20} emailSize={14} />
        </UserBox>
      ) : (
        <ResultBox>
          {users.length > 0
            ? users?.map((data) => {
                return (
                  <SinglUser
                    handleSelected={handleSelected}
                    data={data._id}
                    key={data._id}
                    iconSize={36}
                    nameSize={20}
                    emailSize={14}
                    name={data.name}
                    email={data.email}
                  />
                );
              })
            : null}
        </ResultBox>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"New Group"}</DialogTitle>
        <DialogContent
          style={{
            padding: "10px 60px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Box style={{ display: "flex" }}>
              <InputComponent
                title={groupName}
                setTitle={setGroupName}
                titlename="Enter Group Name"
                errorname="Please Enter Valid Group Name"
                placeholdername="Enter Group Name"
                errorContition={formCondition}
                importantRequired={true}
                inputType="text"
              />
            </Box>
            <Box style={{ marginTop: "10px" }}>
              <InputComponent
                title={userName}
                setTitle={setUserName}
                titlename="Add Users"
                errorname="Please Enter Valid User Name"
                placeholdername="Search User"
                errorContition={formCondition}
                importantRequired={false}
                inputType="text"
              />
            </Box>
            <Box
              style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}
            >
              <Chip
                style={{ margin: "2px" }}
                label="Abhishek"
                onDelete={() => handleRemoveUser()}
              />
            </Box>
            <UserScrollSearch>
              <SinglUser iconSize={24} nameSize={16} emailSize={10} />
              <SinglUser iconSize={24} nameSize={16} emailSize={10} />
              <SinglUser iconSize={24} nameSize={16} emailSize={10} />
              <SinglUser iconSize={24} nameSize={16} emailSize={10} />
              <SinglUser iconSize={24} nameSize={16} emailSize={10} />
            </UserScrollSearch>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus>
            Add New Group
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </UserMain>
  );
};

export default UsersDetails;
