import Timeline from './Timeline';
import Link from 'next/link';
import OtherStreams from './OtherStreams';

const Landing: React.FC = () => {
  return (
    <main className='-mt-24 pb-8'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='sr-only'>Partytricks</h1>
        {/* Main 3 column grid */}
        <div className='grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8'>
          {/* Left column */}
          <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
            <section aria-labelledby='section-1-title'>
              <h2 className='sr-only' id='section-1-title'>
                DAO games, cross-chain.
              </h2>
              <div className='overflow-hidden rounded-lg bg-[#c2f542] shadow'>
                <div className='flex'>
                  <div className='p-6 mt-5'>
                    <h1 className='text-md text-black'>Currently On:</h1>
                    <h1 className='text-2xl text-black'>
                      Split or Steal: snailDAO
                    </h1>
                    <p className='my-1 italic text-lg text-gray-600'>
                      Voting period left: 1400 blocks (30 minutes)
                    </p>
                    <Link
                      href='/stream'
                      type='button'
                      className='relative flex-shrink-0 p-4 rounded-full text-lg bg-indigo-700 text-indigo-100 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white'>
                      Watch snippet
                    </Link>
                  </div>
                  <img className='w-[300px] h-auto' src='/img.png' />
                </div>
              </div>
              <div className='overflow-hidden rounded-lg bg-white shadow'>
                <div className='p-6 mt-5'>
                  <h1 className='text-2xl text-black'>Upcoming Games</h1>
                  <p className='my-1 text-lg text-gray-600'>
                    Play against other DAOs, meet other players, bet on games,
                    and more.
                  </p>
                  <OtherStreams />
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className='grid grid-cols-1 gap-4'>
            <section aria-labelledby='section-2-title'>
              <h2 className='sr-only' id='section-2-title'>
                Current stream
              </h2>
              <div className='overflow-hidden rounded-lg bg-white shadow'>
                <div className='p-6'>
                  <Timeline />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
