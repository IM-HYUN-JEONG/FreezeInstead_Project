import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { ConnectAddressState, IsLogInState } from "../atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { FreezeNFTContract, SaleTokenContract } from "../constants/Address";
import CardList from "../components/CardList";
import Notlogin from "../constants/Notlogin";
import styles from "../styles/TokenList.module.css";

export default function NftList() {
  const isLogin = useRecoilValue(IsLogInState);
  const ConnectAddress = useRecoilValue(ConnectAddressState).toString();
  const [nftCardList, setNftCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let arr = [];

  async function saveMyToken() {
    const totalSupply = await FreezeNFTContract.methods.totalSupply().call();

    for (let i = 0; i <= totalSupply - 1; i++) {
      const cards = await SaleTokenContract.methods.getTokenInfo(i).call();
      /* id setting */
      cards.id = Number(i);

      /* owner setting */
      cards.owner = String(cards[4]);

      /* lockPeriod setting */
      const lockPeriod = Number(cards[2]);
      if (lockPeriod === 1) {
        cards.lockPeriod = "90 Days";
      } else if (lockPeriod === 2) {
        cards.lockPeriod = "180 Days";
      } else if (lockPeriod === 4) {
        cards.lockPeriod = "270 Days";
      } else {
        cards.lockPeriod = "Error";
      }

      /* lockClaAmount setting */
      cards.lockClaAmount = Number(cards[0]) / 10 ** 18;

      /* startTimeStemp setting */
      const startTimeStemp = new Date(Number(cards[1]));
      cards.startTimeStemp =
        startTimeStemp.getFullYear() +
        "." +
        (startTimeStemp.getMonth() + 1) +
        "." +
        startTimeStemp.getDate();

      /* endTimestamp setting */
      const endTimestamp = new Date(Number(cards[3]));
      cards.endTimestamp =
        endTimestamp.getFullYear() +
        "." +
        (endTimestamp.getMonth() + 1) +
        "." +
        endTimestamp.getDate();

      arr.push(cards);
    }

    for (let infos of arr) {
      if (String(infos[4]).toLowerCase() === ConnectAddress) {
        setNftCardList((prevState) => {
          return [...prevState, { infos }];
        });
      }
    }
    setIsLoading(false);
  }
  useEffect(() => {
    saveMyToken();
  }, []);

  return (
    <>
      {isLogin ? (
        <section className={styles.sectionContainer}>
          {isLoading ? (
            <Box
              maxW="16rem"
              maxH="19rem"
              padding="6"
              boxShadow="lg"
              bg="white"
            >
              <SkeletonCircle size="12" />
              <SkeletonText mt="10" noOfLines={5} spacing="5" />
            </Box>
          ) : (
            <>
              {nftCardList.length >= 1 ? (
                <>
                  {nftCardList.map((nftCard, i) => {
                    return <CardList key={i} nftCard={nftCard} />;
                  })}
                </>
              ) : (
                <div className={styles.errorFont}>No NFT</div>
              )}
            </>
          )}
        </section>
      ) : (
        <Notlogin />
      )}
    </>
  );
}
