# Step 3: Multi-chain. Connect and query from people and collective chains

Now that you are much more skillfull with PAPI we will proceed to the 3rd step which is a bit more complex. Meaning we will crate 2 providers, 2 clients and 2 typedApis.
One for each, collectives and people chains.

The URLs that should be used for the providers are:

- people chain is "wss://polkadot-people-rpc.polkadot.io";
- collectives chain is "wss://polkadot-collectives-rpc.polkadot.io"

Look on file `step3.ts` added in this step (and if you are doing the same in your IDE remember to add the relevant script in your `package.json` file).

Once all (duplicated this time) steps are done, then:

### 1. retrieve from the collective's API the Fellowship Members.

```js
const collective_members: any[] =
  await collective_api?.query.FellowshipCollective.Members.getEntries();
```

Here, since we want to retrieve multiple values, instead of the `getValue()` we are using the `getEntries()` function from PAPI, allows you to get all entries without passing the keys (more info [here](https://papi.how/typed/queries) at the bottom of the page).

### 2. Retrieve for each of the Fellowship member, the respective identity information

```js
const identities: any[] =
  await people_api.query.Identity?.IdentityOf?.getValues(
    collective_members.map((m) => m.keyArgs)
  );
```

This is very similar to `step 2`, but since we are passing an array of addresses (`keyArg` of each retrieved entry from previous query), we are now using the `getValues()` instead of the `getValue()` in order for PAPI to return all the identities of the addresses in 1 call.

### 3. Map results and print them

Last step is to iterate through the `identities` values, and by using the `mapRawIdentity` util (as we did in the previous step as well), to beautify the results.

Finally we are sorting all the results by rank (remember these are the fellowship members and each member has a rank), and print them in our console.

If you run the `step3` (by executing `$bun run step3`) you should see in your console something like:

```shell
Display, Github, Address, Rank
Gav ,  gavofyork ,  16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna ,  7
 ,  rphmeier ,  12MrP337azmkTdfCUKe5XLnSQrbgEKqqfZ4PQC7CZTJKAWR3 ,  6
bkchr ,  bkchr ,  13fvj4bNfrTo8oW6U8525soRp6vhjAFLum6XBdtqq9yP22E7 ,  6
Jaco ,   ,  1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv ,  5
andre ,  andresilva ,  14YDyDZ9o1Nr2hMqLSbjYpr4Wm5s1gux6CvjYZfUTJ4Np3w1 ,  5
pepyakin ,  pepyakin ,  123SVCkcHnNKyng8EPmaUeay5kKHu1jig99RT21E2cEx5pQF ,  5
ARKPAR ,  arkpar ,  15G1iXDLgFyfnJ51FKq1ts44TduMyUtekvzQi9my4hgYt2hs ,  5
...
...
```

Similar scripts are used in the [Fellowship Dashboard - https://polkadot-fellows.xyz](https://polkadot-fellows.xyz) and the results can be seen at the first page's table, where all members of the fellowship appear.
