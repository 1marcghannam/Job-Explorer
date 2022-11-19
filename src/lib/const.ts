export const defaultSettings = {
  format: {
    prefix: "https://",
    suffix: "-adapter.prod.linkpool.io/",
  },
  requiredFields: ["contractAddress", "type", "observationSource"],
  bridges: {
    example: "https://ea-adapter.prod.linkpool.io/",
  },
};

export enum RequiredSettings {
  FORMAT = "format",
  PREFIX = "prefix",
  SUFFIX = "suffix",
}

export enum SupportedJobTypes {
  OFFCHAINREPORTING = "offchainreporting",
}

export const SUCCESS_STATUS_CODE = 200;
