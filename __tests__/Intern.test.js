const Intern = require("../lib/Intern");

describe("Intern", () => {

    describe("Initialisation", () => {

        it("Should set and get the initial values correctly", () => {
            const emp = new Intern("Steve", 1, "domenicbeall2@gmail.com", "Harvard");
    
            expect(emp.getName()).toEqual("Steve");
            expect(emp.getId()).toEqual(1);
            expect(emp.getEmail()).toEqual("domenicbeall2@gmail.com");
            expect(emp.getSchool()).toEqual("Harvard");
            expect(emp.getRole()).toEqual("Intern");
        });

    });

  });