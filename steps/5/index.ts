// TODO: Import `process` from `node:process`.
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
	console.log(`Connecting to endpoint: ${endpoint}`);
	const provider = getWsProvider(endpoint);
	const client = createClient(provider);
	return client;
}

// TODO:
// - Create a new `async` function called `main`.
//   - Call `makeClient` with the endpoint `"wss://rpc.polkadot.io"`.
//   - Assign the result to a new constant `polkadotClient`.
//   - Print the `polkadotClient` object with `console.log` to take a peek inside.
//   - Use `console.log` to print a "Done!" message to show you app completed successfully.
//   - Exit the process by calling `process.exit(0)`.

// TODO: Call your `main()` function.
