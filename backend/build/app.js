"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connection_1 = __importDefault(require("./frameworks/database/mongoDB/connection"));
var routes_1 = __importDefault(require("./frameworks/webserver/routes"));
var appError_1 = __importDefault(require("./utils/appError"));
var errorhandlingmiddleware_1 = __importDefault(require("./frameworks/webserver/middleware/errorhandlingmiddleware"));
var path = __importStar(require("path"));
var http = __importStar(require("http"));
var express_2 = __importDefault(require("./frameworks/webserver/express"));
var server_1 = __importDefault(require("./frameworks/webserver/server"));
var app = (0, express_1.default)();
var server = http.createServer(app);
(0, connection_1.default)();
(0, express_2.default)(app);
(0, routes_1.default)(app);
var staticPath = path.join(__dirname, "..", "..", "frontend", "build");
app.use(express_1.default.static(staticPath));
app.use(errorhandlingmiddleware_1.default);
//catch 404 and forward ro error handler
app.all("*", function (req, res, next) {
    next(new appError_1.default("Not found", 404));
});
(0, server_1.default)(server).startServer();
