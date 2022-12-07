import { eventTable, eventBase } from '../db/events'
import IEvent from './interfaces/IEvent'

export async function fetchEvents(): Promise<IEvent[]> {
  return new Promise((resolve, reject) => {
    const events:IEvent[] = [];
    eventTable.select({
      maxRecords:3,
      sort: [
        {field: 'Event Date & End Time', direction: 'desc'},
      ],
      filterByFormula: `
      AND(
        {Unlisted} = 0,
        NOT(FIND("Hack Night", {Event Name})),
        OR(
          {Stat 1 Label} = "people",
          {Stat 2 Label} = "people",
          {Stat 3 Label} = "people"
        ),
        {Recap Images}
      )`
    }).eachPage(function page(records, fetchNextPage) {
      for (const record of records) {
        const eventDateStr = record.fields['Event Date & Start Time'] as string
        const eventDate = new Date(eventDateStr)
        const recapImg = record.fields['Recap Images'] ?? []
        let participantCount = "";
        
        for (let statNum = 0; statNum < 3; statNum++) {
          if (record.fields['Stat ' + statNum + ' Label'] === 'people') {
            participantCount = record.fields['Stat ' + statNum + ' Data'] as string
          }
        }
        events.push(
          {
            name: record.fields['Event Name'] as string,
            date: eventDate,
            description: record.fields['Past Event Description'] as string,
            rsvp: participantCount,
            // img: recapImg,
            location: record.fields['Event Location'] as string,
          }
        )
      }
      fetchNextPage();
    }, function done(err) {
      if (err) reject(err)
      resolve(events)
    })
  });
}