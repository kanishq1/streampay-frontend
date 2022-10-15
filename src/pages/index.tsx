import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Index: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>StreamPay</title>
        <meta name="description" content="StreamPay" />
      </Head>
      <Header />
    </div>
  );
};

export default Index;
