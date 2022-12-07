import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const wishlistBase = Airtable.base(process.env.WISHLIST_BASE_ID || "");
const wishlistTable = wishlistBase(process.env.WISHLIST_TABLE_NAME || "");

export { wishlistTable, wishlistBase };