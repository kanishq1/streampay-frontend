import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PayPage: NextPage = () => {
  const [linkDetails, setLinkDetails] = useState<any>();
  const router = useRouter();
  const { pid } = router.query;

  const getLinkDetails = async () => {
    let { data } = await axios.get(`http://localhost:4001/link/${pid}`);
    setLinkDetails(data.link);
    return data.link;
  };

  const startStream = ()=>{}

  useEffect(() => {
    getLinkDetails();
  }, [pid]);

  return <>{JSON.stringify(linkDetails)}</>;
};

export default PayPage;
