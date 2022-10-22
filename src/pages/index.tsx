import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";

const Index: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>StreamPay</title>
        <meta name="description" content="StreamPay" />
      </Head>
      <main>
        <Header />
        <Login />
      </main>
    </div>
  );
};

export default Index;
