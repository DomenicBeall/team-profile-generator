const Employee = require("../lib/Employee");
const employee = require("../lib/Employee");

describe("Employee", () => {
    // Positive test
    it("Should set and get the initial values correctly", () => {
      // Arrange
      const emp = new Employee("Steve", 1, "domenicbeall2@gmail.com");

      // Assert
      expect(emp.getName()).toEqual("Steve");
      expect(emp.getId()).toEqual(1);
      expect(emp.getEmail()).toEqual("domenicbeall2@gmail.com");
    });
  });