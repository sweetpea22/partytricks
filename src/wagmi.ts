import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, baseGoerli, avalancheFuji } from 'wagmi/chains'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '';
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || "";

const { chains, publicClient } = configureChains(

  [goerli, baseGoerli, avalancheFuji],
  [infuraProvider({ apiKey: INFURA_API_KEY }),  publicProvider(), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'PartyTricks',
  chains,
  projectId: 'e3663f0003d810dcbaf4851d2a9f2554'
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export { chains, publicClient }
