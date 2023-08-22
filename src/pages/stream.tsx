import Image from 'next/image';
import { Inter } from 'next/font/google';
import '@rainbow-me/rainbowkit/styles.css';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import Stream from '@/components/Stream';
const inter = Inter({ subsets: ['latin'] });

const StreamPage: NextPage = () => {
  return (
    <>
      <Layout>
        <Stream />
      </Layout>
    </>
  );
};

export default StreamPage;
