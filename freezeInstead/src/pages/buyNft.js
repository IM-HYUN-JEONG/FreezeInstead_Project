import styles from "../styles/BuyNFT.module.css";
import Notlogin from "../constants/Notlogin";
import BuyNFT from "../components/BuyNFT";
import { useRecoilValue } from "recoil";
import { IsLogInState } from "../atoms";

export default function BuyNft() {
  const isLogin = useRecoilValue(IsLogInState);

  return (
    <>
      {isLogin ? (
        <section className={styles.sectionContainer}>
          <BuyNFT />
        </section>
      ) : (
        <Notlogin />
      )}
    </>
  );
}
