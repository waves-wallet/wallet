"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Bridge_1 = require("./Bridge");
const url_1 = require("url");
const path_1 = require("path");
const utils_1 = require("./utils");
const CONFIG = {
    META_PATH: path_1.join(electron_1.app.getPath('userData'), 'meta.json'),
    MIN_SIZE: {
        width: 400,
        height: 500
    },
    FIRST_OPEN_SIZES: {
        MIN_SIZE: {
            width: 1024,
            height: 768
        },
        MAX_SIZE: {
            width: 1440,
            height: 960
        }
    }
};
const MENU_LIST = [
    {
        label: 'Application',
        submenu: [
            { label: 'Quit', accelerator: 'Command+Q', click: () => electron_1.app.quit() }
        ]
    }, {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
    }
];
class Main {
    constructor() {
        this.mainWindow = null;
        this.bridge = new Bridge_1.Bridge(this);
        this.dataPromise = Main.loadMeta();
        this.setHandlers();
    }
    createWindow() {
        this.dataPromise.then((meta) => {
            const pack = require('./package.json');
            this.mainWindow = new electron_1.BrowserWindow(Main.getWindowOptions(meta));
            this.mainWindow.loadURL(url_1.format({
                pathname: pack.server,
                protocol: 'https:',
                slashes: true
            }), { 'extraHeaders': 'pragma: no-cache\n' });
            this.mainWindow.on('closed', () => {
                this.mainWindow = null;
            });
            this.mainWindow.webContents.on('will-navigate', function (event, url) {
                if (!url.includes(pack.server)) {
                    event.preventDefault();
                }
            });
            const onChangeWindow = Main.asyncHandler(() => {
                const [x, y] = this.mainWindow.getPosition();
                const [width, height] = this.mainWindow.getSize();
                const isFullScreen = this.mainWindow.isFullScreen();
                return Main.updateMeta({ x, y, width, height, isFullScreen });
            }, 200);
            this.mainWindow.on('move', onChangeWindow);
            this.mainWindow.on('resize', onChangeWindow);
            this.mainWindow.on('enter-full-screen', onChangeWindow);
            this.mainWindow.on('leave-full-screen', onChangeWindow);
        });
    }
    setHandlers() {
        electron_1.app.on('ready', () => this.onAppReady());
        electron_1.app.on('window-all-closed', Main.onAllWindowClosed);
        electron_1.app.on('activate', () => this.onActivate());
    }
    onAppReady() {
        this.createWindow();
        this.menu = electron_1.Menu.buildFromTemplate(MENU_LIST);
        electron_1.Menu.setApplicationMenu(this.menu);
    }
    onActivate() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (!this.mainWindow) {
            this.createWindow();
        }
    }
    static onAllWindowClosed() {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    }
    static loadMeta() {
        return utils_1.readJSON(CONFIG.META_PATH).catch(() => {
            return utils_1.writeJSON(CONFIG.META_PATH, {}).then(() => ({}));
        });
    }
    static updateMeta({ x, y, width, height, isFullScreen }) {
        return Main.loadMeta().then((meta) => {
            meta.lastOpen = {
                width, height, x, y, isFullScreen
            };
            return utils_1.writeJSON(CONFIG.META_PATH, meta);
        });
    }
    static getWindowOptions(meta) {
        const fullscreen = meta.lastOpen && meta.lastOpen.isFullScreen;
        const display = electron_1.screen.getPrimaryDisplay();
        let width, height, x, y;
        if (meta.lastOpen) {
            width = meta.lastOpen.width;
            height = meta.lastOpen.height;
            x = meta.lastOpen.x;
            y = meta.lastOpen.y;
        }
        else {
            const size = Main.getStartSize({ width: display.workAreaSize.width, height: display.size.height });
            width = size.width;
            height = size.height;
            x = (display.size.width - width) / 2;
            y = (display.size.height - height) / 2;
        }
        return {
            minWidth: CONFIG.MIN_SIZE.width,
            minHeight: CONFIG.MIN_SIZE.height,
            icon: path_1.join(__dirname, 'img', 'icon.png'),
            fullscreen, width, height, x, y,
            webPreferences: {
                preload: path_1.join(__dirname, 'preload.js'),
                nodeIntegration: false
            }
        };
    }
    static getStartSize(size) {
        const width = Math.max(Math.min(size.width, CONFIG.FIRST_OPEN_SIZES.MAX_SIZE.width), CONFIG.FIRST_OPEN_SIZES.MIN_SIZE.width);
        const height = Math.max(Math.min(size.height, CONFIG.FIRST_OPEN_SIZES.MAX_SIZE.height), CONFIG.FIRST_OPEN_SIZES.MIN_SIZE.height);
        return { width, height };
    }
    static asyncHandler(handler, timeout) {
        let timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                timer = null;
                handler();
            }, timeout);
        };
    }
}
exports.main = new Main();
//# sourceMappingURL=main.js.map