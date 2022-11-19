<div align="left">
<h1> Job Explorer Chrome Extension for Chainlink Node Operators</h1>

</div>

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Settings](#settings)
- [Screenshots](#screenshots)

## Introduction <a name="introduction"></a>

Testing external adapters for every OCR job before deployment is very taxing on Chainlink Node Operators. <br />
The Job Explorer's main utility is to request all the adapters used in a job while using the parsed `requestData` from the `bridge` task. <br />
This will allow Node Operators to test their adapters for a given job before they deploy it on their nodes, <br />
therefore ensuring successful job runs and accurate data. <br />

The Job Explorer is also powered by LinkPool's Metrics API which currently allows the tool to query the `latestAnswer` on chain and will open doors to many more possible implementations.

## Installation <a name="installation"></a>

1. Clone the repository.
2. Run `yarn` or `npm i` (check your node version >= 16)
3. run `yarn build` or `npm run build`.
4. Load Extension on a Chrome Browser:
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Check - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project

## Settings <a name="settings"></a>

Here are the default settings which will be stored in `localStorage` by default at launch of the extension:

```json
{
  // Adapter URL format
  "format": {
    "prefix": "https://", // URL prefix
    "suffix": "-adapter.prod.linkpool.io/" // URL suffix
  },
  "requiredFields": ["contractAddress", "type", "observationSource"], // Optional required fields for the OCR Job.
  // Override adapter URLs with key (bridge name) and value (adapter url) pairs.
  "bridges": {
    "example": "https://ea-adapter.prod.linkpool.io/"
  }
}
```

The Job Explorer is configurable for every Node Operator. <br />
The settings can be modified in the settings page (click on the settings logo in the navigation bar). <br />
The keys `format`, `prefix` and `suffix` are the ONLY REQUIRED ATTRIBUTES in the settings. <br />
The adapter URL is parsed in this format: <br />

```js
// Example with default settings

const settings = {
  format: {
    prefix: "https://",
    suffix: "-adapter.prod.linkpool.io/",
  },
};

// Bridge Task from an OCR Job with name="coingecko"
// ds1 [type=bridge name="coingecko" requestData="{\\"data\\": {\\"endpoint\\":\\"crypto\\",\\"from\\":\\"USDT\\",\\"to\\":\\"USD\\"}}"];

const bridgeName = "coingecko";

const adapterUrl = `${format.prefix} + ${bridgeName} + ${format.suffix}`;

// Result : https://coingecko-adapter.prod.linkpool.io/
```

## Screenshots <a name="screenshots"></a>

### Job Explorer - Explore Tab - 1 <a name="newtab"></a>

<img width="500" src="https://i.imgur.com/LY4ggrc.png">

### Job Explorer - Explore Tab - 2 <a name="newtab"></a>

<img width="500" src="https://i.imgur.com/pKyDzE8.png">

### Job Explorer - Settings Tab - 2 <a name="newtab"></a>

<img width="500"  src="https://i.imgur.com/nkk04Kn.png">
