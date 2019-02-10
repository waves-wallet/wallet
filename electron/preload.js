"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Storage_1 = require("./Storage");
const electron_1 = require("electron");
process.once('loaded', () => {
    global.WebStorage = new Storage_1.Storage();
    global.openInBrowser = function (url) {
        electron_1.shell.openExternal(url);
    };
    global.transfer = electron_1.remote.require('./transfer').transfer;
});
//# sourceMappingURL=preload.js.map