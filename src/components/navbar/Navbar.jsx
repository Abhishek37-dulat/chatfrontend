import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";

const NavbarMain = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  height: "10vh",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
  "&>div": {
    marginLeft: "10px",
  },
  zIndex: "999",
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "150px",
  height: "40px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
  marginRight: "20px",
  borderRadius: "5px",
  cursor: "pointer",
  position: "relative",
}));
const DownBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  marginTop: "120px",
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "150px",
  height: "80px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
  borderRadius: "5px",
  cursor: "pointer",
  "&>div": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    padding: "5%",
    ":hover": {
      backgroundColor: "#C5C6C9",
    },
    ":active": {
      transform: "scale(0.98)",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userInformationChatAppAbhishekDulat");
    navigate("/");
  };
  return (
    <NavbarMain>
      <Box>
        <IconButton>
          <NotificationsIcon style={{ color: "#536DFE" }} />
        </IconButton>
      </Box>
      <ProfileBox onClick={() => setDrop(!drop)}>
        <AccountCircleIcon />
        <Typography style={{ marginLeft: "5px", marginRight: "5px" }}>
          Abhishek
        </Typography>
        {drop ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

        {drop && (
          <DownBox>
            <Box onClick={() => handleClickOpen()}>
              <AccountCircleIcon />
              <Typography style={{ marginLeft: "5px", marginRight: "5px" }}>
                Profile
              </Typography>
            </Box>
            <Box onClick={() => handleLogOut()}>
              <Typography style={{ marginLeft: "5px", marginRight: "5px" }}>
                Logout
              </Typography>
              <LogoutIcon />
            </Box>
          </DownBox>
        )}
      </ProfileBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Profile"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box style={{ display: "flex" }}>
              <AccountCircleIcon />
              <Typography
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  color: "#536DFE",
                }}
              >
                Abhishek
              </Typography>
            </Box>
            <Box style={{ marginTop: "10px" }}>
              Abhishek11906997dulat@gmail.com
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </NavbarMain>
  );
};

export default Navbar;
