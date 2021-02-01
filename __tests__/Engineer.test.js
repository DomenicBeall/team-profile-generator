const Engineer = require("../lib/Engineer");

describe("Engineer", () => {

    describe("Initialisation", () => {

        it("Should set and get the initial values correctly", () => {
            const emp = new Engineer("Steve", 1, "domenicbeall2@gmail.com", "DomenicBeall");
    
            expect(emp.getName()).toEqual("Steve");
            expect(emp.getId()).toEqual(1);
            expect(emp.getEmail()).toEqual("domenicbeall2@gmail.com");
            expect(emp.getGithub()).toEqual("DomenicBeall");
        });

    });

  });