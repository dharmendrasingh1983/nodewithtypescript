"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pdfCreater_1 = require("./pdfCreater");
const humamusPdf_1 = require("./humamusPdf");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
        this.pdfCreator = pdfCreater_1.PdfCreater;
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        router.get('/pdf', (req, res, callback) => {
            // let pf = new PdfCreater();
            //pf.getPdf(res);     
            let hummPdfCreater = new humamusPdf_1.HummmsPdf();
            hummPdfCreater.getHummusPdf(res);
            /* res.setHeader('Content-disposition', 'attachment; filename=theDocument.pdf');
            res.setHeader('Content-type', 'text/plain');
            res.charset = 'UTF-8';
            res.write("Hello, world");
            res.end(); */
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map