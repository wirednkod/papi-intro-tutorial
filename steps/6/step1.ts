import { dot } from "@polkadot-api/descriptors";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient } from "polkadot-api";

const ws = getWsProvider("wss://dot-rpc.stakeworld.io");

const client = createClient(ws);

client.finalizedBlock$.subscribe((finalizedBlock) =>
  console.log(finalizedBlock.number, finalizedBlock.hash)
);

const dotApi = client.getTypedApi(dot);

const accountInfo = await dotApi.query.System.Account.getValue(
  "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
);

console.log("accountInfo:", accountInfo);
