import { FieldSet, Records } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { eventTable } from "../db/events";

export async function fetchEvents(
  select?: QueryParams<FieldSet>
): Promise<Records<FieldSet>> {
  return new Promise((resolve, reject) => {
    select.filterByFormula = `AND({Unlisted} = 0, {Event Name} != ''${
      select.filterByFormula ? `, ${select.filterByFormula}` : ""
    })`;
    eventTable
      .select(select)
      .all()
      .then((events) => resolve(events))
      .catch((err) => reject(err));
  });
}
