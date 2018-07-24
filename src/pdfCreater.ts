
import * as pdfmaker from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as fs from 'fs';
import PDFMerge = require('pdf-merge');
export class PdfCreater {
    pdfMake: any;
    constructor() {
        this.pdfMake = pdfmaker;
        this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    numofPdf = 2;
    numcom = 0;
    private generatePdf(res) {
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

    public getPdf(res) {
        if (this.numcom < this.numofPdf)
            setTimeout(() => { this.generatePdf(res); }, 1000);
        else {
            let files = [];
            for (let i = 0; i < this.numofPdf; i++) {
                files.push(`image${i}.pdf`)
            }
            PDFMerge(files, { output: `final.pdf` })
                .then((buffer) => { 
                    let a=buffer;
                });
        }
    }

}