import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

import { getAdapterUrl, postData, getData } from "@src/lib/utils";
import { SUCCESS_STATUS_CODE } from "@src/lib/const";

export default function DataSourceCard(props: any) {
  const [postResponse, setPostResponse] = useState(null);
  const [getResponse, setGetResponse] = useState(null);

  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);

  const [loadingGet, setLoadingGet] = useState(true);
  const [errorGet, setErrorGet] = useState(null);

  const provider = props.requestData.provider;
  const settings = JSON.parse(localStorage.getItem("settings"));

  const adapterUrl = getAdapterUrl(provider, settings);
  const adapterUrlGet = `${adapterUrl}health`;

  let errorMessage = null;
  let message;

  useEffect(() => {
    getData(adapterUrlGet, setLoadingGet, setGetResponse, setErrorGet);
    postData(
      adapterUrl,
      props.requestData,
      setLoadingPost,
      setPostResponse,
      setErrorPost
    );
  }, []);

  if (loadingPost || loadingGet) {
    message = (
      <Card
        sx={{
          minWidth: "195px",
          maxWidth: "195px",
          maxHeight: "185px",
          height: "185px",
          textAlign: "center",
        }}
      >
        <CardContent
          sx={{
            maxWidth: "195px",
            alignContent: "center",
            display: "content",
            paddingTop: 7,
          }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (errorGet) {
    errorMessage = `Bridge URL: ${adapterUrl} can't be reached.`;
    console.log(errorMessage);
    message = (
      <Card
        sx={{
          minWidth: "195px",
          maxWidth: "195px",
          maxHeight: "185px",
          height: "185px",
          backgroundColor: "rgba(255, 0, 0, 0.3)",
        }}
      >
        <CardContent sx={{ maxWidth: "195px" }}>
          <Tooltip title={props.requestData.provider} placement="top" arrow>
            <Typography
              variant="h6"
              component="div"
              sx={{ maxWidth: "195px" }}
              noWrap
            >
              {props.requestData.provider}
            </Typography>
          </Tooltip>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {errorMessage}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (errorPost) {
    errorMessage = `Unexpected error with POST request. ${errorPost}`;
    message = (
      <Card
        sx={{
          minWidth: "195px",
          maxWidth: "195px",
          maxHeight: "185px",
          height: "185px",
          backgroundColor: "rgba(255, 0, 0, 0.3)",
        }}
      >
        <CardContent sx={{ maxWidth: "195px" }}>
          <Tooltip title={props.requestData.provider} placement="top" arrow>
            <Typography
              variant="h6"
              component="div"
              sx={{ maxWidth: "195px" }}
              noWrap
            >
              {props.requestData.provider}
            </Typography>
          </Tooltip>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {errorMessage}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (postResponse && getResponse) {
    const statusCode = postResponse.statusCode;
    if (statusCode === SUCCESS_STATUS_CODE) {
      const result =
        isNaN(postResponse.result) || isNaN(Number(postResponse.result))
          ? postResponse.result.toString()
          : Number(postResponse.result).toFixed(5);
      message = (
        <Card
          sx={{
            minWidth: "195px",
            maxWidth: "195px",
            maxHeight: "185px",
            height: "185px",
            backgroundColor: "rgba(0, 255, 0, 0.3)",
          }}
        >
          <CardContent sx={{ maxWidth: "195px" }}>
            <Tooltip title={props.requestData.provider} placement="top" arrow>
              <Typography
                variant="h6"
                component="div"
                sx={{ maxWidth: "195px" }}
                noWrap
              >
                {props.requestData.provider}
              </Typography>
            </Tooltip>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              v{getResponse.version}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" noWrap>
              {result}
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      message = (
        <Card
          sx={{
            minWidth: "195px",
            maxWidth: "195px",
            maxHeight: "185px",
            height: "185px",
            backgroundColor: "rgba(255, 0, 0, 0.3)",
          }}
        >
          <CardContent sx={{ maxWidth: "195px" }}>
            <Tooltip title={props.requestData.provider} placement="top" arrow>
              <Typography
                variant="h6"
                component="div"
                sx={{ maxWidth: "195px" }}
                noWrap
              >
                {props.requestData.provider}
              </Typography>
            </Tooltip>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              v{getResponse.version}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {postResponse.error.message}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }

  return message;
}
