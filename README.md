# Partytricks

**Livestreaming meets game theory meets on-chain voting**. Partytricks is a platform that lets DAOs grow their community sustainably by setting up social bonding games at the click of a button.

In this demo, the first party trick is called Split or Steal, a classic game of prisoners dilemma. There is a prize stored in an escrow contract. Contestants on a livestream have to either jointly collaborate to split the prize. If one of the players defects, they get the whole pot. If both of them defect, both players get zero. While the live stream is going, onlookers can vote from any chain to give their best guess at who is telling the truth.

DAOs can use these games to incentivize participation, familiarize new users with web3 UX, and perhaps even gain insight about DAO member behaviours.

This demo uses Axelar's SDK for sending cross-chain data between Ethereum Goerli, Base Goerli and Avalanche Fuji. 
Contracts Deployed on 
Avalanche Fuji: https://testnet.snowtrace.io/address/0x494FEa3d76C4bA2E3A41746bc3c4f2cF791B835d 
Base Goerli: https://goerli.basescan.org/address/0x494FEa3d76C4bA2E3A41746bc3c4f2cF791B835d 
Eth Goerli: https://goerli.etherscan.io/address/0xdc6ffc3f404d9da507735c294f023373079d2b8b

For bounty-specific information, please read through the bounty.md in the root dir. Thank you sponsors!

Potential Next steps: 
- Network effects: Enable UGC - people can submit their own party tricks and share them with the partytrick community
- GameFi: Enable secondary markets and betting to be built.
- Allow inter-DAO tournaments, build team spirit.
- Add cross-chain asset routing that gives a portion back to the contestants. 
- Ballot privacy
- Anonymity for people protecting their identity cross-chain

To run on testnet: 

1. `git clone` this repo. 
2. run `yarn` to install dependencies.
3. run `npm run dev` to start UI. 
4. You'll need the following testnet currencies: Base gETH, AVAX, gETH to interact with contracts.

To run locally: 
Follow steps 1-3. 
1. `yarn hardhat clean`
2. `yarn hardhat node` 
3. In a new tab, `yarn hardhat deploy`
4. Run the scripts like the following: `yarn run scripts/propose.tx --network localhost`. You'll need to make a proposal before voting and queuing. 

