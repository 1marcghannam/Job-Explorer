import React from "react";
import { TextareaAutosize } from "@mui/material";
import Typography from "@mui/material/Typography";
import JobAnalysis from "../job-analysis/JobAnalysis";
import Button from "@mui/material/Button";
import toml from "toml";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SupportedJobTypes } from "../../lib/const";

import {
  getRequestData,
  useLocalStorage,
  getJobParseErrorMessage,
} from "../../lib/utils";

export default function Job() {
  const [job, setJob] = useLocalStorage("job", "");
  const [isDisabled, setIsDisabled] = useLocalStorage("isDisabled", false);

  let jobAnalysis: any;
  let parsedJob: any;
  let errorMessage = null;
  let requestData = [];

  const settings = JSON.parse(localStorage.getItem("settings"));

  const onPasteHandler = (event) => {
    setJob(event.clipboardData.getData("text"));
    setIsDisabled(true);
  };

  const onClickHandler = () => {
    setJob("");
    setIsDisabled(false);
  };

  try {
    parsedJob = toml.parse(job);

    errorMessage = getJobParseErrorMessage(parsedJob, settings.requiredFields);

    if (
      !errorMessage &&
      Object.keys(parsedJob).length !== 0 &&
      !Object.values(SupportedJobTypes).includes(parsedJob.type)
    ) {
      errorMessage = "Explorer only supports OCR jobs.";
    }

    if (!errorMessage && Object.keys(parsedJob).length !== 0) {
      requestData = getRequestData(parsedJob);
    }
  } catch (error) {
    errorMessage =
      "TOML Parsing error on line " +
      error.line +
      ", column " +
      error.column +
      ": " +
      error.message;
  }

  const Error = (
    <Box
      sx={{
        textAlign: "center",
        display: errorMessage ? "block" : "none",
      }}
    >
      <TroubleshootIcon sx={{ fontSize: 75, color: "#D3D3D3" }} />
      <Typography variant="subtitle1" gutterBottom sx={{ color: "red" }}>
        {errorMessage}
      </Typography>
    </Box>
  );

  if (requestData.length !== 0) {
    jobAnalysis = (
      <JobAnalysis requestData={requestData} parsedJob={parsedJob} />
    );
  }

  return (
    <Box sx={{ flexGrow: 4, padding: 3, height: "100%" }}>
      <Grid
        container
        spacing={3}
        rowSpacing={4}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={12}>
          <Box sx={{ height: 120, maxHeight: 120, width: "100%" }}>
            <TextareaAutosize
              aria-label="minimum height"
              maxRows={6}
              minRows={6}
              placeholder="Paste Job Here"
              style={{ width: "100%" }}
              onPaste={onPasteHandler}
              value={job}
              disabled={isDisabled}
            />
          </Box>
          <Box sx={{ maxHeight: 50 }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              disabled={!isDisabled}
              onClick={onClickHandler}
            >
              Clear
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              height: 290,
              maxHeight: 290,
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              direction: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Error}
            <Box
              sx={{
                textAlign: "center",
                display:
                  errorMessage || requestData.length !== 0 ? "none" : "block",
              }}
            >
              <TroubleshootIcon sx={{ fontSize: 75, color: "#D3D3D3" }} />
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#D3D3D3" }}
              >
                No job detected
              </Typography>
            </Box>
            {jobAnalysis}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
