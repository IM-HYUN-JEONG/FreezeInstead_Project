import Image from "next/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ConnectAddressState,
  ConnectWalletTypeState,
  IsLogInState,
} from "../atoms";
import styles from "../styles/Header.module.css";
import metaMask from "/img/icon_metamask.jpg";
import kaiKas from "/img/icon_kaikas.png";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const ConnectWallet = () => {
  let accounts;
  const setConnectWalletType = useSetRecoilState(ConnectWalletTypeState);
  const [isLogin, setIsLogin] = useRecoilState(IsLogInState);
  const setConnectAdd = useSetRecoilState(ConnectAddressState);

  async function connectMetaMask() {
    if (window.ethereum) {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectAdd(accounts[0]);
      setConnectWalletType("eth");
      setIsLogin(!isLogin);
    } else {
      alert("Install metamask extension.");
    }
  }

  async function connectKaikas() {
    setConnectWalletType("klay");
    accounts = await klaytn.enable();
    setConnectAdd(accounts[0]);
    setIsLogin(!isLogin);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function metaLogin() {
    if (isLogin) {
      setConnectAdd("");
    } else {
      connectMetaMask();
    }
  }

  function kaikasLogin() {
    if (isLogin) {
      setConnectAdd("");
    } else {
      connectKaikas();
    }
  }

  return (
    <div>
      <>
        <Button onClick={onOpen}>Connect Wallet</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connect Wallet</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ul className={styles.nav}>
                <li>
                  <div onClick={metaLogin}>
                    <Image
                      src={metaMask}
                      alt="metaMask"
                      width={50}
                      height={50}
                    />
                    <div>MetaMask</div>
                  </div>
                </li>
                <li>
                  <div onClick={kaikasLogin}>
                    <Image src={kaiKas} alt="kaiKas" width={50} height={50} />
                    <div>Kaikas</div>
                  </div>
                </li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
export default ConnectWallet;
