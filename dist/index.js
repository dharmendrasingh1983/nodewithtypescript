"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
global['abc'] = '';
/* var timeout = require('connect-timeout');
app.use(haltOnTimedout);
app.use(timeout(120000)); */
app_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
/* function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
  } */ 
//# sourceMappingURL=index.js.map