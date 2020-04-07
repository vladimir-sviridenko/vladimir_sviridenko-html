let expect = chai.expect;

describe("sum(a, b)", () => {
  describe("Should validate type of passed arguments", () => {

    it("throw TypeError if a isn't number", () => {
      expect(sum.bind(null, {}, 1)).to.throw(TypeError, "arguments must be numbers");
    });

    it("throw TypeError if b isn't number", () => {
      expect(sum.bind(null, 1, true)).to.throw(TypeError, "arguments must be numbers");
    });

    it("throw TypeError if both arguments aren't numbers", () => {
      expect(sum.bind(null, "", null)).to.throw(TypeError, "arguments must be numbers");
    });

    it("throw TypeError if wasn't passed arguments", () => {
      expect(sum.bind(null)).to.throw(TypeError, "arguments must be numbers");
    });
  })

  describe("Should take Infinity arguments", () => {
    it("return Infinity if a = Infinity and b is number", () => {
      expect(sum(Infinity, 1)).to.equal(Infinity);
    });

    it("return Infinity if a is number and b = Infinity", () => {
      expect(sum(1, Infinity)).to.equal(Infinity);
    });

    it("return -Infinity if a = -Infinity and b is number", () => {
      expect(sum(-Infinity, 1)).to.equal(-Infinity);
    });

    it("return -Infinity if a is number and b = -Infinity", () => {
      expect(sum(1, -Infinity)).to.equal(-Infinity);
    });

    it("return NaN if a = Infinity and b = -Infinity", () => {
      expect(sum(Infinity, -Infinity)).to.be.NaN;
    });

    it("return NaN if a = -Infinity and b = Infinity", () => {
      expect(sum(-Infinity, Infinity)).to.be.NaN;
    });
  })

  describe("Should take NaN arguments", () => {
    it("return NaN if a is NaN", () => {
      expect(sum(NaN, 1)).to.be.NaN;
    });

    it("return NaN if b is NaN", () => {
      expect(sum(1, NaN)).to.be.NaN;
    });
  })

  describe("Should return sum of positive numbers correctly", () => {
    for (let i = 3; i <= 400; i += 142) {
      let a = 2 * i;
      let b = 3 * i;
      let expected = a + b;
      it(`sum of ${a} and ${b} equal ${expected}`, function () {
        expect(sum(a, b)).to.equal(expected);
      });
    }
  })

  describe("Should return sum of negative numbers correctly", () => {
    for (let i = -400; i < 0; i += 142) {
      let a = 2 * i;
      let b = 3 * i;
      let expected = a + b;
      it(`sum of ${a} and ${b} equal ${expected}`, function () {
        expect(sum(a, b)).to.equal(expected);
      });
    }
  })
})