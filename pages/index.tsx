import type { NextPage } from "next";
import { Login } from "../components/Login";
import 'antd/dist/antd.css';

const Home: NextPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default Home;
