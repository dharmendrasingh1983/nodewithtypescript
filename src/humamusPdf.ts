


export class HummmsPdf {
    comdown = 0;
    mergComdown = 0;
    path = "./pdfFolder/";  
    constructor() {
       

    }

    createPdf(res, pdfnum) {
        const HummusRecipe = require('hummus-recipe');
        let fileName = `${this.path}${pdfnum}-input.pdf`;
        const pdfDoc = new HummusRecipe('new', fileName);
        let pdf = pdfDoc.createPage('letter-size');
        let content = '';
        let pages = 0;
        for (let i = 0; i <= 1050; i++) {

            if (i > 0 && i % 70 === 0) {
                pdf.createPage('A4', 90)
                pdf.text(content, 0, 0).endPage();
                content = '';
                pages++;
            }
            else {
                content += `${i} This is an sample PDF printed with pdfMake  \n`;

            }


        }
        pdf.endPDF(() => {
            let dateTime = require('node-datetime');
            let dt = dateTime.create();
            let dtFormated = dt.format('Y-m-d H:M:S');

            if (this.comdown == 120) {
                console.log("File Creation Completed.");
                console.log(dtFormated);
                this.murgePdf(res);
            }
            console.log(`file Creating :-${fileName}`);
            console.log(dtFormated);
            this.comdown++;
            //  res.end();
        });

    }


    public getHummusPdf(res) {
        res.setTimeout(0);
        const HummusRecipe = require('hummus-recipe');
        const prePdfDoc = new HummusRecipe('new', `${this.path}final.pdf`, {
            version: 1.6,
            author: 'John Doe',
            title: 'Hummus Recipe',
            subject: 'A brand new PDF'
        });

        prePdfDoc
            .createPage('letter-size')
            .endPage()
            .endPDF(() => {
                for (let i = 0; i < 121; i++) {
                    setTimeout(() => {
                        this.createPdf(res, i);
                    }, 100);
                }
            });


        this.murgePdf(res);
    }

    private murgePdf(res) {
        var fs = require('fs');
        const PATH = require('path');
        let self = this;
        fs.readdir(this.path, function (err, filenames) {
            if (err) {
                return;
            }
            let numberOfFiles = 0;
            let splitAtay = [];
            filenames.forEach(function (filename) {
                if (filename !== "final.pdf") {
                    let name = PATH.parse(filename).name;
                    let num = Number(name.split("-")[0]);
                    splitAtay.push({ filename: filename, sno: num });
                }
            });
            let sortedFildes = splitAtay.sort((x, y) => {
                return x.sno - y.sno;
            });
            sortedFildes.forEach(x => {
                let file = x.filename;
                let name = PATH.parse(file).name;
                // get current file extension
                let ext = PATH.parse(file).ext;
                if (ext === '.pdf' && name !== "final" && name !== "input") {
                    numberOfFiles++;
                    setTimeout((self) => {
                        try {

                            const HummusRecipe = require('hummus-recipe');
                            const pdfDoc = new HummusRecipe(`${self.path}final.pdf`, `${self.path}final.pdf`);
                            pdfDoc

                                .appendPage(`${self.path}${file}`)
                                .endPDF(() => {
                                    self.mergComdown += 1;
                                    if (numberOfFiles === self.mergComdown) {
                                        console.log('Pdf Process Done');
                                        let dateTime = require('node-datetime');
                                        let dt = dateTime.create();
                                        let dtFormated = dt.format('Y-m-d H:M:S');
                                        console.log(dtFormated);
                                        res.write("Pdf File Creation Completed!");
                                        res.end();
                                    }
                                    console.log(`${self.path}${file}`);

                                });
                        }
                        catch (e) {
                            let a = e;
                            res.write("Pdf File Creation Failed!");
                            res.end();
                        }

                    }, 100, self);

                }
            });
          
        });
    }

}