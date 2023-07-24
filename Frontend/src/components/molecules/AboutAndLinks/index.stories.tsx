import React from "react";
import AboutCrypto from "./index";

export default {
  title: "molecules/AboutAndLinks",
  component: AboutCrypto,
};

export const Bitcoin = (): JSX.Element => (
  <AboutCrypto
    currency="Bitcoin"
    content="The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin."
  ></AboutCrypto>
);

export const Ethereum = (): JSX.Element => (
  <AboutCrypto
    currency="Ethereum"
    content="Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet."
  ></AboutCrypto>
);
