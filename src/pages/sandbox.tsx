import {
  useAccount,
  usePrepareSendTransaction,
  useContractRead,
  useContractWrite,
  useSendTransaction,
  useWaitForTransaction,
  usePrepareContractWrite,
} from 'wagmi';
import { escrowAbi } from '../contracts/Escrow';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { parseEther } from 'viem';
import { useDebounce } from 'use-debounce';
import { parseGwei } from 'viem';
import { decodeErrorResult } from 'viem';
import Layout from '@/components/Layout';

// 0x041331C96e0736B41937bb60a2AC6fA8846fFdAb escrow on goerli

const escrowabi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newWinner',
        type: 'address',
      },
    ],
    name: 'addWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'escrowAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isSplit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'releasePrize',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'winnerSelected',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'winners',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

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

export default function Sandbox() {
  // const [balance, setBalance] = useState(0);
  // const { data: escrowAmountData } = useContractRead({
  //   chainId: 5,
  //   address: '0x041331C96e0736B41937bb60a2AC6fA8846fFdAb',
  //   abi: escrowAbi.abi,
  //   functionName: 'retrieve',
  //   watch: true,
  // });

  // // get user input
  // const [value, setValue] = useState(0);

  // const [debouncedAmount] = useDebounce(value.toString(), 500);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    chainId: 5,
    address: '0xCf3D8765581fD0554Fb8e6993626f08076453Ef7',
    abi: voteabi,
    functionName: 'sendVote',
    //@ts-ignore
    args: ['base', '0x1BA76698f2aEA8BB1398d5618C69bCE5639F8909', '1'],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  // const { data, sendTransaction } = useSendTransaction(config);

  // const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    write?.();
  };

  // useEffect(() => {
  //   const hexData = Object.values(escrowAmountData as bigint)[0];
  //   const parsedHexData = parseInt(hexData, 16);
  //   setBalance(parsedHexData);
  // });

  return (
    <>
      <Layout>
        {/* <h1>Hello world</h1>
        <h1>{balance}</h1>
        <input
          placeholder='0.05'
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className='text-black'></input> */}
        <button onClick={() => handleSubmit}>Send to contract</button>
        {/* {isSuccess && (
          <p>
            Successfully sent
            <a
              href={`https://goerli.etherscan.io/tx/${data?.hash}`}
              target='__blank'>
              explorer
            </a>{' '}
          </p>
        )} */}

        {/* {(isPrepareError || isError) && (
          <p>Error: {(prepareError || error)?.message}</p>
        )} */}
      </Layout>
    </>
  );
}
