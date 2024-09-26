# Connecting to the Polkadot Relay Chain

As promised, we’ll start by using a WsProvider provided by PAPI to create a client that connects to the Polkadot relay chain's RPC server. We’ll then log the finalized block number and hash as they are produced.

First things first though.
Let's create a new file, named `step1.ts`.

```bash
touch step1.ts
```

Then in `package.json`, add the following line in the `scripts` section.

```diff
"scripts": {
  "postinstall": "papi",
+  "step1": "bun run step1.ts"
}
```

### Edit `step1.ts` file

As we saw in the previous step we created the "variable" `dot` and mapped the respective `polkadot` chain (and papi created all this beautiful structure for you).

For now, we will need 2 things from `polkadot-api`.

1. The `getWsProvider` that we will use for adding the `wss` url of the JSON-RPC node that we wish to connect to;

```js
import { getWsProvider } from "polkadot-api/ws-provider/web";
```

> **Note**: Bun requires the `getWsProvider` to be imported from the `.../web` path. Read more [here](https://papi.how/requirements#bun).

2. The entry point of Polkadot-API, is the `createClient` and requires one (of the) JsonRpcProvider, which lets Polkadot-API communicate with a node.

```js
import { createClient } from "polkadot-api";
```

3. We create the provider and then pass that provider to the client and create it:

```js
const ws = getWsProvider("wss://dot-rpc.stakeworld.io");
const client = createClient(ws);
```

4. Now that the client is created (you can read about it's interface [here](https://papi.how/client#polkadotclient)), we will use, from it, an observable (named `finalizedBlock$`) that emits `BlockInfo` from the latest known finalized block and print the number and hash of that latest block.
   > Note: As per PAPI docs: 'It's a multicast and stateful observable, that will synchronously replay its latest known state.'

```js
client.finalizedBlock$.subscribe((finalizedBlock) =>
  console.log({ finalizedBlock })
);
```

This should print in the console something like:

```js
{
  finalizedBlock: {
    hash: "0xf77b74076daf806217235206c30168459d8de3954f043601959ef9eafabb50b8",
    number: 22707340,
    parent: "0x91e7d05bcb4eae1c19576da433ea29e1ac75005f8a68533879dfd8666fe30316",
  },
}
```

<!-- TODO: Break this into a new step -->

5. Now, to interact with the chain, you need to get the `TypedApi`, which includes all the types for every call in that chain. It allows to interact with the runtime metadata easily (make storage calls, create transactions, etc.) and with a great developer experience. To do that we should first import the `dot` "variable" from the descriptors, and then pass it to the `getTypedApi` function.

```js
import { dot } from "@polkadot-api/descriptors";
...
...
const dotApi = client.getTypedApi(dot);
```

6. The `dotApi` now is a variable that will automatically provide the "next level" metadata options for making the needed calls. For this example, you will try to make a query on a system account, providing an andress in order to retrieve information about the balance of that account:

```js
const accountInfo = await dotApi.query.System.Account.getValue(
  "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
);

console.log("accountInfo:", accountInfo);
```

This will produce as a log in your terminal the following:

```shell
accountInfo: {
  nonce: 32,
  consumers: 1,
  providers: 1,
  sufficients: 0,
  data: {
    free: 741458566984n,
    reserved: 0n,
    frozen: 500000000000n,
    flags: 170141183460469231731687303715884105728n,
  },
}
```

To validate the above you can run in the root of your project in your terminal:

```shell
$ bun run step1
```

This is it!

Congratulations!!

This is your first interaction with a substrate-based node, using the new Polkadot API.
