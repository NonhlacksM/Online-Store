function calculator(num1, operator, num2) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) {
          return "Cannot divide by zero";
        }
        return num1 / num2;
      default:
        return "Invalid operator";
    }
  }
  describe("calculator function", () => {
    it("adds two numbers correctly", () => {
      expect(calculator(2, "+", 3)).toEqual(5);
    });
  
    it("subtracts two numbers correctly", () => {
      expect(calculator(5, "-", 3)).toEqual(2);
    });
  
    it("multiplies two numbers correctly", () => {
      expect(calculator(2, "*", 3)).toEqual(6);
    });
  
    it("divides two numbers correctly", () => {
      expect(calculator(6, "/", 3)).toEqual(2);
    });
  
    it("returns error message if dividing by zero", () => {
      expect(calculator(6, "/", 0)).toEqual("Cannot divide by zero");
    });
  
    it("returns error message if operator is invalid", () => {
      expect(calculator(6, "invalid", 3)).toEqual("Invalid operator");
    });
  });