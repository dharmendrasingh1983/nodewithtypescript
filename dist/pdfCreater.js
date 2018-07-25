"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfmaker = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
const fs = require("fs");
const PDFMerge = require("pdf-merge");
class PdfCreater {
    constructor() {
        this.numofPdf = 2;
        this.numcom = 0;
        this.pdfMake = pdfmaker;
        this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }
    generatePdf(res) {
        if (this.numcom < this.numofPdf) {
            let content = "";
            for (let i = 0; i <= 1000; i++) {
                content += 'This is an sample PDF printed with pdfMake' + '\n';
            }
            let docDefinition = { content: content };
            const pdfDocGenerator = this.pdfMake.createPdf(docDefinition);
            pdfDocGenerator.
                getBase64((data) => {
                let self = this;
                fs.writeFile(`image${this.numcom}.pdf`, { encoding: 'base64' }, function (err) {
                    console.log('File created');
                    self.numcom++;
                    setTimeout(() => { self.getPdf(res); }, 1000);
                });
            });
        }
        else {
            this.getPdf(res);
            this.numcom++;
        }
    }
    getPdf(res) {
        if (this.numcom < this.numofPdf)
            setTimeout(() => { this.generatePdf(res); }, 1000);
        else {
            let files = [];
            for (let i = 0; i < this.numofPdf; i++) {
                files.push(`image${i}.pdf`);
            }
            PDFMerge(files, { output: `final.pdf` })
                .then((buffer) => {
                let a = buffer;
            });
        }
    }
}
exports.PdfCreater = PdfCreater;
//# sourceMappingURL=pdfCreater.js.map