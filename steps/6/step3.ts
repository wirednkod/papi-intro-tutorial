import { collectives, people } from "@polkadot-api/descriptors";

import { mapRawIdentity } from "./utils";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient } from "polkadot-api";

const people_ws = getWsProvider("wss://polkadot-people-rpc.polkadot.io");
const collectives_ws = getWsProvider(
  "wss://polkadot-collectives-rpc.polkadot.io"
);

const peopleClient = createClient(people_ws);
const collectiveClient = createClient(collectives_ws);

const collective_api = collectiveClient?.getTypedApi(collectives);
const people_api = peopleClient?.getTypedApi(people);

const collective_members: any[] =
  await collective_api?.query.FellowshipCollective.Members.getEntries();
const identities: any[] =
  await people_api.query.Identity?.IdentityOf?.getValues(
    collective_members.map((m) => m.keyArgs)
  );
const values = await identities.map((identity, idx) => ({
  address: collective_members[idx].keyArgs[0],
  rank: collective_members[idx].value,
  ...mapRawIdentity(identity),
}));

console.log("Display, Github, Address, Rank");
values
  .sort((a, b) => b.rank - a.rank)
  .forEach((value) => {
    console.log(
      value.display,
      ", ",
      value.github,
      ", ",
      value.address,
      ", ",
      value.rank
    );
  });
