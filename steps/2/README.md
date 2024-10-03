# Lets PAPI this...!

Now that our project is ready, we can init the setup for polkadot api.
I, very much, propose once again to have a look on [Polkadot API's documentation (https://papi.how)](https://papi.how), but in case, you either prefer this format, or you have been there and are back, then let's go for it. :)

## PAPI installation

Of course we need, first of all, to add the `polkadot-api` dependency in our project.
Lets do that by running:

```shell
$ bun install polkadot-api
```

That’s it! The installation is all set.

Ready for the next step? We’ll be configuring PAPI.

But before we dive in, it’s important to get a basic understanding of how PAPI works.

## What our examples will be

Throughout this tutorial, we'll explore the following Polkadot API (PAPI) use cases for connecting to the network:

1. **Connecting to the Polkadot Relay Chain:** We’ll start by using a WsProvider provided by PAPI to create a client that connects to the Polkadot relay chain's RPC server. We’ll then log the finalized block number and hash as they are produced.
2. **Connecting to the People Parachain:** Next, we’ll apply a similar approach to create a client that connects to the RPC server of the People system parachain. Here, we’ll log specific information from an account’s address.
3. **Multi-Chain Connection:** Then, we’ll set up a multi-chain connection to retrieve information from both the People and Collective system chains.
   (...upcoming...)
4. **Using the Smoldot Provider:** Finally, we’ll repeat all of the above steps using the Smoldot provider that PAPI includes, allowing us to see how it compares with the WsProvider.

You might be wondering why I’m bringing this up at this point. Here’s why:

To properly configure each project with the Polkadot API, it's important to know which chains we’ll be interacting with upfront. This allows us to set everything up correctly from the start.

While it’s certainly possible to add new chains later if needed, for the sake of this tutorial, we’ll configure everything in advance.
This approach keeps things organized and helps ensure a smoother workflow.

Given the steps we’ll be taking, we’ll need to configure three different chains:

- The `polkadot` relay chain
- The `people` system parachain and
- The `collectives` parachain

## Configuring Polkadot API

Polkadot API comes with a handy bundle of chainspecs for both [`well-known-chains` and `system-chains`](https://github.com/polkadot-api/polkadot-api/tree/main/packages/known-chains) to make your life easier.

This means you don’t have to worry about finding endpoints for fetching metadata or chainspecs (which are needed for the light client). All of this is bundled right into PAPI.

As we move forward, you’ll see just how helpful this can be in simplifying the setup process.

In the next step, we will find out more details about PAPI's code generation and "adding chains" functionality.
