import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [addrAlert, showAddrAlert] = useState(false);
  const { publicKey } = useWallet();
  const shortKey = () => {
    let len: number = publicKey?.toBase58().length as number;
    return (
      publicKey?.toBase58().slice(0, 6) +
      "...." +
      publicKey?.toBase58().slice(len - 6, len - 1)
    );
  };

  const copyWalletAdrr = () => {
    showAddrAlert(true);
    setTimeout(() => {
      showAddrAlert(false);
    }, 2000);
    navigator.clipboard.writeText(publicKey?.toBase58() as string);
  };

  return (
    <div className="sidebar w-64 h-screen">
      <div className="h-full z-50 py-10 px-8 bg-glass-blue w-64 fixed flex flex-col">
        <h3 className="font-bold text-2xl text-white">StreamPay</h3>
        <div>
          <ul className="mt-16">
            <li className="hover:bg-[#3c4251] my-1 hover:rounded-md -ml-2 pl-2">
              <Link href="/dashboard">
                <a className="py-3">Dashboard</a>
              </Link>
            </li>
            <li className="hover:bg-[#3c4251] my-1 hover:rounded-md -ml-2 pl-2">
              <Link href="/links">
                <a className="py-3">Links (Coming Soon)</a>
              </Link>
            </li>
            <li className="hover:bg-[#3c4251] my-1 hover:rounded-md -ml-2 pl-2">
              <Link href="/pay">
                <a className="py-3">Pay (Coming Soon)</a>
              </Link>
            </li>
            <li className="hover:bg-[#3c4251] rounded-md my-8 bg-[#3c42515a] -ml-2 pl-2">
              <a
                className="py-3"
                href="https://app.streamflow.finance/"
                target="_blank"
                rel="noreferrer"
              >
                Streamflow
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <div className="mb-4 relative">
            <p>Connected wallet:</p>
            <p>
              {addrAlert && (
                <div className="p-2 absolute rounded-lg -top-5 bg-gray-700">
                  Address Copied
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 inline mr-1 align-text-bottom hover:opacity-60 cursor-pointer"
                onClick={copyWalletAdrr}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              {shortKey()}
            </p>
          </div>
          <WalletDisconnectButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
