import process from 'node:process';
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient, type SS58String } from "polkadot-api";
// TODO: Import `collectives` from `"@polkadot-api/descriptors"`.
import { dot, people } from "@polkadot-api/descriptors";

function makeClient(endpoint: string): PolkadotClient {
	console.log(`Connecting to endpoint: ${endpoint}`);
	const provider = getWsProvider(endpoint);
	const client = createClient(provider);
	return client;
}

async function printChainInfo(client: PolkadotClient) {
	const chainSpec = await client.getChainSpecData()
	const finalizedBlock = await client.getFinalizedBlock();
	console.log(`Connected to ${chainSpec.name} at block ${finalizedBlock.number}.\n`);
}

async function getBalance(polkadotClient: PolkadotClient, address: SS58String): Promise<BigInt> {
	const dotApi = polkadotClient.getTypedApi(dot);
	const accountInfo = await dotApi.query.System.Account.getValue(address);
	const { free, reserved } = accountInfo.data;
	return free + reserved;
}

async function getDisplayName(peopleClient: PolkadotClient, address: SS58String): Promise<string | undefined> {
	const peopleApi = peopleClient.getTypedApi(people);
	const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(address);
	const displayName = accountInfo?.[0].info.display.value?.asText();
	return displayName;
}

// TODO:
// - Create a new type safe `interface` called `FellowshipMember`.
//   - It has two fields:
//     - `address` which is of type `SS58String`.
//     - `rank` which is of type `number`.

// TODO:
// - Create a new `async` function `getFellowshipMembers`:
//   - It has a single parameter `collectivesClient` of type `PolkadotClient`.
//   - It returns an array of fellowship members: `Promise<FellowshipMember[]>`.
// - Write the logic of the `getFellowshipMembers` function:
//   - Call the `getTypedApi` method on the `collectivesClient` variable.
//     - The `getTypedApi` method should include the parameter `collectives`, which we imported above.
//     - Assign the result to a new constant `collectivesApi`.
//   - Call `collectivesApi.query.FellowshipCollective.Members.getEntries()`.
//   - `await` the result, and assign it to a new constant `rawMembers`.
//   - Extract the `address` and `rank` from `rawMembers`:
//     - `map` the items of `rawMembers` to access the individual members `m`.
//     - You can access the `address` of the member by calling `m.keyArgs[0]`.
//     - You can access the `rank` of the member by calling `m.value`.
//     - Assign the mapped data to a new constant `fellowshipMembers`.
//       - Make sure the data is in the structure of `FellowshipMember`.
//   - Return the `fellowshipMembers` constant.

async function main() {
	const polkadotClient = makeClient("wss://rpc.polkadot.io");
	await printChainInfo(polkadotClient);

	const peopleClient = makeClient("wss://polkadot-people-rpc.polkadot.io");
	await printChainInfo(peopleClient);

	// TODO:
	// - Make a new client connection to `"wss://polkadot-collectives-rpc.polkadot.io"`.
	// - Assign the result to a constant `collectivesClient`.
	// - Call `printChainInfo(collectivesClient)` and await the result.

	// TODO:
	// - Call `getFellowshipMembers` with the parameter `collectivesClient`.
	// - `await` the result, and assign it to a new constant `members`.

	// TODO:
	// - Create a new constant `table` which is an empty array that we will fill.
	// - Create a `for` loop over `members`, extracting the `address` and `rank`.
	// - Rather than use the hardcoded address below, use the `address` variable from `members`.
	// - Bring the logic to get the `balance` and `displayName` into your loop.
	// - Replace our `console.log`, and instead `push` all of the data into the `table` array.
	//   - `table.push({ rank, displayName, address, balance })`
	const address = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr"
	const balance = await getBalance(polkadotClient, address);
	const displayName = await getDisplayName(peopleClient, address);
	console.log(`Balance of ${displayName} (${address}) is ${balance}.`);

	// TODO:
	// - We can sort the table by `rank`: `table.sort((a, b) => b.rank - a.rank)`.
	// - Finally, print the table using `console.table(table)`, rather than `console.log`.

	console.log(`Done!`);
	process.exit(0);
}

main()
