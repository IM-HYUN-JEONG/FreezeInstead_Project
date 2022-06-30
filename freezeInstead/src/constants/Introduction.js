import Image from "next/image";
import ConnectWallet from "../components/ConnectWallet";
import styles from "../styles/About.module.css";
import List from "/img/listIcon.png";
import Deposit from "/img/deposit.png";
import Transfer from "/img/transfer.png";
import Github from "/img/icon_github.png";
import Gmail from "/img/icon_gmail.png";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { IsLogInState } from "../atoms";

export default function Introduction() {
  const isLogin = useRecoilValue(IsLogInState);
  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.firstIntro}>
          <span>
            Try trading <br />
            Your locked assets using NFT.
          </span>
        </div>
        <div className={styles.secondIntro}>
          You can use NFT <br />
          to trade CLAs that are locked for a specific period of time with
          others <br /> for asset liquidity.
        </div>
        {!isLogin ? <ConnectWallet /> : null}
        <div className={`${styles.arrow} ${styles.arrowFirst}`}></div>
        <div className={`${styles.arrow} ${styles.arrowSecond}`}></div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.boxesContainer}>
          <span className={styles.boxContainer1}>
            <div className={styles.icon}>
              <Image src={Deposit} alt="Deposit" width={90} height={90} />
            </div>
            <div className={styles.title}>Freeze</div>
            <div className={styles.explain}>
              Freeze CLA instead of claim swap and Issue NFT that prove savings.
            </div>
          </span>

          <span className={styles.boxContainer2}>
            <div className={styles.icon}>
              <Image src={List} alt="List" width={90} height={90} />
            </div>
            <div className={styles.title}>My NFT List</div>
            <div className={styles.explain}>
              You can check your NFT list that proves CLA deposit.
            </div>
          </span>

          <span className={styles.boxContainer3}>
            <div className={styles.icon}>
              <Image src={Transfer} alt="Transfer" width={90} height={90} />
            </div>
            <div className={styles.title}>Buy Another NFT</div>
            <div className={styles.explain}>
              You can buy an NFT that proves someone else&apos;s CLA deposit.
              <br />
              If you purchase the NFT of A, you will be the owner of the CLA
              deposit.
            </div>
          </span>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <span className={styles.footerIcon}>
          <Link href="https://github.com/LIM-HYUN-JEONG">
            <a>
              <Image src={Github} alt="Github" width={30} height={30} />
            </a>
          </Link>
        </span>

        <span className={styles.footerIcon}>
          <Link href="mailto:fltxld1@gmail.com">
            <a>
              <Image src={Gmail} alt="Gmail" width={30} height={25} />
            </a>
          </Link>
        </span>
      </div>
    </>
  );
}
