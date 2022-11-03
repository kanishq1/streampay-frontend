import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import PayDetails from "../../components/PayDetails";
import Topbar from "../../components/Topbar";

const PayPage: NextPage = () => {
  const [linkDetails, setLinkDetails] = useState<any>();
  const [recipient, setRecipient] = useState<any>();
  const router = useRouter();
  const { pid } = router.query;

  const getLinkDetails = async () => {
    let { data } = await axios.get(`http://localhost:4001/api/link/${pid}`);
    setLinkDetails(data.link);
    setRecipient(data.recipient.wallet_addr);

    return data.link;
  };

  useEffect(() => {
    getLinkDetails();
  }, [pid]);

  return (
    <>
      <div className="grid grid-col-sidebar">
        <Head>
          <title>StreamPay</title>
          <meta name="description" content="StreamPay" />
        </Head>
        <Sidebar />
        <main className="flex-grow">
          <Topbar />
          {linkDetails && recipient && (
            <PayDetails linkDetails={linkDetails} recipient={recipient} />
          )}
        </main>
      </div>
    </>
  );
};

export default PayPage;
