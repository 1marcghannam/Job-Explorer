import React, { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { validateSettings } from "../../lib/utils";

export default function Settings() {
  const [textInput, setTextInput] = useState(localStorage.getItem("settings"));
  const [isDisabled, setIsDiabled] = useState(true);
  const [isErrored, setIsErrored] = useState(false);

  const onChangeHandler = (event) => {
    setTextInput(event.target.value);
  };

  const onClickHandler = () => {
    if (validateSettings(textInput)) {
      const formattedSettings = JSON.stringify(JSON.parse(textInput), null, 2);
      localStorage.setItem("settings", formattedSettings);
      setTextInput(formattedSettings);
      setIsDiabled(!isDisabled);
      setIsErrored(false);
    } else {
      setIsErrored(true);
    }
  };

  const Error = (
    <Typography
      variant="subtitle2"
      gutterBottom
      sx={{
        color: "red",
        alignSelf: "center",
        marginLeft: 1,
        display: isErrored ? "block" : "none",
      }}
    >
      JSON malformat or missing key attributes.
    </Typography>
  );

  return (
    <Box sx={{ flexGrow: 4, padding: 3, height: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "black" }}>
          Settings:
        </Typography>
        <TextareaAutosize
          minRows={24}
          maxRows={24}
          style={{ width: "100%" }}
          onChange={onChangeHandler}
          value={textInput}
          disabled={isDisabled}
        />
      </Box>
      <Box sx={{ maxHeight: 50, marginTop: 1.5, display: "flex" }}>
        <Button
          variant="outlined"
          color={isDisabled ? "error" : "success"}
          sx={{ textTransform: "none" }}
          onClick={onClickHandler}
        >
          {isDisabled ? "Edit" : "Save"}
        </Button>{" "}
        {Error}
      </Box>
    </Box>
  );
}
