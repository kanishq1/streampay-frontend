import moment from "moment";
import { Wallet } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormEvent, useState } from "react";
import createStreamPayment from "../utils/createStream";

interface PayDetailProps {
  recipient?: string;
  linkDetails?: any;
}

const PayDetails = ({ recipient, linkDetails }: PayDetailProps) => {
  const [txSig, setTxSig] = useState("");

  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  let wallet = { publicKey, signTransaction, signAllTransactions };

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    await createStreamPayment(wallet as Wallet, "");
  };

  return (
    <div className="w-full px-8 py-4">
      <h3 className="mb-6 mt-4 text-2xl font-semibold">
        Review Payment Details:
      </h3>
      <div>
        <p className="my-2">
          <strong>Recipient Wallet: </strong>
          <span className="opacity-70">{recipient}</span>
        </p>
        <p className="my-2">
          <strong>Title: </strong>
          <span className="opacity-70">{linkDetails.title}</span>
        </p>
        <p className="my-2">
          <strong>Amount: </strong>
          <span className="opacity-70">
            {linkDetails.amount} {linkDetails.token}
          </span>
        </p>
        <p className="my-2">
          <strong>Payer: </strong>
          <span className="opacity-70">{linkDetails.payer}</span>
        </p>
        <p className="my-2">
          <strong>Once you approve stream will start at: </strong>
          <span className="opacity-70">
            {moment
              .unix(linkDetails.start)
              .format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </span>
        </p>
      </div>
      <div className="mt-8">
        <button onClick={handleRequest} className="btn btn-outline">
          Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default PayDetails;
