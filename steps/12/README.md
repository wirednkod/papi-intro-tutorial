# PEOPLE System Chain

The People's Chain is a System chain, designed to enhance decentralized identity management and foster social interactions. This platform empowers users to control their digital identities while actively participating in community governance.

Earlier in this tutorial, you created the `people` descriptor, which we will now utilize in the same manner as we did with the `dot` descriptor in the previous steps.

This approach will allow us to interact with the People’s Chain effectively.

The main query that we are interested for the People system chain is the following:

```ts
await peopleApi.query.Identity.IdentityOf.getValue(address);
```

This will receive an address as an input, and return the address's holder information (`accountInfo`).

Hint:

```ts
[{
    judgements: [number, IdentityJudgement][];
    deposit: bigint;
    info: {
        display: IdentityData;
        legal: IdentityData;
        web: IdentityData;
        ... 6 more ...;
        discord: IdentityData;
    };
}, Binary | undefined] | undefined
```

With that information you could then retrieve the data needed (good exercise: try to follow the typed api).

E.g.:

```ts
accountInfo?.[0].info.display.value?.asText();
```

In case a result from the query above is undefined, that means that the specific address, has not set an OnChain Identity.
