import { useWallet } from "@solana/wallet-adapter-react";
import { BN, Cluster, getBN, StreamClient } from "@streamflow/stream";
import { Wallet } from "@project-serum/anchor";

const sc = new StreamClient(
  "https://api.devnet.solana.com",
  Cluster.Devnet,
  "confirmed"
);

const createStreamPayment = async (wallet: Wallet, streamDetails: any) => {
  try {
    let recipentWallet = "2aBzSoD1PWwGnubo4CS1veGcbyDZazWhrKHUKAFpbsm2";

    const createStreamParams = {
      sender: wallet,
      recipient: recipentWallet,
      mint: "So11111111111111111111111111111111111111112",
      start: 1667491749,
      depositedAmount: getBN(0.1, 9),
      period: 999,
      cliff: 1667491749,
      cliffAmount: new BN(0),
      amountPerPeriod: getBN(0.000001, 9),
      name: "Transfer to Jane Doe",
      canTopup: false,
      cancelableBySender: false,
      cancelableByRecipient: false,
      transferableBySender: false,
      transferableByRecipient: false,
      automaticWithdrawal: false,
    };
    const { ixs, tx, metadata } = await sc.create(createStreamParams);
    console.log({ ixs, tx, metadata });
  } catch (exception) {
    console.log(exception);
  }
};

export default createStreamPayment;
