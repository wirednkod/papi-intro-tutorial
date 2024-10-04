# Remote Procedure Call (RPC) endpoints

In the Polkadot ecosystem, RPC endpoints are crucial for allowing external applications, wallets, dApps, and nodes to interact with the blockchain. These endpoints provide access to the chain's functionality and data, enabling developers to query the network, submit transactions, and more. Here's an overview of what RPC endpoints are and how they function in Polkadot.

An RPC endpoint is a URL or connection point that an application or client uses to communicate with a blockchain node. In Polkadot, RPC endpoints are generally provided by public nodes, allowing developers to interact with the blockchain without running their own full node. These endpoints offer access to the chain’s infomration such as:

1. Blockchain state (e.g., balances, storage)
2. Runtime calls (e.g., transaction submission, governance voting)
3. Block and transaction data (e.g., querying block heights, block hashes)
4. Network data (e.g., peer information, sync status)
   etc...

In a previous step, we covered how to set up a `provider` and initialize the `client`, giving us a connection to the Polkadot network. We also introduced the `PolkadotClient` interface, which serves as the high-level API for interacting with the network through polkadot-api.

Now, we’ll focus on two key methods from this interface that we’ll use in the upcoming steps:

- **`getChainSpecData`**: This method retrieves the chain specification data, providing essential information about the network's configuration. **IMPORTANT NOTE:** This method is used in this tutorial, but it should not be used in production apps. Reason is that chain information is not standarized on-chain yet ([RFC-8 should be implemented](https://github.com/polkadot-fellows/RFCs/blob/main/text/0008-parachain-bootnodes-dht.md) for this to happen). So as a heads up you may use this here but do NOT use in real dApps.
- **`getFinalizedBlock`**: This allows us to fetch the latest finalized block, which is useful for ensuring we're working with the most stable and confirmed state of the blockchain.

Try to log the `polkadotClient` for this step in order to see these methods as output.
