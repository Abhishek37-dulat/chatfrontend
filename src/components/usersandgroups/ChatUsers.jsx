import { Box, Typography, styled } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SingleBox = styled(Box)(({ theme }) => ({
  width: "90%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "#EEF5FF",
  marginLeft: "5px",
  marginTop: "5px",
}));

const ChatUsers = ({ iconSize, nameSize, emailSize }) => {
  return (
    <SingleBox>
      <Box>
        <AccountCircleIcon style={{ fontSize: `${iconSize}px` }} />
      </Box>
      <Box>
        {" "}
        <Typography
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            fontSize: `${nameSize}px`,
          }}
        >
          Abhishek Dulat
        </Typography>
        <Typography
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            fontSize: `${emailSize}px`,
          }}
        >
          Abhishek11906997dulat@gmail.com
        </Typography>
      </Box>
    </SingleBox>
  );
};

export default ChatUsers;
