import { useEffect, useState } from "react";
import { SaleTokenContract } from "../constants/Address";
import BuyNFTCards from "./BuyNFTCards";
import styles from "../styles/TokenList.module.css";
import { Grid } from "@chakra-ui/react";

export default function BuyNFT() {
  const [saleNftCardArray, setSaleNftCardArray] = useState([]);

  async function getOnSaleTokens() {
    try {
      const onSaleTokensLength = await SaleTokenContract.methods
        .getOnSaleTokensLength()
        .call();

      const tempOnSaleArray = [];

      if (onSaleTokensLength != "0") {
        for (let i = 0; i < parseInt(onSaleTokensLength); i++) {
          const tokenInfo = await SaleTokenContract.methods
            .onSaleTokens(i)
            .call();
          /* lockClaAmount setting */
          tokenInfo.lockClaAmount = Number(tokenInfo.lockClaAmount) / 10 ** 18;

          /* endTimestamp setting */
          const endTimestamp = new Date(Number(tokenInfo.endTimestamp));
          tokenInfo.endTimestamp =
            endTimestamp.getFullYear() +
            "." +
            (endTimestamp.getMonth() + 1) +
            "." +
            endTimestamp.getDate();

          tempOnSaleArray.push({ tokenInfo });
        }

        setSaleNftCardArray(tempOnSaleArray);
      } else if ((onSaleTokensLength = "0")) {
        return;
      }
    } catch (error) {
      alert(`Tx problem : ${error}`);
    }
  }

  useEffect(() => {
    getOnSaleTokens();
  }, []);

  return (
    <>
      {saleNftCardArray.length != 0 ? (
        <Grid mt={2} templateColumns="repeat(2, 1fr)" gap={8}>
          {saleNftCardArray &&
            saleNftCardArray.map((cards, i) => {
              return <BuyNFTCards key={i} tokenInfo={cards} />;
            })}
        </Grid>
      ) : (
        <div className={styles.errorFont}>Sold Out NFT</div>
      )}
    </>
  );
}
