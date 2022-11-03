import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RequestForm from "../components/RequestForm";
import Sidebar from "../components/Sidebar";

const Dashboard: NextPage = (props) => {
  const router = useRouter();
  const { publicKey, sendTransaction, signTransaction, signAllTransactions } =
    useWallet();

  useEffect(() => {
    // checks if the user is authenticated
    publicKey ? router.push("/dashboard") : router.push("/");
  }, [publicKey]);

  return (
    <div className="grid grid-col-sidebar">
      <Head>
        <title>StreamPay</title>
        <meta name="description" content="StreamPay" />
      </Head>
      <Sidebar />
      <main className="flex-grow">
        <RequestForm />
      </main>
    </div>
  );
};

export default Dashboard;
