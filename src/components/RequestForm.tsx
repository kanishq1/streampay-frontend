import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import moment from "moment";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const RequestForm = () => {
  moment().local();
  const { publicKey } = useWallet();
  const [formData, setFormData] = useState<any>();
  const freqOptions = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const concelOptions = {};
  const tokenOptins = {};

  useEffect(() => {
    if (publicKey) {
      // console.log(publicKey.toString());
    }
  }, [publicKey]);

  const getUnixTime = (date: any, time: any) => {
    let start = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm:ss").unix();
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // handle mint address, time check, other params

    let start = getUnixTime(formData.start_date, formData.start_time);
    let relase_frequency = formData.release_frequency;

    console.log(start);
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="request-form">
        <div className="bg-glass-blue grid grid-cols-12 gap-x-4 gap-y-6 rounded-lg w-[50%] px-12 py-10">
          <div className="col-span-12 flex flex-col">
            <label>Title</label>
            <input
              onChange={handleInputChange}
              name="title"
              className="rounded input h-10 input-bordered"
              type="text"
            />
          </div>
          <div className="col-span-7 flex flex-col">
            <label>Token</label>
            <select
              onChange={handleInputChange}
              name="token"
              className="rounded input h-10 input-bordered"
            >
              <option>USDC</option>
              <option>Solana</option>
              <option>Stream</option>
            </select>
          </div>
          <div className="col-span-6 flex flex-col">
            <label>Amount</label>
            <input
              onChange={handleInputChange}
              name="amount"
              className="rounded input h-10 input-bordered"
              type="number"
            />
          </div>
          <div className="col-span-6 flex flex-col">
            <label>Release Frequency</label>
            <div className="inline-flex justify-between">
              <input
                onChange={handleInputChange}
                name="relase_frequency"
                className="rounded input h-10 input-bordered w-[48%]"
                type="number"
              />
              <select
                onChange={handleInputChange}
                name="release_freq_unit"
                className="rounded input h-10 input-bordered w-[48%]"
              >
                {freqOptions.map((i) => (
                  <option key={i} value={i}>
                    / {i}
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
            />
          </div>
          <div className="col-span-6 flex flex-col">
            <label>Start Time</label>
            <input
              onChange={handleInputChange}
              name="start_time"
              className="rounded input h-10 input-bordered"
              type="time"
            />
          </div>
          <div className="col-span-6 flex flex-col">
            <label>Who can cancel?</label>
            <select
              onChange={handleInputChange}
              name="cancelable_by"
              className="rounded input h-10 input-bordered"
            >
              <option>Both</option>
              <option>Only Recipent</option>
              <option>Only Sender</option>
              <option>None</option>
            </select>
          </div>
          {/* <div className="col-span-4 flex flex-col">
          <label>Auto Withdrawal</label>
          <input type="checkbox" className="toggle toggle-accent" />
        </div> */}

          <div className="col-span-12 flex flex-col">
            <label>Email</label>
            <input
              onChange={handleInputChange}
              name="payer"
              className="rounded input h-10 input-bordered"
              type="email"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-info">
          Request Streaming Payment
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
