# Supply-Chain-Transparency-System-SIH
This is a repository chronicling all work on the Blockchain-based Supply Chain Transparency System for Agricultural Produce developed for Smart India Hackathon 2025

Remix - https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null

MetaMask - https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en

Ethereum Sepolia Faucet - https://cloud.google.com/application/web3/faucet/ethereum/sepolia

Remix IDE (online) → Write & deploy smart contracts in Solidity (no setup needed).

MetaMask wallet → Acts like your notebook identity. It stores test coins and signs transactions.

# Go to Deploy & Run Transactions tab → Environment: JavaScript VM.
Click Deploy. The contract appears under Deployed Contracts.

Use the UI buttons that Remix generates to call createBatch, transferBatch, getHistory and verify returned values.

# In MetaMask, switch to the desired testnet:
Sepolia or Polygon Mumbai are common choices.

# Get test tokens (faucet)
Copy your MetaMask account address (Account → click address).

Search for “[Sepolia faucet]” or “[Mumbai faucet]” in your browser, open a faucet site, paste your address and request test ETH or MATIC.

# Deploy via Remix + MetaMask
In Remix → Deploy & Run Transactions → Environment: Injected Web3 (this connects Remix to MetaMask).

Select your account (MetaMask will prompt connection).

Make sure MetaMask is set to the same testnet (Sepolia/Mumbai).

Click Deploy — confirm the transaction in MetaMask.

After mining, copy the Deployed Contract Address (you’ll need it in frontend).

In Solidity Compiler → click Compilation Details → copy the ABI (long JSON array). You will paste this into the frontend



