import type { PeopleQueries } from "@polkadot-api/descriptors";
import type { Binary } from "polkadot-api";

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? "";

export const mapRawIdentity = (
  rawIdentity?: PeopleQueries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity;
  const {
    info: { display, email, legal, matrix, twitter, web, github },
  } = rawIdentity[0];

  return {
    display: dataToString(display.value),
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    matrix: dataToString(matrix.value),
    github: dataToString(github.value),
    twitter: dataToString(twitter.value),
  };
};

export const getAllData = async (
  people_api: {
    query: {
      Identity: { IdentityOf: { getValues: (arg0: any[]) => Promise<any[]> } };
    };
  },
  coll_api: {
    query: {
      FellowshipCollective: { Members: { getEntries: () => Promise<any[]> } };
    };
  }
) => {
  return await coll_api?.query.FellowshipCollective.Members.getEntries().then(
    (mems: any[]) =>
      people_api.query.Identity?.IdentityOf?.getValues(
        mems.map((m) => m.keyArgs)
      ).then((identities: any[]) =>
        identities.map((identity, idx) => ({
          address: mems[idx].keyArgs[0],
          rank: mems[idx].value,
          ...mapRawIdentity(identity),
        }))
      )
  );
};
