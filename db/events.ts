import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const eventBase = Airtable.base(process.env.EVENTS_BASE_ID || "");
const eventTable = eventBase(process.env.EVENTS_TABLE_NAME || "");

export { eventTable, eventBase };