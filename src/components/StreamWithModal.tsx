import Link from 'next/link';
import Modal from './Modal';
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Stream() {
  return (
    <>
      <div className='min-h-full'>
        <div className='bg-indigo-600'>
          <header className='py-1'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                Split Or Steal: snailDAO
              </h1>

              <h1 className='py-2 text-xl text-gray-300'>
                Watch the members of snailDAO compete for a prize in a classic
                prisoner's dilemma game.
              </h1>
            </div>
          </header>
        </div>

        <main className=' bg-black min-h-[50vh]'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
            <h1 className='py-6 text-xl font-md text-white'>
              Will they split the prize, or will they both steal? Who is telling
              the truth? Vote and then find out the results after voting period
              is over.
            </h1>
            <div className='flex'>
              {/* <div className='flex flex-col'> */}
              <video loop controls className='max-w-[60%]'>
                <source src='/video-1.mp4' type='video/mp4' />
              </video>
              {/* </div> */}
              <div className='p-2'>
                <Link
                  href='/vote'
                  type='button'
                  className='relative flex-shrink-0 p-4 rounded-full text-lg bg-indigo-700 text-indigo-100 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white'>
                  Cast your vote
                </Link>
              </div>
              <Modal />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
