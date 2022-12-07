import { eventTable, eventBase } from '../db/events'
import IEvent from './interfaces/IEvent'

interface IImg {
  width: number,
  height: number,
  url: string,
}

export async function fetchEvents(): Promise<IEvent[]> {
  return new Promise((resolve, reject) => {
    const events:IEvent[] = [];
    eventTable.select({
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
        const recapImgs = record.fields['Recap Images'] as []
        let participantCount = "";
        const processedRecapImgs = [];
        
        for (let statNum = 0; statNum < 3; statNum++) {
          if (record.fields['Stat ' + statNum + ' Label'] === 'people') {
            participantCount = record.fields['Stat ' + statNum + ' Data'] as string
          }
        }

        for (let recapImg of recapImgs)
        {
          const processedRecapImg:IImg = recapImg;
          processedRecapImgs.push({
            height: processedRecapImg.height,
            width: processedRecapImg.width,
            url: processedRecapImg.url
          })
        }

        events.push(
          {
            name: record.fields['Event Name'] as string,
            date: eventDate,
            description: record.fields['Past Event Description'] as string,
            participants: participantCount,
            recapImg: processedRecapImgs,
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