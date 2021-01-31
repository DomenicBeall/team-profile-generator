const employee = require("../lib/Employee");

test("Employee is being constructed correctly", () => {
    expect(new employee("Dave", "1", "dom@domail.com").getName()).toBe("Dave");
});