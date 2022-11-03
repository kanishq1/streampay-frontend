import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const Topbar = () => {
  return (
    <div className="w-full flex justify-between px-8 pt-10 pb-4">
      <h3>Hello User! Welocome to StreamPay!</h3>
      <div>Wallet Connected</div>
    </div>
  );
};

export default Topbar;
