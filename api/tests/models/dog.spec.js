const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dog = {
  id: 1,
  name: "Custom dog",
  weight: "5-7",
  height: "2-3",
  temperaments: [1, 2],
};

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe("Find All dogs in database", function () {
      it("should have length 0 if there is no dog created", async function () {
        expect(await Dog.findAll()).to.have.length(0);
      });
    });

    describe("Create a new dog", function () {
      it("Should have all mandatory properties dog is created succesfully", function () {
        Dog.create(dog).then(function (res) {
          expect(res).to.have.property("id");
          expect(res).to.have.property("name");
          expect(res).to.have.property("height");
          expect(res).to.have.property("weight");
          expect(res).to.have.property("temperaments");
        });
      });
    });
    describe("Create a new Dog", () => {
      it("Should throw an error if the dog is empty", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires mandatory fields")))
          .catch(() => done());
      });
    });
  });
});
