import { ClaFreezeInputAmountState, ClaFreezePeriodState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styles from "../styles/FreezingPeriod.module.css";

export default function FreezingPeriod() {
  const ClaFreezeInputAmount = useRecoilValue(ClaFreezeInputAmountState);
  const setClaFreezePeriod = useSetRecoilState(ClaFreezePeriodState);

  function btn90Days_click() {
    setClaFreezePeriod("1");
  }
  function btn180Days_click() {
    setClaFreezePeriod("2");
  }
  function btn270Days_click() {
    setClaFreezePeriod("4");
  }
  const now = new Date();
  const plus90day = new Date(
    now.setDate(now.getDate() + 90)
  ).toLocaleDateString();
  const plus180day = new Date(
    now.setDate(now.getDate() + 180)
  ).toLocaleDateString();
  const plus270day = new Date(
    now.setDate(now.getDate() + 270)
  ).toLocaleDateString();

  const Receive90day = (ClaFreezeInputAmount * 1).toFixed(6);
  const Receive180day = (ClaFreezeInputAmount * 2).toFixed(6);
  const Receive270day = (ClaFreezeInputAmount * 4).toFixed(6);

  return (
    <div>
      <div>Select Freeze Period</div>
      <div className={styles.btnBox}>
        <button
          className={styles.periodItems}
          id="90day"
          onClick={btn90Days_click}
        >
          <div className={styles.title}>90 Days</div>
          <div className={styles.notification}>Freezing Period</div>
          {plus90day}
          <div className={styles.notification}>You&#39;ll Receive</div>
          {Receive90day}CLS
        </button>

        <button
          className={styles.periodItems}
          id="180day"
          onClick={btn180Days_click}
        >
          <div className={styles.title}>180 Days</div>
          <div className={styles.notification}>Freezing Period</div>
          {plus180day}
          <div className={styles.notification}>You&#39;ll Receive</div>
          {Receive180day}CLS
        </button>

        <button
          className={styles.periodItems}
          id="270day"
          onClick={btn270Days_click}
        >
          <div className={styles.title}>270 Days</div>
          <div className={styles.notification}>Freezing Period</div>
          {plus270day}
          <div className={styles.notification}>You&#39;ll Receive</div>
          {Receive270day}CLS
        </button>
      </div>
    </div>
  );
}
