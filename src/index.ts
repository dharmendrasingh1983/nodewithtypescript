import app from './app'
import IocContainer from './iocContainer';
import { HummmsPdf } from './humamusPdf';
import { IocInjcection } from './iocInecton';
const port = process.env.PORT || 3000

global['abc'] = '';
/* var timeout = require('connect-timeout');
app.use(haltOnTimedout);
app.use(timeout(120000)); */
let appStart = new app().express;

// Ioc Container Setup

const container = new IocContainer();
container.register('app', appStart);
container.register('IocInjcection', IocInjcection);
container.register('HummmsPdf', HummmsPdf, ['IocInjcection']);
appStart.set('context', container);



appStart.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});

/* function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
  } */