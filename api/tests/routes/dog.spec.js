/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn } = require("../../src/db.js");

const agent = session(app);

describe("Temperaments route", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /temperaments", function () {
    it("should return all temperaments", function () {
      agent
        .get("/temperaments")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.have.length(124);
        });
    });
  });
});
