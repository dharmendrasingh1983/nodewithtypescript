"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const app_1 = require("./app");
describe('App', () => {
    it('works', () => supertest(app_1.default)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200));
});
//# sourceMappingURL=App.spec.js.map