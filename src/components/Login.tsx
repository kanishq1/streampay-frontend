import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { backend_url } from "../../config";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await axios.post(`${backend_url}/api/login`, {
        wallet_addr: publicKey?.toString(),
      });
      if (router.query.redirect) {
        router.push(router.query.redirect as any);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (publicKey && connected) login();
  }, [publicKey, connected]);

  return (
    <div className="login min-h-screen flex">
      <div className="rounded-lg bg-[#404f5c91] shadow-lg my-auto mx-auto py-16 px-8 text-center">
        <h3 className="text-2xl font-bold">Welcome to StreamPay</h3>
        <p className="text-xl my-6">Connect your Crypto Wallet to continue</p>
        <WalletMultiButton className="m-auto" />
      </div>
      {loading && (
        <div className="h-screen w-screen flex justify-center items-center absolute bg-gray-500 bg-opacity-70">
          <div className="loader h-10 w-10 !border-4 mr-2"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
