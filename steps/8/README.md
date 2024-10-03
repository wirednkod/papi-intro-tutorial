# Create and Implement the `printChainInfo` Function

Next, we’ll create an async function named `printChainInfo`, which will fetch and display important chain information like the chain’s name and its latest finalized block.

Here’s what we’ll do:

1. **Create the function:** Define an async function named printChainInfo that accepts a client parameter of type PolkadotClient.
2. Fetch the chain specifications: Inside the function, use the client.getChainSpecData() method to retrieve the chain’s specification. Don’t forget to await the result and store it in a constant named chainSpec.
3. **Fetch the latest finalized block:** Next, call the `client.getFinalizedBlock()` method to get the most recently finalized block. Again, await the result and store it in a constant called finalizedBlock.
4. **Print the data:** Finally, log the chain’s name (chainSpec.name) and the finalized block number (finalizedBlock.number) in a user-friendly message.
