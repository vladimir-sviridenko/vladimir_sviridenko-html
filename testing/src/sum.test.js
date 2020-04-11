let expect = chai.expect;

describe("sum(a, b), base requirements:", () => {

  it("Should throw TypeError if one of arguments isn't number", () => {
    expect(sum.bind(null, {}, 1)).to.throw(TypeError, "arguments must be numbers");
    expect(sum.bind(null, 1, true)).to.throw(TypeError, "arguments must be numbers");
    expect(sum.bind(null, 1, BigInt(4))).to.throw(TypeError, "arguments must be numbers");
    expect(sum.bind(null, undefined, 1)).to.throw(TypeError, "arguments must be numbers");
    expect(sum.bind(null, "", null)).to.throw(TypeError, "arguments must be numbers");
    expect(sum.bind(null)).to.throw(TypeError, "arguments must be numbers");
  });

  it("Should return Infinity if arguments are Infinity and number", () => {
    expect(sum(Infinity, 1)).to.equal(Infinity);
    expect(sum(1, Infinity)).to.equal(Infinity);
    expect(sum(Infinity, Infinity)).to.equal(Infinity);
    expect(sum(-Infinity, 1)).to.equal(-Infinity);
    expect(sum(1, -Infinity)).to.equal(-Infinity);
    expect(sum(-Infinity, -Infinity)).to.equal(-Infinity);
  });

  it("Should return NaN if arguments are Infinity and -Infinity", () => {
    expect(sum(Infinity, -Infinity)).to.be.NaN;
    expect(sum(-Infinity, Infinity)).to.be.NaN;
  });

  it("Should return NaN if one of arguments is Nan", () => {
    expect(sum(NaN, 1)).to.be.NaN;
    expect(sum(1, NaN)).to.be.NaN;
    expect(sum(NaN, NaN)).to.be.NaN;
  });

  it("Should return sum of numbers correctly", () => {
    for (let i = -400; i <= 400; i += 142) {
      let a = 2 * i, b = 3 * i;
      let expected = a + b;
      expect(sum(a, b)).to.equal(expected);
    }
  });
  
});