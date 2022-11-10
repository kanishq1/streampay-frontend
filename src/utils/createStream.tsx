import { useWallet } from "@solana/wallet-adapter-react";
import { BN, Cluster, getBN, StreamClient } from "@streamflow/stream";
import { Wallet } from "@project-serum/anchor";

const sc = new StreamClient(
  "https://api.devnet.solana.com",
  Cluster.Devnet,
  "confirmed"
);

const tokenList = {
  USDC: { mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr", decimal: 6 },
  SOL: { mint: "So11111111111111111111111111111111111111112", decimal: 9 },
};

const createStreamPayment = async (wallet: Wallet, streamDetails: any) => {
  let token: string = streamDetails.token;
  let decimal = (tokenList as any)[token].decimal;
  let mint = (tokenList as any)[token].mint;
  try {
    const createStreamParams = {
      sender: wallet,
      recipient: streamDetails.recipient,
      mint: mint,
      start: streamDetails.start,
      depositedAmount: getBN(streamDetails.amount, decimal),
      period: streamDetails.release_frequency,
      cliff: streamDetails.start,
      cliffAmount: new BN(0),
      amountPerPeriod: getBN(streamDetails.amount_per_period, decimal),
      name: streamDetails.title,
      canTopup: false,
      cancelableBySender: false,
      cancelableByRecipient: false,
      transferableBySender: false,
      transferableByRecipient: false,
      automaticWithdrawal: false,
    };
    const { ixs, tx, metadata } = await sc.create(createStreamParams);
    console.log({ ixs, tx, metadata });
    return { ixs, tx, metadata };
  } catch (exception) {
    return exception;
  }
};

export default createStreamPayment;

// USDC:Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr
// Sol: So11111111111111111111111111111111111111112
