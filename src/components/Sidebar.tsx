import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar w-64 h-screen">
      <div className="h-full bg-black z-50 fixed w-64">
        sidebar
        <WalletDisconnectButton className="" />
      </div>
    </div>
  );
};

export default Sidebar;
