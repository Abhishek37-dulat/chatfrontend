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

const ChatUsers = ({
  iconSize,
  nameSize,
  emailSize,
  userDetails,
  isGroup,
  chatname,
}) => {
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
          {isGroup ? chatname : userDetails[1].name}{" "}
          {isGroup ? "(Group)" : "(Chat)"}
        </Typography>
        {isGroup ? (
          userDetails.length > 0 ? (
            userDetails?.map((data, index) => {
              return (
                <Typography
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    fontSize: `${emailSize}px`,
                  }}
                >
                  {index !== userDetails.length - 1 ? data.name : "You"}
                </Typography>
              );
            })
          ) : (
            "network error"
          )
        ) : (
          <Typography
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              fontSize: `${emailSize}px`,
            }}
          >
            {userDetails[1].email}
          </Typography>
        )}
      </Box>
    </SingleBox>
  );
};

export default ChatUsers;
