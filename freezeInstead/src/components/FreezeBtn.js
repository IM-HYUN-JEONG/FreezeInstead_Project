import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import {
  CLATokenAdd,
  CLATokenContract,
  FreezeContract,
  FreezeContractAdd,
} from "../constants/Address";
import {
  ClaFreezeInputAmountState,
  ClaFreezePeriodState,
  ConnectAddressState,
  ConnectWalletTypeState,
} from "../atoms";
import { useRecoilValue } from "recoil";
import styles from "../styles/FreezeBtn.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const approveAmount = new BigNumber(10 ** 40).toFixed();

export default function FreezeBtn() {
  const ConnectWalletType = useRecoilValue(ConnectWalletTypeState);
  const ClaFreezePeriod = useRecoilValue(ClaFreezePeriodState);
  const [ClaFreezeEndTimeStamp, setClaFreezeEndTimeStamp] = useState("");
  const [checkApproveAmount, setCheckApproveAmount] = useState("");
  const [txHash, setTxHash] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function goScopePage() {
    let link = `https://scope.klaytn.com/tx/${txHash}?tabId=tokenTransfer`;
    window.open(link);
  }
  const ClaFreezeInputAmount = useRecoilValue(ClaFreezeInputAmountState);
  const amount = new BigNumber(ClaFreezeInputAmount)
    .multipliedBy(10 ** 18)
    .toFixed();

  const ConnectAddress = useRecoilValue(ConnectAddressState).toString();
  const startTimeStemp = new Date().getTime();
  const PERIOD1 = 3 * 2592000000;
  const PERIOD2 = 6 * 2592000000;
  const PERIOD4 = 9 * 2592000000;

  useEffect(() => {
    if (ClaFreezePeriod == "1") {
      setClaFreezeEndTimeStamp(startTimeStemp + PERIOD1);
    } else if (ClaFreezePeriod == "2") {
      setClaFreezeEndTimeStamp(startTimeStemp + PERIOD2);
    } else if (ClaFreezePeriod == "4") {
      setClaFreezeEndTimeStamp(startTimeStemp + PERIOD4);
    }
  }, [ClaFreezePeriod]);

  async function approveContract() {
    /***  METAMASK  ***/
    if (ConnectWalletType === "eth") {
      const approveTxParams = {
        from: ConnectAddress,
        to: CLATokenAdd,
        gasPrice: "0x3a35294400",
        gas: gas,
        data: CLATokenContract.methods
          .approve(FreezeContractAdd, approveAmount)
          .encodeABI(),
      };

      const gas = await window.ethereum.request({
        method: "eth_estimateGas",
        params: [approveTxParams],
      });

      await window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [approveTxParams],
        })
        .then((txHash) => {
          if (txHash) {
            alert("Please log in again");
            location.reload();
          }
        })
        .catch((error) => alert(error));

      /***  KAS  ***/
    } else if (ConnectWalletType === "klay") {
      try {
        const response = await KAS.klay.sendTransaction({
          type: "SMART_CONTRACT_EXECUTION",
          from: ConnectAddress,
          to: SaleTokenAdd,
          gas: "3000000",
          data: CLATokenContract.methods
            .approve(FreezeContractAdd, approveAmount)
            .encodeABI(),
        });
        if (response.status) {
          alert("Please log in again");
          location.reload();
        }
      } catch (error) {
        alert(`Tx problem : ${error}`);
      }
    } else {
      alert("The wallet connection is wrong.");
    }
  }

  useEffect(() => {
    (async function checkApprove() {
      const allowance = await CLATokenContract.methods
        .allowance(ConnectAddress, FreezeContractAdd)
        .call();

      setCheckApproveAmount(allowance);
    })();
  }, [ConnectAddress]);

  async function freezeAmount() {
    const freezeTxParams = {
      from: ConnectAddress,
      to: FreezeContractAdd,
      gasPrice: "0x3a35294400",
      gas: gas,
      data: FreezeContract.methods
        .freeze(amount, ClaFreezePeriod, startTimeStemp, ClaFreezeEndTimeStamp)
        .encodeABI(),
    };

    const gas = await window.ethereum.request({
      method: "eth_estimateGas",
      params: [freezeTxParams],
    });

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [freezeTxParams],
      })
      .then((txHash) => {
        if (txHash) {
          //Store Transaction
          setTxHash(txHash);
        }
      })
      .then(onOpen)
      .catch((error) => alert(error));
  }

  async function freezeContractConnect() {
    //Run if there is an `amount`
    if (amount != "NaN" && checkApproveAmount != "0") {
      freezeAmount();
    } else if (checkApproveAmount == "0") {
      approveContract();
    }
  }

  return (
    <div>
      <button className={styles.freezeBox} onClick={freezeContractConnect}>
        Freeze
      </button>

      {txHash ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Freeze Tx Scope</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <button className={styles.scopeBtn} onClick={goScopePage}>
                  Open Scope Page
                </button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </div>
  );
}
