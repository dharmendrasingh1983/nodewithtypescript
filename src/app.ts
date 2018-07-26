import * as express from 'express'
import { PdfCreater } from './pdfCreater';

export default class App {
  public express
  pdfCreator: any;
  constructor() {

    this.express = express()
    this.mountRoutes()
    this.pdfCreator = PdfCreater;
  }

  private mountRoutes(): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      });
    });
    router.get('/pdf', (req, res, callback) => {
      // let pf = new PdfCreater();
      //pf.getPdf(res);     
      let container = req.app.get('context');
      let hummPdfCreator = container.get('HummmsPdf');
      hummPdfCreator.getHummusPdf(res);

      /* res.setHeader('Content-disposition', 'attachment; filename=theDocument.pdf');
      res.setHeader('Content-type', 'text/plain');
      res.charset = 'UTF-8';
      res.write("Hello, world");
      res.end(); */
    });
    this.express.use('/', router)
  }
}

//export default new App().express