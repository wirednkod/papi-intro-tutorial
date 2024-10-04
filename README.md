# COLLECTIVES System Chain

The Polkadot Collectives parachain was introduced in [Referendum 81](https://polkadot.polkassembly.io/referendum/81) and is unique to the Polkadot network, meaning there is no equivalent on Kusama. This parachain facilitates various on-chain collectives that contribute to the Polkadot ecosystem, including the Fellowship and Polkadot Alliance.

For querying information about the Fellowship, you will be working with several specific components: `FellowshipCollective`, `FellowshipCore`, `FellowshipReferenda`, `FellowshipSalary`, and `FellowshipTreasury`.

In this tutorial, we will specifically utilize the `FellowshipCollective` to gather details about the fellowship members and their corresponding ranks.

> Note: If you want to learn more about the Fellowship Collective, including member specifics and ranks, feel free to explore [the Fellowship Dashboard](https://polkadot-fellows.xyz/).

To retrieve all entries from a query without specifying an address or additional inputs, PAPI provides the `getEntries()` method. This method returns an array of results that match the expected structure.

In our case, the implementation will look something like this:

```ts
const rawMembers =
  await collectivesApi.query.FellowshipCollective.Members.getEntries();
```

Once this is executed then we can parse the results and return only the needed address, and rank for each Fellowship member.

```ts
const data = rawMembers.map((m) => ({ address: m.keyArgs[0], rank: m.value }));
```

You can try to console the result in a table, using the `console.table` [method that Javascript provides]().

The Polkadot Collectives parachain was added in [Referendum 81](https://polkadot.polkassembly.io/referendum/81) and exists only on Polkadot (i.e., there is no Kusama equivalent). The Collectives chain hosts on-chain collectives that serve the Polkadot network, such as the Fellowship and Polkadot Alliance.

The queries of a collective are (using as example the fellowship) the following `FellowshipCollective, FellowshipCore, FellowshipReferenda, FellowshipSalary, FellowshipTreasury` and we will specifically use the `FellowshipCollective` for gathering the fellowship members and their `rank`.

Note: For more information about the fellowship collective, and specifics on the members and ranks, since this is not the main subject of the tutorial, feel free to read here: https://polkadot-fellows.xyz/

To receive all the entries of a query without specifing an address (or an input), PAPI provides a `getEntries()` method which returns an array of results, of the expected structure.
So in our case this will be something like:

```ts
const rawMembers =
  await collectivesApi.query.FellowshipCollective.Members.getEntries();
```

Once this is executed then we can parse the results and return only the needed address, and rank for each Fellowship member.

```ts
const data = rawMembers.map((m) => ({ address: m.keyArgs[0], rank: m.value }));
```

You can try to console the result in a table, using the `console.table` [static method](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static).

Similar scripts are used in the Fellowship Dashboard - `https://polkadot-fellows.xyz` and the results can be seen at the first page's table, where all members of the fellowship appear.
