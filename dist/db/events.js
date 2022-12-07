"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBase = exports.eventTable = void 0;
const airtable_1 = __importDefault(require("airtable"));
airtable_1.default.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});
const eventBase = airtable_1.default.base(process.env.EVENTS_BASE_ID || "");
exports.eventBase = eventBase;
const eventTable = eventBase(process.env.EVENTS_TABLE_NAME || "");
exports.eventTable = eventTable;
//# sourceMappingURL=events.js.map