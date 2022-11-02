import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Wallet } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";
import { BN, Cluster, getBN, StreamClient } from "@streamflow/stream";
import { FC, FormEvent } from "react";

const PayPage: NextPage = () => {
  const [linkDetails, setLinkDetails] = useState<any>();
  const router = useRouter();
  const { pid } = router.query;
  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const sc = new StreamClient(
    "https://api.devnet.solana.com",
    Cluster.Devnet,
    "confirmed"
  );
  const keyPair = new Keypair();

  let wallet = { publicKey, signTransaction, signAllTransactions };
  let recipentWallet = "EbtVF5YAcQoMPsd9QxDx5Nu7mFphmgj2FT29JWGvsm2G";

  const createStreamParams = {
    sender: wallet as Wallet,
    recipient: recipentWallet, // Solana recipient address.
    mint: "Gssm3vfi8s65R31SBdmQRq6cKeYojGgup7whkw4VCiQj", // SPL Token mint.
    start: 1667404967, // Timestamp (in seconds) when the stream/token vesting starts.
    depositedAmount: getBN(10, 9), // depositing 100 tokens with 9 decimals mint.
    period: 1, // Time step (period) in seconds per which the unlocking occurs.
    cliff: 1667404967, // Vesting contract "cliff" timestamp in seconds.
    cliffAmount: new BN(0), // Amount unlocked at the "cliff" timestamp.
    amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
    name: "Transfer to Jane Doe.", // The stream name or subject.
    canTopup: false, // setting to FALSE will effectively create a vesting contract.
    cancelableBySender: true, // Whether or not sender can cancel the stream.
    cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
    transferableBySender: true, // Whether or not sender can transfer the stream.
    transferableByRecipient: false, // Whether or not recipient can transfer the stream.
    automaticWithdrawal: false, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
  };

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    console.log("here");
    try {
      const { ixs, tx, metadata } = await sc.create(createStreamParams);
      console.log({ ixs, tx, metadata });
    } catch (exception) {
      console.log(exception);
    }
  };

  const getLinkDetails = async () => {
    let { data } = await axios.get(`http://localhost:4001/api/link/${pid}`);
    setLinkDetails(data.link);
    return data.link;
  };

  const startStream = () => {};

  useEffect(() => {
    getLinkDetails();
  }, [pid]);

  return (
    <>
      <div>
        {publicKey ? (
          <form onSubmit={handleRequest}>
            <button type="submit">Test</button>
          </form>
        ) : (
          <span>Connect Your Wallet</span>
        )}
        {txSig ? (
          <div>
            <p>View your transaction on </p>
            <a href={link()}>Solana Explorer</a>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PayPage;
