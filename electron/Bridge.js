"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const utils_1 = require("./utils");
class Bridge {
    constructor(main) {
        this.main = main;
        this.bridgeCommands = {
            'addDevToolsMenu': this.addDevToolsMenu,
            'reload': this.reload,
            'getLocale': this.getLocale,
            'download': this.download
        };
    }
    transfer(command, data) {
        if (this.bridgeCommands.hasOwnProperty(command)) {
            try {
                const result = this.bridgeCommands[command].call(this, data);
                if (result && result.then) {
                    return result;
                }
                else {
                    return Promise.resolve(result);
                }
            }
            catch (e) {
                return Promise.reject(e);
            }
        }
        else {
            return Promise.reject(new Error('Wrong command!'));
        }
    }
    download(data) {
        return new Promise((resolve, reject) => {
            const path = electron_1.app.getPath('downloads');
            const options = { defaultPath: path_1.join(path, data.fileName) };
            electron_1.dialog.showSaveDialog(this.main.mainWindow, options, function (filename) {
                if (filename) {
                    return utils_1.writeFile(filename, data.fileContent).then(resolve, reject);
                }
                else {
                    return reject(new Error('Cancel'));
                }
            });
        });
    }
    getLocale() {
        return electron_1.app.getLocale() || 'en';
    }
    addDevToolsMenu() {
        const item = new electron_1.MenuItem({
            label: 'God Mode',
            submenu: [{
                    role: 'toggledevtools'
                }]
        });
        this.main.menu.append(item);
        electron_1.Menu.setApplicationMenu(this.main.menu);
    }
    reload() {
        this.main.mainWindow.reload();
    }
}
exports.Bridge = Bridge;
//# sourceMappingURL=Bridge.js.map