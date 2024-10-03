# Codegen & "adding" chains

### Some background first

To connect to a blockchain network like Polkadot, the fundamental requirement is a provider, which acts as a bridge between your application and the chain. Providers typically connect to an RPC (Remote Procedure Call) endpoint, which allows your app to retrieve data like blocks and events. However, simply connecting to the chain doesn’t enable full interaction.

To interact with the chain — whether by querying storage, making transactions, or calling runtime methods — you also need to understand what data is available and how to format it. This is where metadata becomes crucial. The chain's metadata contains a detailed description of all the storage items, runtime functions, and transactions available on that network, as well as their data types.

Here’s how the process works:

During runtime, PAPI can automatically request the metadata from the chain you're connected to. From this metadata, it generates codecs (serialization and deserialization tools) to communicate with the chain's functions and storage. Before development, however, you need to have this information ready, in order to make your life easier on knowing how to communicate with the chain.

PAPI simplifies this with its CLI (Command Line Interface), which allows you to download the chain’s metadata ahead of time. This metadata is then used to generate all the necessary type descriptors, so you don’t have to manually figure out the structure of every interaction.

In practice, using the CLI to download metadata ensures that your app stays in sync with the specific network you're developing for, especially if that chain undergoes runtime upgrades or type changes​.

That CLI's syntax is:

```shell
$  npx papi add --help

Usage: polkadot-api add [options] <key>

Add a new chain spec to the list

Arguments:
  key                         Key identifier for the chain spec

Options:
  --config <filename>         Source for the config file
  -f, --file <filename>       Source from metadata encoded file
  -w, --wsUrl <URL>           Source from websocket URL
  -c, --chainSpec <filename>  Source from chain spec file
  -n, --name <name>           Source from a well-known chain (choices: "ksmcc3", "paseo",
                              "polkadot", "polkadot_collectives", "rococo_v2_2", "westend2", [...]")
  --wasm <filename>           Source from runtime wasm file
  --no-persist                Do not persist the metadata as a file
  --skip-codegen              Skip running codegen after adding
  -h, --help                  display help for command
```

The `papi add` command is used to register a new chain in your Polkadot project. When running this command, you need to provide a key — a unique identifier that will be used as a constant name when generating code for the chain. Additionally, you specify a source for the chain’s metadata using one of the following flags:

- `-f`, `-w`, `-c`, `-n`, or `--wasm`, depending on whether the metadata comes from a file, websocket, chain, or other source.

The command then downloads the latest metadata for the chain and stores it in a .papi folder. This folder contains:

1. A **configuration file** called `polkadot-api.json`, which holds the setup information for the chain.
2. **A metadata file** named `${key}.scale`, which contains the chain's specific metadata for later use.

This structure ensures that all the necessary metadata for interacting with the chain is preloaded and organized, streamlining your development process.

## Adding polkadot chain

Now that the CLI is understood, lets get going with this and run:

```shell
$ bunx papi add dot -n polkadot
```

> Note: bunx is the equivelent package runner for bun (as npx is for npm).
> You can read [more here](https://bun.sh/docs/cli/bunx).

What happened here?
Using `bunx` we asked (politely) from Polkadot API to fetch for you, in a `dot` "variable", the metadata from (the well-known-chain) `polkadot`.

The outcome of the command should be the following:

```shell
$ bunx papi add dot -n polkadot

✔ Metadata saved as .papi/metadata/dot.scale
Saved new spec "dot"
Reading metadata
CLI Building entry: .papi/descriptors/src/index.ts
CLI Using tsconfig: tsconfig.json
CLI tsup v8.3.0
CLI Target: esnext
CJS Build start
ESM Build start
ESM .papi/descriptors/dist/index.mjs                  9.88 KB
ESM .papi/descriptors/dist/metadataTypes-FYTIEX4M.mjs 146.06 KB
ESM .papi/descriptors/dist/descriptors-BGFWDDEF.mjs   25.73 KB
ESM ⚡️ Build success in 20ms
CJS .papi/descriptors/dist/index.js 190.36 KB
CJS ⚡️ Build success in 20ms
Compilation started
Compilation successful
bun install
bun install v1.1.7 (b0b7db5c)

 + @polkadot-api/descriptors@.papi/descriptors

 1 package installed [19.00ms]
```

So what PAPI did for you, behind the scenes?

1.  Created a directory called `.papi` and under it in the dir `metadata` saved all the latest metadata for `polkadot`;
2.  In your `package.json` file added a dependency link to the descriptors that are created: `"@polkadot-api/descriptors": "file:.papi/descriptors",`.
3.  Under the `.papi` directory, created a PAPI configuration file called `polkadot-api.json` that looks like this:

```
{
 "version": 0,
 "descriptorPath": ".papi/descriptors",
 "entries": {
   "dot": {
     "chain": "polkadot",
     "metadata": ".papi/metadata/dot.scale"
   }
 }
}
```

and contains in `entries` the "variable" `dot`, linked to the respective chain and metadata;

> Note: the command `bunx papi add dot -n polkadot` is "same" if we used an RPC endpoint with the flag -w. "Same" should not be lightly taken into account. This is not entiredly correct. If the PAPI's entries are used instead of an RPC endpoint, then the metadata are downloaded in a more decentralized manner - instead of being downladed from 1 specific url.

> `$ bunx papi add dot -w wss://polkadot-collectives-rpc.polkadot.io`
>
> but since `polkadot` is a known chain, the first command will suffice

In just few words - configured all the paths and needed dependencies with just 1 command.

## Adding people and collectives parachains

Lets run the commands for the rest of the chains we need:

```shell
$ bunx papi add people -n polkadot_people
```

and

```shell
$ bunx papi add collectives -n polkadot_collectives
```

## Configuration Complete

Configuration is now finished! All the necessary chains are set up in your project, and the metadata is neatly organized in a structured directory.

> Note: It’s a great idea to add PAPI to the "postinstall" script in your package.json to automate the generation of types after installation. (see `package.json` file for how that looks.)
