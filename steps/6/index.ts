import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

// TODO: Create the main() function here
// async fucntion main()

// TODO: Then get the client by calling the makeClient function from above
// giving as endpoint the "wss://rpc.polkadot.io"
// TODO: Try to log the `polkadotClient` for this step in order to see the methods mentioned in the README

// TODO: Call the main function
