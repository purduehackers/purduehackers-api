"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEvents = void 0;
const events_1 = require("../db/events");
function fetchEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const events = [];
            events_1.eventTable.select({
                sort: [
                    { field: 'Event Date & End Time', direction: 'desc' },
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
                    const eventDateStr = record.fields['Event Date & Start Time'];
                    const eventDate = new Date(eventDateStr);
                    const recapImgs = record.fields['Recap Images'];
                    let participantCount = "";
                    const processedRecapImgs = [];
                    for (let statNum = 0; statNum < 3; statNum++) {
                        if (record.fields['Stat ' + statNum + ' Label'] === 'people') {
                            participantCount = record.fields['Stat ' + statNum + ' Data'];
                        }
                    }
                    for (let recapImg of recapImgs) {
                        const processedRecapImg = recapImg;
                        processedRecapImgs.push({
                            height: processedRecapImg.height,
                            width: processedRecapImg.width,
                            url: processedRecapImg.url
                        });
                    }
                    events.push({
                        name: record.fields['Event Name'],
                        date: eventDate,
                        description: record.fields['Past Event Description'],
                        participants: participantCount,
                        recapImg: processedRecapImgs,
                        location: record.fields['Event Location'],
                    });
                }
                fetchNextPage();
            }, function done(err) {
                if (err)
                    reject(err);
                resolve(events);
            });
        });
    });
}
exports.fetchEvents = fetchEvents;
//# sourceMappingURL=fetchEvents.js.map