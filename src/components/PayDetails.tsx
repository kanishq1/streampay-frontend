import moment from "moment";
import { Wallet } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormEvent, useEffect, useState } from "react";
import createStreamPayment from "../utils/createStream";
import { backend_url } from "../../config";
import axios from "axios";

interface PayDetailProps {
  recipient?: string;
  linkDetails?: any;
}

const PayDetails = ({ recipient, linkDetails }: PayDetailProps) => {
  const [txSig, setTxSig] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  let wallet = { publicKey, signTransaction, signAllTransactions };

  const handleRequest = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      let streamData: any = await createStreamPayment(wallet as Wallet, {
        ...linkDetails,
        recipient,
      });
      if (!streamData.tx) return setErr(true);
      setTxSig(streamData?.tx);
      setSuccess(true);
      setLoading(false);
      await axios({
        method: "PUT",
        url: `${backend_url}/api/link/${linkDetails.link_code}`,
        data: { status: "PAID" },
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="w-full px-8 py-4">
      {!sucess ? (
        <>
          <h3 className="mb-6 mt-4 text-2xl font-semibold">
            Review Payment Details:
          </h3>
          <div>
            <p className="my-2">
              <span className="opacity-70">Recipient Wallet:</span>
              <span className="font-semibold ml-2">{recipient}</span>
            </p>
            <p className="my-2">
              <span className="opacity-70">Title:</span>
              <span className="font-semibold ml-2">{linkDetails.title}</span>
            </p>
            <p className="my-2">
              <span className="opacity-70">Amount:</span>
              <span className="font-semibold ml-2">
                {linkDetails.amount} {linkDetails.token}
              </span>
            </p>
            {linkDetails.payer && (
              <p className="my-2">
                <span className="opacity-70">Payer:</span>
                <span className="font-semibold ml-2">{linkDetails.payer}</span>
              </p>
            )}
            <p className="my-2">
              <span className="opacity-70">
                Once you approve stream will start at:
              </span>
              <span className="font-semibold ml-2">
                {moment
                  .unix(linkDetails.start)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </span>
            </p>
          </div>
          {linkDetails.status == "PENDING" ? (
            <div className="mt-8">
              <button
                disabled={loading}
                onClick={handleRequest}
                className="btn btn-outline"
              >
                {loading && <span className="loader h-5 w-5 mr-2"></span>}
                Confirm and Pay
              </button>
            </div>
          ) : (
            <h3 className="mb-6 mt-6 text-xl font-semibold italic text-gray-500">
              Payment Stream Already Created
            </h3>
          )}
        </>
      ) : !err ? (
        <>
          <h3 className="mb-6 mt-20 text-2xl font-semibold text-green-500">
            Payment Stream Created 🎉
          </h3>
          <a
            className="ext-link btn btn-outline"
            target={"_blank"}
            rel="noopener noreferrer"
            href={`https://solana.fm/tx/${txSig}?cluster=devnet-qn1`}
          >
            View transaction on SolanaFM
          </a>
          <br />
          <p className="mt-4">
            You can also view stream details on{" "}
            <a
              className="ext-link underline"
              href="https://app.streamflow.finance/all-streams"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              Streamflow App
            </a>
          </p>
        </>
      ) : (
        <h3 className="mb-6 mt-20 text-2xl font-semibold text-red-500">
          Something went wrong :\
        </h3>
      )}
    </div>
  );
};

export default PayDetails;
