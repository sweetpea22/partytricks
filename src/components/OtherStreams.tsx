const files = [
  {
    title: 'ZK Circuit Break to win',
    creator: 'VeloDAO',
    source:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    title: 'On-chain summer party',
    creator: 'BaseDAO vs Gitcoin',
    source:
      'https://images.unsplash.com/photo-1607805074778-eeb1aafe3641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
  },
  {
    title: 'Intramural Chess Tournament',
    creator: 'FWB',
    source:
      'https://images.unsplash.com/photo-1683645480614-55a5957b6343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    title: 'Split or Steal',
    creator: 'FriendTech',
    source:
      'https://images.unsplash.com/photo-1533237264985-ee62f6d342bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
  },
];

export default function OtherStreams() {
  return (
    <ul
      role='list'
      className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
      {files.map((file) => (
        <li key={file.source} className='relative'>
          <div className='group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100'>
            <img
              src={file.source}
              alt=''
              className='pointer-events-none object-cover group-hover:opacity-75'
            />
            <button
              type='button'
              className='absolute inset-0 focus:outline-none'>
              <span className='sr-only'>View details for {file.title}</span>
            </button>
          </div>
          <p className='pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900'>
            {file.title}
          </p>
          <p className='pointer-events-none block text-sm font-medium text-gray-500'>
            {file.creator}
          </p>
        </li>
      ))}
    </ul>
  );
}
