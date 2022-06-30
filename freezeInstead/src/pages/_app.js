import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
