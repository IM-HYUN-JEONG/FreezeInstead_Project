import { useState } from "react";
import Caver from "caver-js";
import { caver, SaleTokenAdd, SaleTokenContract } from "../constants/Address";
import { ConnectAddressState, ConnectWalletTypeState } from "../atoms";
import { useRecoilValue } from "recoil";
import styles from "../styles/TokenList.module.css";
import { Box, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function BuyNFTCards({ tokenInfo }) {
  const KAS = new Caver(window.klaytn);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState(null);
  const ConnectAddress = useRecoilValue(ConnectAddressState);
  const ConnectWalletType = useRecoilValue(ConnectWalletTypeState);

  const price = Number(tokenInfo.tokenInfo.tokenPrice);
  const priceToHex = price.toString(16);

  async function onPurchaseCard(e) {
    const cardId = e.target.id;

    if (
      tokenInfo.tokenInfo.owner.toLowerCase() == ConnectAddress.toLowerCase()
    ) {
      alert("You are the Owner.");
      return;
    }
    /***  METAMASK  ***/
    if (ConnectWalletType == "eth") {
      const buyNFTTxParams = {
        from: ConnectAddress,
        to: SaleTokenAdd,
        data: SaleTokenContract.methods.purchaseToken(cardId).encodeABI(),
        gas: gas,
        gasPrice: "0x3a35294400",
        value: `0x${priceToHex}`,
      };

      let gas = await window.ethereum
        .request({
          method: "eth_estimateGas",
          params: [buyNFTTxParams],
        })
        .then(
          window.ethereum
            .request({
              method: "eth_sendTransaction",
              params: [buyNFTTxParams],
            })
            .then((txHash) => {
              if (txHash) {
                setTxHash(txHash);
                onOpen();
              }
            })
            .catch((error) => alert(`MetaMask Tx problem : ${error}`))
        );

      /***  KLAYTN  ***/
    } else if (ConnectWalletType == "klay") {
      try {
        const response = await KAS.klay.sendTransaction({
          type: "SMART_CONTRACT_EXECUTION",
          from: ConnectAddress,
          to: SaleTokenAdd,
          gas: "3000000",
          data: SaleTokenContract.methods.purchaseToken(cardId).encodeABI(),
          value: tokenInfo.tokenInfo.tokenPrice,
        });
        if (response.status) {
          setTxHash(response.transactionHash);
          onOpen();
        }
      } catch (error) {
        alert(`KAS Tx problem : ${error}`);
      }
    } else {
      alert("The wallet connection is wrong.");
    }
  }

  function goScopePage() {
    let link = `https://scope.klaytn.com/tx/${txHash}?tabId=tokenTransfer`;
    window.open(link);
  }

  return (
    <div className={styles.cardContainer}>
      <Box className={styles.textContainer}>
        <div>LockAmount : {tokenInfo.tokenInfo.lockClaAmount} CLA</div>
        <div>EndDay : {tokenInfo.tokenInfo.endTimestamp}</div>
        <div>Owner : {tokenInfo.tokenInfo.owner}</div>

        <div className={styles.price}>
          Price :
          {caver?.utils.convertFromPeb(tokenInfo.tokenInfo.tokenPrice, "KLAY")}
          KLAY
        </div>
        <Button
          className={styles.btn}
          id={tokenInfo.tokenInfo.tokenId}
          colorScheme="green"
          onClick={onPurchaseCard}
        >
          Buy
        </Button>
      </Box>
      {txHash ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>BuyNFT Tx Scope</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <button className={styles.scopeBtn} onClick={goScopePage}>
                Open Scope Page
              </button>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
    </div>
  );
}
