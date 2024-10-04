import process from "node:process";
import { getWsProvider } from "polkadot-api/ws-provider/web";
// TODO: Import the type `SS58String` from `"polkadot-api"`.
import { createClient, type PolkadotClient } from "polkadot-api";
// TODO: Import `dot` from `"@polkadot-api/descriptors"`.

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

// TODO:
// - Create a new `async` function called `getBalance`:
//   - It accepts two parameters:
//     - A parameter named `polkadotClient` which is of type `PolkadotClient`.
//     - A parameter named `address` which is of type `SS58String` which we imported above.
//   - It returns a `Promise<BigInt>`.
// - Write the logic of the `getBalance` function:
//   - Call the `getTypedApi` method on the `polkadotClient` variable.
//     - The `getTypedApi` method should include the parameter `dot`, which we imported above.
//     - Assign the result to a new constant `dotApi`.
//   - Call `dotApi.query.System.Account.getValue(address)`.
//   - `await` the result, and assign it to a new constant `accountInfo`.
//   - Extract the `free` and `reserved` balance from `accountInfo.data`.
//   - Return the sum of `free` and `reserved`.

async function main() {
  const polkadotClient = makeClient("wss://rpc.polkadot.io");
  await printChainInfo(polkadotClient);

  // TODO:
  // - Create a new constant `address` with value `"15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr"`.
  // - Call `getBalance`, using the constants `polkadotClient` and `address`.
  // - `await` the result, and assign it to a constant named `balance`.
  // - Print a friendly message to display the `address` and their `balance`.

  console.log(`Done!`);
  process.exit(0);
}

main();
