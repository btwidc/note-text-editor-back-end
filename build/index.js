"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const errorHandlingMiddleware_1 = __importDefault(require("./middleware/errorHandlingMiddleware"));
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', routes_1.default);
app.use(errorHandlingMiddleware_1.default);
const start = async () => {
    try {
        await server.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
