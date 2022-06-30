import { atom } from "recoil";

export const ConnectAddressState = atom({
  key: "ConnectAddress",
  default: "",
});

export const IsLogInState = atom({
  key: "IsLogIn",
  default: false,
});

export const IsApprovedState = atom({
  key: "IsApproved",
  default: "Not available",
});

export const ConnectWalletTypeState = atom({
  key: "ConnectWalletType",
  default: "",
});

export const MetaMaskLatestBalanceState = atom({
  key: "MetaMaskAmount",
  default: [],
});

export const ClaBalanceState = atom({
  key: "ClaAmount",
  default: [],
});

export const ClaFreezeInputAmountState = atom({
  key: "ClaFreezeInputAmount",
  default: "",
});

export const ClaFreezePeriodState = atom({
  key: "ClaFreezePeriod",
  default: "",
});
