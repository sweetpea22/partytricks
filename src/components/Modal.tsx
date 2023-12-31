import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

<svg
  xmlns='http://www.w3.org/2000/svg'
  fill='none'
  viewBox='0 0 24 24'
  strokeWidth={1.5}
  stroke='currentColor'
  className='w-6 h-6'>
  <path
    strokeLinecap='round'
    strokeLinejoin='round'
    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
  />
</svg>;

// web3
import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { parseEther } from 'viem';

const voteabi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gateway_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'gasService_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotApprovedByGateway',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'commandId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'sourceChain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceAddress',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'commandId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'sourceChain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceAddress',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
      {
        internalType: 'string',
        name: 'tokenSymbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'executeWithToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gasService',
    outputs: [
      {
        internalType: 'contract IAxelarGasService',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gateway',
    outputs: [
      {
        internalType: 'contract IAxelarGateway',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'destinationChain',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'destinationAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'message_',
        type: 'string',
      },
    ],
    name: 'sendVote',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

export default function Modal() {
  const [open, setOpen] = useState(true);
  const [voteWay, setVoteWay] = useState('1');
  const cancelButtonRef = useRef(null);
  const { chain, chains } = useNetwork();
  const votableChains = {
    '84531': {
      name: 'base',
      address: '0x494FEa3d76C4bA2E3A41746bc3c4f2cF791B835d',
    },
    '43113': {
      name: 'Avalanche',
      address: '0x494FEa3d76C4bA2E3A41746bc3c4f2cF791B835d',
    },
  };

  const currentChainId = chain?.id || '84531';

  // submit all votes from any EVM chain back to goerli
  const {
    config: prepareVote,
    error: prepareErrorYesVote,
    isError: isPrepareErrorYesVote,
  } = usePrepareContractWrite({
    chainId: chain?.id || 84531,
    address:
      //@ts-ignore
      '0x494FEa3d76C4bA2E3A41746bc3c4f2cF791B835d',
    abi: voteabi,
    functionName: 'sendVote',
    args: ['ethereum-2', '0xCf3D8765581fD0554Fb8e6993626f08076453Ef7', voteWay],
    value: parseEther('0.5'),
  });
  console.log(currentChainId);

  const { isLoading, isSuccess, write } = useContractWrite(prepareVote);

  const handleYesClick = (e: any) => {
    e.preventDefault();
    setVoteWay('1');
    write?.();
  };

  const handleNoClick = (e: any) => {
    e.preventDefault();
    setVoteWay('2');
    write?.();
  };

  //vote no

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-left sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <CheckIcon
                      className='h-6 w-6 text-green-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900'>
                      Vote Split or Steal?
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-md text-gray-500'>
                        Proposal Id: 3171...4166
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <button
                    type='button'
                    className={`${
                      isLoading ? 'bg-indigo-300' : 'bg-indigo-600'
                    } inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2`}
                    //@ts-ignore
                    onClick={handleYesClick}>
                    Vote that they&apos;ll split
                  </button>
                  <button
                    type='button'
                    className={`${
                      isLoading ? 'text-gray-500' : 'text-gray-900'
                    } mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0`}
                    onClick={handleNoClick}
                    ref={cancelButtonRef}>
                    {isLoading && (
                      <span>
                        {' '}
                        <ArrowPathIcon className='animate-spin text-indigo-400 h-5 w-5 mr-3' />
                      </span>
                    )}
                    Vote that they&apos;ll steal
                  </button>
                </div>
                (
                {isLoading && (
                  <p className='text-center text-black text-lg'>
                    Transaction submitted, please check{' '}
                    <a
                      href='https://testnet.axelarscan.io/gmp/search'
                      className='font-bold text-md text-indigo-600'></a>
                    AxelarScan!
                  </p>
                )}
                )
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
