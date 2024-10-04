# Connection Process

The connection process for PAPI follows a structured workflow that ensures your application can both connect to and interact with the Polkadot network.
Here’s a step-by-step explanation:

### 1. Provider Setup

The first step in connecting to a chain is creating a provider, which acts as a communication bridge between your application and the blockchain. PAPI offers multiple ways to establish this connection, such as using:

- **getWsProvider (the WebSocket Provider)**: Connects via a WebSocket URL, often used for real-time interactions.
- **Smoldot Provider**: A lightweight option that runs a light client in the browser, particularly useful for environments with limited resources​.

In your app, you would initialize the provider like this:

```ts
import { getWsProvider } from "polkadot-api/ws-provider/web";
...
const provider = new getWsProvider('wss://rpc.polkadot.io');
```

### 2. Client Initialization

After setting up the provider, the next step is to initialize a **client**.

The client is responsible for making RPC calls to the chain, fetching metadata, and enabling interactions like querying storage or sending transactions.

```ts
import { createClient, type PolkadotClient } from "polkadot-api";
...
const client: PolkadotClient = createClient(provider);
```

The `PolkadotClient` interface shapes the top-level API for polkadot-api. Once we get a client using `createClient` function, the following can be used:

```ts
interface PolkadotClient {
  /**
   * Retrieve the ChainSpecData as it comes from the [JSON-RPC
   * spec](https://paritytech.github.io/json-rpc-interface-spec/api/chainSpec.html)
   */
  getChainSpecData: () => Promise<ChainSpecData>;

  /**
   * Observable that emits `BlockInfo` from the latest known finalized block.
   * It's a multicast and stateful observable, that will synchronously replay
   * its latest known state.
   */
  finalizedBlock$: Observable<BlockInfo>;
  /**
   * @returns Latest known finalized block.
   */
  getFinalizedBlock: () => Promise<BlockInfo>;

  /**
   * Observable that emits an Array of `BlockInfo`, being the first element the
   * latest known best block, and the last element the latest known finalized
   * block. It's a multicast and stateful observable, that will synchronously
   * replay its latest known state. This array is an immutable data structure;
   * i.e. a new array is emitted at every event but the reference to its
   * children are stable if the children didn't change.
   *
   * Note that subscribing to this observable already supersedes the need of
   * subscribing to `finalizedBlock$`, since the last element of the array will
   * be the latest known finalized block.
   */
  bestBlocks$: Observable<BlockInfo[]>;
  /**
   * @returns Array of `BlockInfo`, being the first element the latest
   *          known best block, and the last element the latest known
   *          finalized block.
   */
  getBestBlocks: () => Promise<BlockInfo[]>;

  /**
   * Observable to watch Block Body.
   *
   * @param hash  It can be a block hash, `"finalized"`, or `"best"`
   * @returns Observable to watch a block body. There'll be just one event
   *          with the payload and the observable will complete.
   */
  watchBlockBody: (hash: string) => Observable<HexString[]>;
  /**
   * Get Block Body (Promise-based)
   *
   * @param hash  It can be a block hash, `"finalized"`, or `"best"`
   * @returns Block body.
   */
  getBlockBody: (hash: string) => Promise<HexString[]>;

  /**
   * Get Block Header (Promise-based)
   *
   * @param hash  It can be a block hash, `"finalized"` (default), or
   *              `"best"`
   * @returns Block hash.
   */
  getBlockHeader: (hash?: string) => Promise<BlockHeader>;

  /**
   * Broadcast a transaction (Promise-based)
   *
   * @param transaction  SCALE-encoded tx to broadcast.
   * @param at           It can be a block hash, `"finalized"`, or `"best"`.
   *                     That block will be used to verify the validity of
   *                     the tx, retrieve the next nonce,
   *                     and create the mortality taking that block into
   *                     account.
   */
  submit: (
    transaction: HexString,
    at?: HexString
  ) => Promise<TxFinalizedPayload>;
  /**
   * Broadcast a transaction and returns an Observable. The observable will
   * complete as soon as the transaction is in a finalized block.
   *
   * @param transaction  SCALE-encoded tx to broadcast.
   * @param at           It can be a block hash, `"finalized"`, or `"best"`.
   *                     That block will be used to verify the validity of
   *                     the tx, retrieve the next nonce,
   *                     and create the mortality taking that block into
   *                     account.
   */
  submitAndWatch: (
    transaction: HexString,
    at?: HexString
  ) => Observable<TxBroadcastEvent>;

  /**
   * Returns an instance of a `TypedApi`
   *
   * @param descriptors  Pass descriptors from `@polkadot-api/descriptors`
   *                     generated by `papi` CLI.
   */
  getTypedApi: <D extends ChainDefinition>(descriptors: D) => TypedApi<D>;

  /**
   * This will `unfollow` the provider, disconnect and error every subscription.
   * After calling it nothing can be done with the client.
   */
  destroy: () => void;

  /**
   * This API is meant as an "escape hatch" to allow access to debug endpoints
   * such as `system_version`, and other useful endpoints that are not spec
   * compliant.
   *
   * @example
   *
   *   const systemVersion = await client._request<string>("system_version", [])
   *   const myFancyThhing = await client._request<
   *     { value: string },
   *     [id: number]
   *   >("very_fancy", [1714])
   *
   */
  _request: <Reply = any, Params extends Array<any> = any[]>(
    method: string,
    params: Params
  ) => Promise<Reply>;
}
```

> Note: `PolkadotClient` heavily relies on rxjs' `Observable`, used as well under the hood of Promise-based methods. Every method is fairly straight-forward and already documented exhaustively, except for getTypedApi. Let's dive into it.
>
> Information from: https://papi.how/client
