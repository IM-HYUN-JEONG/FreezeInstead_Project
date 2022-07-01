import Image from "next/image";
import { CLATokenContract } from "../constants/Address";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ClaBalanceState,
  ClaFreezeInputAmountState,
  ConnectAddressState,
} from "../atoms";
import styles from "../styles/FreezeAmount.module.css";
import claImg from "/img/claImg.png";
import BigNumber from "bignumber.js";
import { useEffect } from "react";

export default function FreezeAmount() {
  const [claBalance, setClaBalance] = useRecoilState(ClaBalanceState);
  const ConnectAddress = useRecoilValue(ConnectAddressState).toString();
  const setClaFreezeInputAmount = useSetRecoilState(ClaFreezeInputAmountState);

  const amountInputHandler = (e) => {
    const ClaInputAmount = new BigNumber(e.target.value).toString();
    setClaFreezeInputAmount(ClaInputAmount);
  };

  async function getCLABalance() {
    const currentCLA = await CLATokenContract.methods
      .balanceOf(ConnectAddress)
      .call();
    const CLA = currentCLA / 10 ** 18;
    setClaBalance(CLA);
  }

  useEffect(() => {
    getCLABalance();
  }, []);

  return (
    <section>
      <div className={styles.notification}>
        <span>Amount to Freeze</span>

        <div>Balance : {claBalance} CLA</div>
      </div>

      <div className={styles.amountInputBox}>
        <Image src={claImg} alt="claImg" width={30} height={30} />
        <input
          className={styles.amountInput}
          type="number"
          placeholder="Lock Amount"
          onChange={amountInputHandler}
        />
        <span>CLA</span>
      </div>
    </section>
  );
}
