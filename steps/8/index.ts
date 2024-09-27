import process from 'node:process';
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

function makeClient(endpoint: string): PolkadotClient {
	console.log(`Connecting to endpoint: ${endpoint}`);
	const provider = getWsProvider(endpoint);
	const client = createClient(provider);
	return client;
}

async function printChainInfo(client: PolkadotClient) {
	let chain = await client.getChainSpecData()
	let finalizedBlock = await client.getFinalizedBlock();
	console.log(`Connected to ${chain.name} at block ${finalizedBlock.number}.\n`);
}

async function main() {
	const polkadotClient = makeClient("wss://rpc.polkadot.io");
	await printChainInfo(polkadotClient);

	console.log(`Done!`);
	process.exit(0);
}

main()
