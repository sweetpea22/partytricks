import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, baseGoerli, avalancheFuji } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'e3663f0003d810dcbaf4851d2a9f2554'

const { chains, publicClient, webSocketPublicClient } = configureChains(

  [goerli, baseGoerli, avalancheFuji],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'PartyTricks',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains, publicClient }
