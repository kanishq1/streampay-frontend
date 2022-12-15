import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import moment from "moment";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { backend_url } from "../../config";

const RequestForm = () => {
  moment().local();
  const { publicKey } = useWallet();
  const [linkCopied, showLinkCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkDetails, setLinkDetails] = useState<any>();
  const [formData, setFormData] = useState<any>({
    release_frequency: 1,
    amount_per_period: 1,
    token: "SOL",
    start_date: moment().format("YYYY-MM-DD"),
    start_time: moment().add(5, "minutes").format("HH:mm"),
  });
  const [host, setHost] = useState<string>("");
  const freqOptions = [
    { option: "second", value: 1 },
    { option: "minute", value: 60 },
    { option: "hour", value: 3600 },
    { option: "day", value: 86400 },
    { option: "week", value: 604800 },
    { option: "month", value: 18144000 },
    { option: "year", value: 6622560000 },
  ];
  const concelOptions = {};
  const tokenOptins = [
    { name: "USDC", value: "USDC" },
    { name: "SOL", value: "SOL", default: true },
  ];
  useEffect(() => {
    setHost(window.location.origin);

    if (publicKey) {
      // console.log(publicKey.toString());
    }
  }, [publicKey]);

  const getUnixTime = (date: any, time: any) => {
    console.log(formData.start_date, formData.start_time);

    let start = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss").unix();
    return start;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // handle mint address, time check, other params

    let start = getUnixTime(formData.start_date, formData.start_time);

    formData.start = start;
    formData.recipient_wallet = publicKey?.toBase58();

    let { data } = await axios({
      method: "POST",
      url: `${backend_url}/api/link`,
      data: formData,
    });

    setLinkDetails(data.link);
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const amtPerUnitTime = () => {
    if (formData?.amount_per_period) return formData?.amount_per_period;
    else return "___";
  };

  const releasingUnit = () => {
    if (formData?.release_frequency)
      return freqOptions.find((o) => o.value == formData?.release_frequency)
        ?.option;
    else return "___";
  };

  const copyLink = () => {
    showLinkCopied(true);
    setTimeout(() => {
      showLinkCopied(false);
    }, 2000);
    navigator.clipboard.writeText(`${host}/pay/${linkDetails.link_code}`);
  };

  return (
    <div className="mx-16 mt-8 flex justify-between">
      {!linkDetails?.title && (
        <>
          <div className="w-[55%]">
            <h3 className="mb-4 ml-2 text-white text-2xl font-semibold">
              Create payable link
            </h3>
            <form onSubmit={handleFormSubmit} className="request-form">
              <div className="bg-glass-blue grid grid-cols-12 gap-x-4 gap-y-6 rounded-lg px-12 py-10">
                <div className="col-span-12 flex flex-col">
                  <label>Title</label>
                  <input
                    onChange={handleInputChange}
                    name="title"
                    className="rounded input h-10 input-bordered"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-7 flex flex-col">
                  <label>Token</label>
                  <select
                    onChange={handleInputChange}
                    name="token"
                    className="rounded input h-10 input-bordered"
                    required
                  >
                    {tokenOptins.map((i) => (
                      <option key={i.name} value={i.value} selected={i.default}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 flex flex-col">
                  <label>Amount</label>
                  <input
                    onChange={handleInputChange}
                    name="amount"
                    className="rounded input h-10 input-bordered"
                    type="number"
                    step="0.0001"
                    required
                    min={0}
                  />
                </div>
                <div className="col-span-6 flex flex-col">
                  <label>Release Frequency</label>
                  <div className="inline-flex justify-between">
                    <input
                      onChange={handleInputChange}
                      name="amount_per_period"
                      className="rounded input h-10 input-bordered w-[48%]"
                      type="number"
                      defaultValue={1}
                      step="0.0000001"
                    />
                    <select
                      onChange={handleInputChange}
                      name="release_frequency"
                      className="rounded input h-10 input-bordered w-[48%]"
                    >
                      {freqOptions.map((i) => (
                        <option key={i.option} value={i.value}>
                          / {i.option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-6 flex flex-col">
                  <label>Start Date</label>
                  <input
                    onChange={handleInputChange}
                    name="start_date"
                    className="rounded input h-10 input-bordered"
                    type="date"
                    min={moment().format("YYYY-MM-DD")}
                    defaultValue={moment().format("YYYY-MM-DD")}
                  />
                </div>
                <div className="col-span-6 flex flex-col">
                  <label>Start Time</label>
                  <input
                    onChange={handleInputChange}
                    name="start_time"
                    className="rounded input h-10 input-bordered"
                    type="time"
                    defaultValue={moment().add(5, "minutes").format("HH:mm")}
                  />
                </div>
                <div className="col-span-12 flex flex-col">
                  <label>
                    Email{" "}
                    <span className="text-sm text-gray-400">(optional)</span>
                  </label>
                  <input
                    onChange={handleInputChange}
                    name="payer"
                    className="rounded input h-10 input-bordered"
                    type="email"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-info bg-[#18A2D9] text-white mt-2"
                disabled={loading}
              >
                {loading && <span className="loader h-5 w-5 mr-2"></span>}
                Request Streaming Payment
              </button>
            </form>
          </div>
          <div className="mt-auto mb-16 w-[40%]">
            <p className="bg-glass-blue p-4 rounded-lg">
              Stream will start on{" "}
              <strong>
                {formData?.start_date ? formData.start_date : "___"} at{" "}
                {formData?.start_time ? formData.start_time : "___"}
              </strong>
              . <strong>{amtPerUnitTime()}</strong>{" "}
              {formData?.token ? formData.token : "___"} released every{" "}
              <strong>{releasingUnit()}</strong>.
            </p>
            <p className="bg-glass-blue mt-10 p-4 rounded-lg">
              Streamflow charges 0.25% service fee ({" "}
              <strong>
                {formData?.amount ? formData?.amount * 0.0025 : 0}{" "}
                {formData?.token ? formData.token : "___"} )
              </strong>{" "}
              on top of the specified amount, while respecting the given
              schedule.
            </p>
          </div>
        </>
      )}
      {linkDetails?.title && (
        <div className="w-full">
          <h3 className="mb-8 mt-10 text-2xl font-semibold text-white">
            Link Created, Share link to the payer!
          </h3>
          <div>
            <h4 className="text-xl font-medium mb-5">Payment Details:</h4>
            <p className="my-2">
              <span className="opacity-70">Recipient Wallet:</span>
              <span className="font-semibold ml-2">
                {publicKey?.toBase58()}
              </span>
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
                Once Payer approve stream will start at:
              </span>
              <span className="font-semibold ml-2">
                {moment
                  .unix(linkDetails.start)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </span>
            </p>
          </div>
          <div className="my-8 relative">
            {linkCopied && (
              <div className="p-2 absolute rounded-lg -top-3 bg-gray-700">
                Link Copied
              </div>
            )}
            <p className="font-medium text-lg mb-2">Copy and share the link!</p>
            <button
              className="bg-glass-blue py-2 px-4 rounded-md"
              onClick={copyLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 inline mr-2 align-text-bottom hover:opacity-60 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              {host}/pay/{linkDetails.link_code}
            </button>
          </div>
          <div>
            <button
              onClick={() => setLinkDetails({})}
              className="btn btn-outline"
            >
              Create new payment link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
