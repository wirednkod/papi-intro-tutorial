import { people } from "@polkadot-api/descriptors";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient } from "polkadot-api";

import { mapRawIdentity } from "./utils";

const ws = getWsProvider("wss://polkadot-people-rpc.polkadot.io");

const client = createClient(ws);

const peopleApi = client.getTypedApi(people);

const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(
  "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr"
);

console.log("accountInfo:", mapRawIdentity(accountInfo));
