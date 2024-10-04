import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import {
  createClient,
  type PolkadotClient,
  type SS58String,
} from "polkadot-api";
// TODO: Import `people` from `"@polkadot-api/descriptors"`;
import { dot } from "@polkadot-api/descriptors";

function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

async function printChainInfo(client: PolkadotClient) {
  // **IMPORTANT NOTE:** This method is used in this tutorial, but it should not be used in production apps.
  const chain = await client.getChainSpecData();
  const finalizedBlock = await client.getFinalizedBlock();
  console.log(
    `Connected to ${chain.name} at block ${finalizedBlock.number}.\n`
  );
}

async function getBalance(
  polkadotClient: PolkadotClient,
  address: SS58String
): Promise<BigInt> {
  const dotApi = polkadotClient.getTypedApi(dot);
  const accountInfo = await dotApi.query.System.Account.getValue(address);
  const { free, reserved } = accountInfo.data;
  return free + reserved;
}

// TODO:
// - Create a new `async` function called `getDisplayName`:
//   - It accepts two parameters:
//     - `peopleClient` which is of type `PolkadotClient`.
//     - `address` which is of type `SS58String`.
//   - It returns a `Promise<string | undefined>`.
// - Write the logic of the `getDisplayName` function:
//   - Call the `getTypedApi` method on the `peopleClient` variable.
//     - The `getTypedApi` method should include the parameter `people`, which we imported above.
//     - Assign the result to a new constant `peopleApi`.
//   - Call `peopleApi.query.Identity.IdentityOf.getValue(address)`.
//   - `await` the result, and assign it to a new constant `accountInfo`.
//   - Extract the display name with: `accountInfo?.[0].info.display.value?.asText()`
//     - Assign the result to a new constant `displayName`.
//   - Return the `displayName` constant.

async function main() {
  const polkadotClient = makeClient("wss://rpc.polkadot.io");
  await printChainInfo(polkadotClient);

  const peopleClient = makeClient("wss://polkadot-people-rpc.polkadot.io");
  await printChainInfo(peopleClient);

  const address = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";
  const balance = await getBalance(polkadotClient, address);
  // TODO:
  // - Call `getDisplayName`, using the constants `peopleClient` and `address.
  // - `await` the result, and assign it to a constant named `display`.
  // - Update the message below to include the display name of the user.
  console.log(`Balance of ${address} is ${balance}.`);

  console.log(`Done!`);
  process.exit(0);
}

main();
