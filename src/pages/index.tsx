import Image from 'next/image'
import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  return <Layout />;
};

export default Home