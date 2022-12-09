// import { wishlistTable, wishlistBase } from '../db/wishlist'
// import IWish from './interfaces/IWish';

// export async function fetchEvents(): Promise<IWish[]> {
//   return new Promise((resolve, reject) => {
//     const wishes:IWish[] = [];
//     wishlistTable.select({
//       sort: [
//         {field: 'Event Date & End Time', direction: 'desc'},
//       ],
//     }).eachPage(function page(records, fetchNextPage) {
//       for (const record of records) {

//       }
//       fetchNextPage();
//     }, function done(err) {
//       if (err) reject(err)
//       // resolve()
//     })
//   });
// }
