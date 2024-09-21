# Step 2: Connecting and Querying the People Chain

Now that the first step is completed and some skill with PAPI is gained, I will proceed to the 2nd step that I will provide as a /_ TODO _/ task and try to let you figure out what to do.

Of course I created the `step2.ts` file from you and added the /_ TODO _/ steps that you need to complete. (Remember to add in your `package.json` file the script for running the next step: `"step2": "bun run step2.ts"`)

In addition I have added a `utils.ts` file that contains some helpful functions that will be used to make our logs prettier.

The **5 TODOs** that you need to do here are following the same way of thinking like step 1, with the difference that we will be connecting to polkadot API's people chain (that we imported during config).

Remember that you need to create the provider (TODO 1) using "wss://polkadot-people-rpc.polkadot.io", create the client (TODO 2) that this provided will be passed as a parameter.

Then using that client, you should get the TypedApi (TODO 3) as we did in `step 1` as well.

Finally, here is the new one. You need to use that typedApi and query an account (address of your choice), to retrieve it's identity from the Identity Pallet.

You can check again the [polkadot API's docs](https://papi.how/typed#typedapi) at the typedAPI section to understand how to query the storage (hint: `<typedAPI>.query...`) and then ["follow the Identity pallet"](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/identity). Reading that pallet you will see that - quote:

> The pallet provides functionality for username authorities to issue usernames. When an account receives a username, they get a default instance of **IdentityInfo**. Usernames also serve as a reverse lookup from username to account.

Knowing now that you want to (wink-wink) _query_ the _Identity_ pallet, and the default instance of _IdentityInfo_ and finally [get the value](https://papi.how/typed/queries#entries-with-keys) for that entry.

Go on and try to implement these TODOs.
In the next step you can find the solution of this.
