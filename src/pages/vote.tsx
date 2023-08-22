import Image from 'next/image';
import { Inter } from 'next/font/google';
import '@rainbow-me/rainbowkit/styles.css';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import StreamWithModal from '@/components/StreamWithModal';
const inter = Inter({ subsets: ['latin'] });

const VotePage: NextPage = () => {
  return (
    <>
      <Layout>
        <StreamWithModal />
      </Layout>
    </>
  );
};

export default VotePage;
