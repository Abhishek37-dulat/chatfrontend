import { Box, Typography, styled } from "@mui/material";
import React from "react";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  marginTop: "10px",
}));

const InputTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  "&>p": {
    color: "#252F43",
    fontSize: "16px",
    fontFamily: "'Tektur', cursive",
    fontWeight: "500",
  },
}));

const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  marginTop: "5px",
  "&>input": {
    padding: "5px 10px",
    border: "none",
    outline: "none",
    boxShadow: "0px 0px 2px rgba(0,0,0,0.5)",
    borderRadius: "4px",
  },
}));

const InputError = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  marginTop: "5px",
  "&>p": {
    color: "#E5323F",
    fontSize: "12px",
    fontWeight: "600",
  },
}));

const InputComponent = ({
  title,
  setTitle,
  titlename,
  errorname,
  placeholdername,
  errorContition,
  importantRequired,
  inputType,
}) => {
  return (
    <MainBox>
      <InputTitle>
        <Typography>
          {titlename}
          {importantRequired ? (
            <span style={{ color: "#E5323F" }}> *</span>
          ) : null}
        </Typography>
      </InputTitle>
      <InputBox>
        <input
          value={title}
          type={inputType}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "98%", height: "50px" }}
          placeholder={placeholdername}
        />
      </InputBox>
      {errorContition && title === "" ? (
        <InputError>
          <Typography>*{errorname}</Typography>
        </InputError>
      ) : null}
    </MainBox>
  );
};

export default InputComponent;
