"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../middleware/logger"));
const app = (0, express_1.default)();
const port = 8080;
app.use(logger_1.default);
app.get("/", (req, res) => {
    res.send("Hello world! hi");
});
app.get("/hello", (req, res) => {
    res.send("Hello world!");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map