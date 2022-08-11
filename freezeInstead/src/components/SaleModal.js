import { useState } from "react";
import BigNumber from "bignumber.js";
import Caver from "caver-js";
import { ConnectAddressState, ConnectWalletTypeState } from "../atoms";
import { useRecoilValue } from "recoil";
import { caver, SaleTokenAdd, SaleTokenContract } from "../constants/Address";
import styles from "../styles/SaleModal.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function SaleModal({ cardId }) {
  const KAS = new Caver(window.klaytn);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState("");
  const ConnectAddress = useRecoilValue(ConnectAddressState).toString();
  const ConnectWalletType = useRecoilValue(ConnectWalletTypeState);

  async function registerOnSaleCard() {
    /***  METAMASK  ***/
    if (ConnectWalletType === "eth") {
      const registerOnSaleCardTxParams = {
        from: ConnectAddress,
        to: SaleTokenAdd,
        gasPrice: "0x3a35294400",
        gas: gas,
        data: SaleTokenContract.methods
          .setForSaleToken(cardId, price)
          .encodeABI(),
      };

      let gas = await window.ethereum
        .request({
          method: "eth_estimateGas",
          params: [registerOnSaleCardTxParams],
        })
        .then(
          window.ethereum
            .request({
              method: "eth_sendTransaction",
              params: [registerOnSaleCardTxParams],
            })
            .catch((error) => alert(`Tx problem : ${error}`))
        );

      /***  KAS  ***/
    } else if (ConnectWalletType === "klay") {
      try {
        await KAS.klay.sendTransaction({
          type: "SMART_CONTRACT_EXECUTION",
          from: ConnectAddress,
          to: SaleTokenAdd,
          gas: "3000000",
          data: SaleTokenContract.methods
            .setForSaleToken(cardId, price)
            .encodeABI(),
        });
      } catch (error) {
        alert(`Tx problem : ${error}`);
      }
    } else {
      alert("The wallet connection is wrong.");
    }
  }

  function submitInfo(e) {
    e.preventDefault();
    registerOnSaleCard();
    onClose();
  }

  const priceInputHandler = (e) => {
    const currentPrice = caver.utils.toPeb(
      new BigNumber(e.target.value).toFixed(),
      "KLAY"
    );
    setPrice(currentPrice);
  };

  return (
    <>
      <button className={styles.btn} onClick={onOpen}>
        Sale
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sale NFT </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div>ID : {cardId}</div>
              Price :
              <input placeholder="price" onChange={priceInputHandler} />
              KLAY
              <div>
                <input
                  className={styles.btn}
                  type="submit"
                  value="Register"
                  onClick={submitInfo}
                />
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
