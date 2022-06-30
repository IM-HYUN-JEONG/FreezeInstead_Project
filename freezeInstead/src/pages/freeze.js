import { useRecoilValue } from "recoil";
import { IsLogInState } from "../atoms";
import FreezeAmount from "../components/FreezeAmount";
import FreezingPeriod from "../components/FreezingPeriod";
import FreezeBtn from "../components/FreezeBtn";
import Notlogin from "../constants/Notlogin";
import styles from "../styles/Freeze.module.css";

export default function Freeze() {
  const isLogin = useRecoilValue(IsLogInState);

  return (
    <>
      {isLogin ? (
        <section className={styles.sectionContainer}>
          <div className={styles.text}>CLA Freeze</div>
          <section>
            <FreezeAmount />
            <FreezingPeriod />
            <FreezeBtn />
          </section>
        </section>
      ) : (
        <Notlogin />
      )}
    </>
  );
}
