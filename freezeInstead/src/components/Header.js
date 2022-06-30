import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "../constants/navLinks";
import ConnectWallet from "./ConnectWallet.js";
import {
  ConnectAddressState,
  ConnectWalletTypeState,
  IsLogInState,
} from "../atoms";
import { useRecoilValue } from "recoil";
import styles from "../styles/Header.module.css";
import { Label } from "semantic-ui-react";
import metaMask from "/img/icon_metamask.jpg";
import kaiKas from "/img/icon_kaikas.png";

export default function Header() {
  const connectWalletType = useRecoilValue(ConnectWalletTypeState);
  const connectAdd = useRecoilValue(ConnectAddressState);
  const isLogin = useRecoilValue(IsLogInState);

  return (
    <div className={styles.header}>
      <div className={styles.Container}>
        <ul className={styles.nav}>
          {navLinks.map((link) => {
            return (
              <li key={link.name}>
                <Link href={link.path} passHref>
                  <a>{link.name}</a>
                </Link>
              </li>
            );
          })}
          <li>
            <div>
              {!isLogin ? (
                <Label color="red"> Unconnected Accout</Label>
              ) : connectWalletType === "eth" ? (
                <Label as="a" color="orange">
                  <Image src={metaMask} alt="metaMask" width={30} height={30} />
                  {connectAdd}
                </Label>
              ) : connectWalletType === "klay" ? (
                <Label as="a" color="grey">
                  <Image src={kaiKas} alt="kaiKas" width={30} height={30} />
                  {connectAdd}
                </Label>
              ) : (
                <Label color="red"> Unconnected Accout</Label>
              )}
            </div>
          </li>
          {!isLogin ? (
            <li>
              <ConnectWallet />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
