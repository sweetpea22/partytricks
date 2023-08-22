import Image from 'next/image';
import { Inter } from 'next/font/google';
import '@rainbow-me/rainbowkit/styles.css';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import Landing from '@/components/Landing';
import Create from '@/components/Create';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Create />
      </Layout>
    </>
  );
};

export default Home;
