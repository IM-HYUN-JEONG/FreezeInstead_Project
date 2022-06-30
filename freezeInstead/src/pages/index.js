import Head from "next/head";
import Introduction from "../constants/Introduction";

export default function Start() {
  return (
    <>
      <div>
        <Head>
          <title>Freeze instead</title>
          <meta
            property="og:description"
            content="Try trading your locked assets using NFT."
          />
          <meta property="og:image" content="/img/thumbnail.jpg" />
          <meta property="og:site_name" content="Freeze instead" />
          <meta
            name="description"
            content="Try trading your locked assets using NFT."
          />
        </Head>
      </div>
      <Introduction />
    </>
  );
}
