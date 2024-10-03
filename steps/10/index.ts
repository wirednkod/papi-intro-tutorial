import process from 'node:process';
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient, type SS58String } from "polkadot-api";
import { dot } from "@polkadot-api/descriptors";

function makeClient(endpoint: string): PolkadotClient {
	console.log(`Connecting to endpoint: ${endpoint}`);
	const provider = getWsProvider(endpoint);
	const client = createClient(provider);
	return client;
}

async function printChainInfo(client: PolkadotClient) {
	const chain = await client.getChainSpecData()
	const finalizedBlock = await client.getFinalizedBlock();
	console.log(`Connected to ${chain.name} at block ${finalizedBlock.number}.\n`);
}

async function getBalance(polkadotClient: PolkadotClient, address: SS58String): Promise<BigInt> {
	const dotApi = polkadotClient.getTypedApi(dot);
	const accountInfo = await dotApi.query.System.Account.getValue(address);
	const { free, reserved } = accountInfo.data;
	return free + reserved;
}

async function main() {
	const polkadotClient = makeClient("wss://rpc.polkadot.io");
	await printChainInfo(polkadotClient);

	const address = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr"
	const balance = await getBalance(polkadotClient, address);
	console.log(`Balance of ${address} is ${balance}.`);

	console.log(`Done!`);
	process.exit(0);
}

main()
