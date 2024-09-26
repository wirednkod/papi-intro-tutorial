import { people } from "@polkadot-api/descriptors";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient } from "polkadot-api";

import { mapRawIdentity } from "./utils";

// TODO 1: use the getWsProvider to create a provider in order to connect to
// "wss://polkadot-people-rpc.polkadot.io" endpoint

// TODO 2: create the client using createClient and passing the ws
// created in the step above

// TODO 3: using the created client, get the TypedApi (getTypedApi) using
// the resepctive descriptors for the `people` chain

// TODO 4: using the typed API, query `15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr`

// Util `mapRawIdentity` will beautifully show you the account Identity information
console.log("accountInfo:", mapRawIdentity(accountInfo));
