import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

async function main() {
  const polkadotClient = makeClient("wss://rpc.polkadot.io");
  console.log({ polkadotClient });

  console.log(`Done!`);
  process.exit(0);
}

main();
