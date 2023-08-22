import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/20/solid';

const timeline = [
  {
    id: 1,
    content: '0x4fFC...649b joined',
    target: 'veloDAO Social Bonding Session #002',
    href: '#',
    date: '1 hour ago',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: '0xVbBe2...7xSr won',
    target: 'Intramural Chess #1',
    href: '#',
    date: '4 hours ago',
    datetime: '2020-09-22',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'ahtuhn.eth opened a bet on',
    target: 'FriendTech Poker',
    href: '#',
    date: '4 hours ago',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'cosmos.eth joined',
    target: 'Assorted on-chain games with SolarDAO',
    href: '#',
    date: '6 hours ago',
    datetime: '2020-09-30',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: '0xWx59...2F2f started',
    target: 'Split Or Steal veloDAO #12',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Timeline() {
  return (
    <div className='flow-root'>
      <ul role='list' className='-mb-8'>
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className='relative pb-8'>
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className='absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex space-x-3'>
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}>
                    <event.icon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </span>
                </div>
                <div className='flex min-w-0 flex-1 justify-between space-x-4 pt-1.5'>
                  <div>
                    <p className='text-sm text-gray-500'>
                      {event.content}{' '}
                      <a
                        href={event.href}
                        className='font-medium text-gray-900'>
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className='whitespace-nowrap text-right text-sm text-gray-500'>
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
