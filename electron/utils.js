"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function exist(path) {
    const exists = fs_1.existsSync(path);
    if (exists) {
        return Promise.resolve();
    }
    else {
        return Promise.reject(new Error(`File with path ${path} does not exist!`));
    }
}
exports.exist = exist;
function read(path) {
    return exist(path).then(() => {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path, 'utf8', (error, file) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(file);
                }
            });
        });
    });
}
exports.read = read;
function readJSON(path) {
    return read(path).then((file) => JSON.parse(file));
}
exports.readJSON = readJSON;
function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs_1.writeFile(path, content, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.writeFile = writeFile;
function writeJSON(path, content) {
    return writeFile(path, JSON.stringify(content));
}
exports.writeJSON = writeJSON;
//# sourceMappingURL=utils.js.map