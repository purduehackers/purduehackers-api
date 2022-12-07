"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistBase = exports.wishlistTable = void 0;
const airtable_1 = __importDefault(require("airtable"));
airtable_1.default.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});
const wishlistBase = airtable_1.default.base(process.env.WISHLIST_BASE_ID || "");
exports.wishlistBase = wishlistBase;
const wishlistTable = wishlistBase(process.env.WISHLIST_TABLE_NAME || "");
exports.wishlistTable = wishlistTable;
//# sourceMappingURL=wishlist.js.map