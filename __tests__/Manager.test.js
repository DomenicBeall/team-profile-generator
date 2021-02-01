const Manager = require("../lib/Manager");

describe("Manager", () => {

    describe("Initialisation", () => {

        it("Should set and get the initial values correctly", () => {
            const emp = new Manager("Steve", 1, "domenicbeall2@gmail.com", 1);
    
            expect(emp.getName()).toEqual("Steve");
            expect(emp.getId()).toEqual(1);
            expect(emp.getEmail()).toEqual("domenicbeall2@gmail.com");
            expect(emp.getOffice()).toEqual(1);
            expect(emp.getRole()).toEqual("Intern");
        });

    });

  });