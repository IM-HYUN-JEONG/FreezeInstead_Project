import Caver from "caver-js";
import { ClaDistributorABI } from "../ABI/ClaDistributorABI";
import { CLATokenABI } from "../ABI/CLATokenABI";
import { CLSTokenABI } from "../ABI/CLSTokenABI";
import { FreezeContractABI } from "../ABI/FreezeContractABI";
import { FreezeNFTABI } from "../ABI/FreezeNFTABI";
import { SaleTokenABI } from "../ABI/SaleTokenABI";

const RPC_URL_MAINNET = "https://klaytn04.fandom.finance/";
export const caver = new Caver(RPC_URL_MAINNET);

export const SaleTokenAdd = "0xDdE5887D58cadeB51F0B93E4A14F06Dceeda7537";
export const SaleTokenContract = new caver.klay.Contract(
  SaleTokenABI,
  SaleTokenAdd
);

export const CLATokenAdd = "0xcf87f94fd8f6b6f0b479771f10df672f99eada63";
export const CLATokenContract = new caver.klay.Contract(
  CLATokenABI,
  CLATokenAdd
);

export const FreezeNFTAdd = "0x65daABC0e3fcCC59D63a518CCc897f9f1aBe4c80";
export const FreezeNFTContract = new caver.klay.Contract(
  FreezeNFTABI,
  FreezeNFTAdd
);

export const FreezeContractAdd = "0x9e3F85B1230ddacf3538169D6aB21d6a718eee8c";
export const FreezeContract = new caver.klay.Contract(
  FreezeContractABI,
  FreezeContractAdd
);

export const ClaDistributorAdd = "0xE9e1031eEAA5817E4706BE294c3Bb4681FDb2447";
export const ClaDistributorContract = new caver.klay.Contract(
  ClaDistributorABI,
  ClaDistributorAdd
);

export const CLSTokenAdd = "0x5F5dEC0d6402408eE81f52ab985a9C665b6e6010";
export const CLSTokenContract = new caver.klay.Contract(
  CLSTokenABI,
  CLSTokenAdd
);
