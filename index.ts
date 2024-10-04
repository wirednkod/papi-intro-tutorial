import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

// TODO: Create a new `async` function named `main` with the following logic:
//   - Call `makeClient` with endpoint `"wss://rpc.polkadot.io"`.
//   - Assign the result to a new constant named `polkadotClient`.
//   - Use `console.log({ polkadotClient });` to take a peek at the methods exposed by the client.

// TODO: Call the `main` function so it runs when executing this file.
