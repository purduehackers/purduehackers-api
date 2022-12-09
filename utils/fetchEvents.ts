import { FieldSet, Records } from "airtable";
import { GithubSlugger } from "github-slugger-typescript";
import { QueryParams } from "airtable/lib/query_params";
import { eventTable } from "../db/events";
import PHEvent from "./interfaces/PHEvent";

export async function fetchEvents(
  select?: QueryParams<FieldSet>
): Promise<PHEvent[]> {
  return new Promise((resolve, reject) => {
    select.filterByFormula = `AND({Unlisted} = 0, {Event Name} != ''${
      select.filterByFormula ? `, ${select.filterByFormula}` : ""
    })`;
    eventTable
      .select(select)
      .all()
      .then((events) => {
        const slugger = new GithubSlugger();
        const typedEvents = events.map(({ id, fields }) => ({
          id,
          name: fields["Event Name"],
          desc:
            fields["Event Description"] ??
            `We're still working on this event...check back later for more details!`,
          start: fields["Event Date & Start Time"] ?? "TBD",
          end: fields["Event Date & End Time"] ?? "TBD",
          loc: fields["Event Location"] ?? "TBD",
          gMap: fields["Location Map Link (optional)"] ?? false,
          calLink: fields["Calendar Link"] ?? false,
          ogDescription: fields["OG Description"] ?? "",
          emailSent: fields["Reminder Email Sent"] ?? false,
          secondEmailSent: fields["Second Email Sent"] ?? false,
          unlisted: fields["Unlisted"] ?? false,
          rsvpCount: fields["RSVP Count"] ?? 0,
          slug:
            fields["Custom Slug"] ??
            slugger.slug(fields["Event Name"] as string),
          pastEventDesc:
            fields["Past Event Description"] ??
            "A past Purdue Hackers event...more details coming soon!",
          recapImages: fields["Recap Images"] ?? [
            { url: "https://mbs.zone/geck" },
          ],
          hasPastEventDesc:
            fields["Has Past Event Description?"] === 1 ? true : false,
          stat1Data: fields["Stat 1 Data"] ?? "",
          stat1Label: fields["Stat 1 Label"] ?? "",
          stat2Data: fields["Stat 2 Data"] ?? "",
          stat2Label: fields["Stat 2 Label"] ?? "",
          stat3Data: fields["Stat 3 Data"] ?? "",
          stat3Label: fields["Stat 3 Label"] ?? "",
        }));
        resolve(typedEvents as PHEvent[]);
      })
      .catch((err) => reject(err));
  });
}
