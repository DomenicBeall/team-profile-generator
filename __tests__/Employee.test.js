const Employee = require("../lib/Employee");
const employee = require("../lib/Employee");

describe("Employee", () => {

    describe("Initialisation", () => {

        it("Should set and get the initial values correctly", () => {
            const emp = new Employee("Steve", 1, "domenicbeall2@gmail.com");
    
            expect(emp.getName()).toEqual("Steve");
            expect(emp.getId()).toEqual(1);
            expect(emp.getEmail()).toEqual("domenicbeall2@gmail.com");
        });

    });

  });