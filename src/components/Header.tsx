import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
const Header = () => {
  let { publicKey, sendTransaction, signTransaction, signAllTransactions } =
    useWallet();
  console.log({ publicKey, sendTransaction, signTransaction });

  return (
    <div className="navbar w-full mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">StreamPay</span>
      </div>
      <div className="flex-none">
        <WalletMultiButton className="btn btn-ghost" />
      </div>
      {publicKey ? "Logged In" : "Not In"}
    </div>
  );
};

export default Header;
