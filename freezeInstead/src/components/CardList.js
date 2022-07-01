import SaleModal from "./SaleModal";
import {
  FreezeNFTAdd,
  FreezeNFTContract,
  SaleTokenAdd,
} from "../constants/Address";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ConnectAddressState,
  ConnectWalletTypeState,
  IsApprovedState,
} from "../atoms";
import Caver from "caver-js";
import styles from "../styles/TokenList.module.css";
import { Icon } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

export default function CardList({ nftCard }) {
  const KAS = new Caver(window.klaytn);
  const ConnectAddress = useRecoilValue(ConnectAddressState).toString();
  const [isApproved, setIsApproved] = useRecoilState(IsApprovedState);
  const ConnectWalletType = useRecoilValue(ConnectWalletTypeState);
  const saleApprovalStatus = useRecoilValue(IsApprovedState);

  (async function isApprovedForAll() {
    const isApproved = await FreezeNFTContract.methods
      .isApprovedForAll(ConnectAddress, SaleTokenAdd)
      .call();
    if (isApproved) {
      setIsApproved("Available");
    }
  })();

  async function setApprovedForAll() {
    /***  METAMASK  ***/
    if (ConnectWalletType === "eth") {
      const setApprovedTxParams = {
        from: ConnectAddress,
        to: FreezeNFTAdd,
        data: FreezeNFTContract.methods
          .setApprovalForAll(SaleTokenAdd, true)
          .encodeABI(),
        gas: gas,
        gasPrice: "0x3a35294400",
      };

      const gas = await window.ethereum
        .request({
          method: "eth_estimateGas",
          params: [setApprovedTxParams],
        })
        .then(
          window.ethereum
            .request({
              method: "eth_sendTransaction",
              params: [setApprovedTxParams],
            })
            .catch((error) => alert(`Tx problem : ${error}`))
        );
      /***  KAS  ***/
    } else if (ConnectWalletType === "klay") {
      try {
        await KAS.klay.sendTransaction({
          type: "SMART_CONTRACT_EXECUTION",
          from: ConnectAddress,
          to: FreezeNFTAdd,
          gas: "3000000",
          data: FreezeNFTContract.methods
            .setApprovalForAll(SaleTokenAdd, true)
            .encodeABI(),
        });
      } catch (error) {
        alert(`Tx problem : ${error}`);
      }
    } else {
      alert("The wallet connection is wrong.");
    }
  }

  return (
    <>
      <div className={styles.flipCard} id={nftCard.infos.id}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.user}>
              <Icon as={FaUserCircle} w={8} h={8} />
              <div className={styles.userText}>
                <div> ID : {nftCard.infos.id}</div>
                <div>LockClaAmount : {nftCard.infos.lockClaAmount} CLA</div>
                <div> StartDay : {nftCard.infos.startTimeStemp}</div>
                <div> LockPeriod : {nftCard.infos.lockPeriod}</div>
                <div> EndDay : {nftCard.infos.endTimestamp}</div>
                <br />
                <div> Owner : {nftCard.infos.owner}</div>
              </div>
            </div>
          </div>
          <div className={styles.flipCardBack} id={nftCard.infos.id}>
            <div className={styles.btnContainer}>
              <div>
                <div className={styles.salesApprovalStatus}>
                  Sales Approval Status
                </div>
                {isApproved == "Available" ? (
                  <>
                    <button className={styles.available}>
                      {saleApprovalStatus}
                    </button>
                    <div>
                      <SaleModal cardId={nftCard.id} />
                    </div>
                  </>
                ) : (
                  <>
                    <button className={styles.notAvailable}>
                      {saleApprovalStatus}
                    </button>
                    <button className={styles.btn} onClick={setApprovedForAll}>
                      Approve For Sale
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
