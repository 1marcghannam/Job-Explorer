import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import DataSourceCard from "../data-source-card/DataSourceCard";

import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getMetrics, getMetricsQuery, getLatestAnswer } from "@src/lib/utils";

export default function JobAnalysis(props: any) {
  const [metricsResponse, setMetricsResponse] = useState(null);
  const [errorMetrics, setErrorMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(null);

  useEffect(() => {
    getMetrics(
      metricsQuery,
      setLoadingMetrics,
      setMetricsResponse,
      setErrorMetrics
    );
  }, []);

  const resultCards = props.requestData.map((data) => (
    // eslint-disable-next-line react/jsx-key
    <DataSourceCard requestData={data} />
  ));

  let contractAddress;
  let evmChainID;
  let metricsQuery;
  let Title;
  let latestAnswer;

  if (props.parsedJob) {
    contractAddress = props.parsedJob?.contractAddress;
    evmChainID = props.parsedJob?.evmChainID;
    metricsQuery = getMetricsQuery(contractAddress, evmChainID);
  }

  if (loadingMetrics) {
    Title = (
      <Box sx={{ padding: 0, height: "100%" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: "100%" }}
        />
      </Box>
    );
  } else if (metricsResponse) {
    latestAnswer = getLatestAnswer(metricsResponse);
    Title = (
      <Box sx={{ padding: 0, height: "100%" }}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <b>Name: </b>
          {metricsResponse[0].feed_name +
            " - " +
            metricsResponse[0].network_group +
            " " +
            metricsResponse[0].network_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <b>Latest Answer: </b> {latestAnswer}
        </Typography>
      </Box>
    );
  } else if (errorMetrics) {
    Title = (
      <Box sx={{ padding: 0, height: "100%" }}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <b>Name: </b>
          {props.parsedJob.name}
        </Typography>
      </Box>
    );
  }

  console.log(metricsResponse);

  return (
    <Grid
      container
      spacing={0}
      rowSpacing={4}
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Grid item xs={12} sx={{ height: "30%" }}>
        {Title}
      </Grid>
      <Grid item xs={12} sx={{ height: "70%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            direction: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {resultCards}
        </Box>
      </Grid>
    </Grid>
  );
}
