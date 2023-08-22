import Link from 'next/link';
import Modal from './Modal';
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Create() {
  return (
    <>
      <div className='min-h-full'>
        <div className='bg-indigo-600'>
          <header className='py-1'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                Create a Partytrick - admin panel
              </h1>

              <h1 className='py-2 text-xl text-gray-300'>
                Deposit the prize and use Partytrick`&apos;`s game rails for
                payouts and voting.
              </h1>
            </div>
          </header>
        </div>

        <main className=' bg-white min-h-[50vh]'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
            <div className='py-4'>
              <h1 className='py-3 text-black text-2xl'>
                Deposit prize into smart contract (accepting Base Goerli,
                Goerli, Testnet AVAX)
              </h1>
              <button className='relative flex-shrink-0 p-4 rounded-full text-lg bg-indigo-700 text-indigo-100 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white'>
                Deposit Prize
              </button>
            </div>
            <div className='py-4'>
              <h1 className='py-3 text-black text-2xl'>Add winner</h1>
              <button className='relative flex-shrink-0 p-4 rounded-full text-lg bg-indigo-700 text-indigo-100 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white'>
                Resolve Game
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
