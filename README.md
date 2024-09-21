# Step 2: Connecting and Querying the People Chain (Solution)

Lets see what you needed to have done in each of the TODOs:

## TODO1: "you need to create the provider"

As per `step1` we need to use the (already) imported `getWsProvider` with the people's web socket. That will happen using the following piece of code:

```js
const ws = getWsProvider("wss://polkadot-people-rpc.polkadot.io");
```

## TODO2: "create the client"

Using that `ws` from TODO1, you should create the client (as per `step1`):

```js
const client = createClient(ws);
```

## TODO3: "get the TypedApi"

For getting the people's typedApi we use the `getTypedApi` but passing as parameter the imported descriptor of `people` instead of the polkadot's one we used in `step1` (dot):

```js
const peopleApi = client.getTypedApi(people);
```

## TODO4: "use that typedApi and query an account (address of your choice)"

Now that all first 3 TODOs are done we can use that typed API (`peopleApi`) to `query` the `Identity` pallet for the `IdentityOf` instance. For receiving the storage value PAPI uses the `getValue()` function that should receive the account's address:

```js
const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(
  "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr"
);
```

Congratilations! if you run the code above correctly you should see a nice console log in your terminal that will show you the information of the given address.

(solution exists in `step2.ts` file.)
