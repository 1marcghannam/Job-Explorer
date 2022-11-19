import React from "react";
import { SupportedJobTypes, RequiredSettings } from "./const";

export const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export const getRequestData = (parsedJob) => {
  let cleanedBridgeName: string[] = [];
  let cleanedRequestData: any[] = [];
  const array = parsedJob.observationSource.split(/\r?\n/);
  const requests = array.filter((string) => string.includes("type=bridge"));
  const cleaned = requests.map((request) =>
    request.replace(/[&/\\#+()$~%.'*?<>]/g, "")
  );
  cleanedBridgeName = cleaned.map(
    (task) => task.slice(0, -3).split('name="').pop().split('"')[0]
  );
  cleanedRequestData = cleaned.map((task) =>
    JSON.parse(task.slice(0, -3).split('requestData="').pop())
  );
  cleanedRequestData.forEach((object, index) => {
    object.id = 1;
    object.provider = cleanedBridgeName[index];
  });
  return cleanedRequestData;
};

export const hasRequiredFields = (
  job,
  requiredFields: string[]
): boolean => {
  const hasRequiredFields = requiredFields.every((requiredParameter) =>
    Object.prototype.hasOwnProperty.call(job, requiredParameter)
  );
  return hasRequiredFields;
};

export const getJobParseErrorMessage = (
  parsedJob,
  requiredFields: string[]
): string => {
  let errorMessage: string;

  const hasParams = hasRequiredFields(parsedJob, requiredFields);

  if (Object.keys(parsedJob).length !== 0 && !hasParams) {
    errorMessage = "Job missing 1 or more attributes.";
  }
  if (Object.keys(parsedJob).length !== 0 && hasParams) {
    errorMessage = null;
  }

  return errorMessage;
};

export const validateJSON = (stringJSON: string): boolean => {
  try {
    JSON.parse(stringJSON);
  } catch (error) {
    return false;
  }
  return true;
};

export const validateSettings = (settings: string): boolean => {
  if (!validateJSON(settings)) {
    return false;
  }
  const parsedSettings = JSON.parse(settings);
  if (RequiredSettings.FORMAT in parsedSettings) {
    if (
      RequiredSettings.PREFIX in parsedSettings.format &&
      RequiredSettings.SUFFIX in parsedSettings.format
    ) {
      return true;
    }
  }
  return false;
};

export const getAdapterUrl = (provider, settings): void => {
  let adapterUrl;
  const prefix = settings.format.prefix;
  const suffix = settings.format.suffix;
  if ("bridges" in settings && settings.bridges[provider]) {
    adapterUrl = settings.bridges[provider];
  } else {
    adapterUrl = `${prefix}${provider}${suffix}`;
  }
  return adapterUrl;
};

export async function postData(
  adapterUrl,
  requestData,
  setLoadingPost,
  setResponsePost,
  setErrorPost
) {
  try {
    setLoadingPost(true);
    const response = await fetch(adapterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    setResponsePost(data);
  } catch (error) {
    setErrorPost(error.message);
  } finally {
    setLoadingPost(false);
  }
}

export async function getMetrics(
  metricsQuery,
  setLoadingMetrics,
  setMetricsResponse,
  setErrorMetrics
) {
  try {
    setLoadingMetrics(true);
    const response = await fetch(`https://api.market.link/v1/metrics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: metricsQuery,
    });

    const data = await response.json();
    setMetricsResponse(data);
  } catch (error) {
    setErrorMetrics(error.message);
  } finally {
    setLoadingMetrics(false);
  }
}

export async function getData(
  adapterUrl,
  setLoadingGet,
  setResponseGet,
  setErrorGet
) {
  try {
    setLoadingGet(true);
    const response = await fetch(adapterUrl);
    const data = await response.json();

    setResponseGet(data);
  } catch (error) {
    setErrorGet(error.message);
  } finally {
    setLoadingGet(false);
  }
}

export const getMetricsQuery = (contractAddress, evmChainID): string => {
  const query = `
 Select
    feed_events.*,
    feed_events.node_id As node_id${evmChainID}
From
    feed_events Inner Join
    (Select
         Max(feed_events.round_id) As "Max_round_id",
         feed_events.feed_id
     From
         feed_events
     Where
         feed_events.feed_address = Decode('${contractAddress.substring(
           2
         )}', 'hex')
     Group By
         feed_events.feed_id) maxRound On feed_events.round_id = maxRound."Max_round_id"
Where
feed_events.feed_address = Decode('${contractAddress.substring(2)}', 'hex')
 `;
  return query;
};

export const getLatestAnswer = (metricsResponse) => {
  let sum = 0;
  let dividend = 0;
  metricsResponse.forEach((node) => {
    if (!isNaN(Number(node.answer))) {
      sum += Number(node.answer);
      dividend += 1;
    }
  });
  return sum / dividend;
};
