import { FieldSet, Records } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { wishlistTable } from "../db/wishlist";

export async function fetchWishes(
  select?: QueryParams<FieldSet>
): Promise<Records<FieldSet>> {
  return new Promise((resolve, reject) => {
    select.filterByFormula = `AND({Unlisted} = 0 ${
      select.filterByFormula ? `, ${select.filterByFormula}` : ""
    })`;
    wishlistTable
      .select(select)
      .all()
      .then((wishes) => resolve(wishes))
      .catch((err) => reject(err));
  });
}
