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

### Adding polkadot chain

Lets get going with this and run:

```shell
$ bunx papi add dot -n polkadot
```

> Note: bunx is the equivelent package runner for bun (as npx is for npm).
> You can read [more here](https://bun.sh/docs/cli/bunx).

What happened here?
Using `bunx` we asked (politely) from Polkadot API to fetch for you, in a `dot` "variable", the metadata from (the well-known-chain) `polkadot`.

The outcome of the command should be the following:

```shell
$ bunx papi add dot -n polkadot

✔ Metadata saved as .papi/metadata/dot.scale
Saved new spec "dot"
Reading metadata
CLI Building entry: .papi/descriptors/src/index.ts
CLI Using tsconfig: tsconfig.json
CLI tsup v8.3.0
CLI Target: esnext
CJS Build start
ESM Build start
ESM .papi/descriptors/dist/index.mjs                  9.88 KB
ESM .papi/descriptors/dist/metadataTypes-FYTIEX4M.mjs 146.06 KB
ESM .papi/descriptors/dist/descriptors-BGFWDDEF.mjs   25.73 KB
ESM ⚡️ Build success in 20ms
CJS .papi/descriptors/dist/index.js 190.36 KB
CJS ⚡️ Build success in 20ms
Compilation started
Compilation successful
bun install
bun install v1.1.7 (b0b7db5c)

 + @polkadot-api/descriptors@.papi/descriptors

 1 package installed [19.00ms]
```

So what PAPI did for you, behind the scenes?

1.  Created a directory called `.papi` and under it in the dir `metadata` saved all the latest metadata for `polkadot`;
2.  In your `package.json` file added a dependency link to the descriptors that are created: `"@polkadot-api/descriptors": "file:.papi/descriptors",`.
3.  Under the `.papi` directory, created a PAPI configuration file called `polkadot-api.json` that looks like this:

```
{
 "version": 0,
 "descriptorPath": ".papi/descriptors",
 "entries": {
   "dot": {
     "chain": "polkadot",
     "metadata": ".papi/metadata/dot.scale"
   }
 }
}
```

and contains in `entries` the "variable" `dot`, linked to the respective chain and metadata;

> Note: the command `bunx papi add dot -n polkadot` is same if we used an rpc endpoint with the flag -w, meaning:
>
> `$ bunx papi add -w wss://polkadot-collectives-rpc.polkadot.io dot`
>
> but since `polkadot` is a known chain, the first command will suffice

In just few words - configured all the paths and needed dependencies with just 1 command.

### Adding people and collectives parachains

Lets run the commands for the rest of the chains we need:

```shell
$ bunx papi add people -n polkadot_people
```

and

```shell
$ bunx papi add collectives -n polkadot_collectives
```

### Configuration Complete

Configuration is now finished! All the necessary chains are set up in your project, and the metadata is neatly organized in a structured directory.

> Note: It’s a great idea to add PAPI to the "postinstall" script in your package.json to automate the generation of types after installation. (see `package.json` file for how that looks.)
