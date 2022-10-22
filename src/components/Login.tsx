import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const { publicKey, connected } = useWallet();

  const login = async () => {
    try {
      await axios.post("http://localhost:4001/api/login", {
        wallet_addr: publicKey?.toString(),
      });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (publicKey && connected) login();
  }, [publicKey, connected]);

  const handleClick = () => {
    console.log("test");
  };

  return (
    <div className="login min-h-screen flex">
      <div>
        <div className="login-bg-gradient"></div>
      </div>
      <div className="rounded-lg bg-[#404f5c91] shadow-lg my-auto mx-auto py-16 px-8 text-center">
        <h3 className="text-2xl font-bold">Welcome to StreamPay</h3>
        <p className="text-xl my-6">Connect your Crypto Wallet to continue</p>
        <WalletMultiButton className="m-auto" />
      </div>
    </div>
  );
};

export default Login;
