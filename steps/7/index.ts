import process from 'node:process';
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
	console.log(`Connecting to endpoint: ${endpoint}`);
	const provider = getWsProvider(endpoint);
	const client = createClient(provider);
	return client;
}

// TODO:
// - Create a new `async` function` named `printChainInfo`.
//   - It should accept a parameter `client` of type `PolkadotClient`.
// - Write the logic for `printChainInfo`.
//   - Call the `getChainSpecData` method, which is exposed on `client`.
//   - `await` the result, and assign the output to a new constant `chainSpec`.
//   - Call the `getFinalizedBlock` method, which is exposed on `client`.
//   - `await` the result, and assign the output to a new constant `finalizedBlock`.
//   - Print `chainSpec.name` and `finalizedBlock.number` with a friendly message.

async function main() {
	const polkadotClient = makeClient("wss://rpc.polkadot.io");
	// TODO: Replace this line with `await printChainInfo({ polkadotClient });`
	console.log({ polkadotClient });

	console.log(`Done!`);
	process.exit(0);
}

main()
