import styles from "../styles/notlogin.module.css";
import ConnectWallet from "../components/ConnectWallet";

export default function Notlogin() {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.errorFont}>Please Connect Account Address</div>
        <ConnectWallet />
      </div>
    </section>
  );
}
