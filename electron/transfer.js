"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
function transfer(message, data = Object.create(null)) {
    return main_1.main.bridge.transfer(message, data);
}
exports.transfer = transfer;
//# sourceMappingURL=transfer.js.map