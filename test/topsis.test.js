const linearAlgebra = require("linear-algebra")();
const Matrix = linearAlgebra.Matrix;
const topsis = require("../index.js");

let m = new Matrix([
  [2, 5, 5],
  [60, 26, 4],
  [20, 20, 4],
  [500, 2, 4],
  [50, 23, 3],
  [25, 10, 1],
]);
let w = [0.27, 0.33, 0.4];
let ia = ["min", "min", "max"];

let result = null;

describe("getBest", () => {
  it("should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data", () => {
    result = topsis.getBest(m, w, ia);
    console.log(result);
    expect(result).toHaveLength(m.cols);
  });
});

describe("getBestWithRandom", () => {
  it("should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data", () => {
    // Creating random arguments to test
    const args = topsis.createRandom();

    m = args.m;
    w = args.w;
    ia = args.ia;

    console.log(m, w, ia);

    let nc = m.cols;

    result = topsis.getBest(m, w, ia);
    console.log(result);
    expect(result).toHaveLength(nc);
  });
});

describe("getArrays", () => {
  it("should return correctly sorted alternatives", () => {
    const m = new Matrix([
      [4, 5, 5],
      [5, 6, 5],
      [1, 1, 1],
      [5, 5, 5],
    ]);
    const w = [0.1, 0.1, 0.1];
    const ia = ["max", "max", "max"];

    const result = topsis.getArrays(m, w, ia);

    console.log(result);

    expect(result).toEqual([
      [5, 6, 5],
      [5, 5, 5],
      [4, 5, 5],
      [1, 1, 1],
    ]);
  });
});

describe("getSorted", () => {
  it("should return correctly sorted alternatives by ps", () => {
    const m = new Matrix([
      [2, 5, 5],
      [60, 26, 4],
      [20, 20, 4],
      [500, 2, 4],
      [50, 23, 3],
      [25, 10, 1],
    ]);
    const w = [0.27, 0.33, 0.4];
    const ia = ["min", "min", "max"];

    const result = topsis.getSorted(m, w, ia);

    // Assuming that getSorted returns an array of alternatives sorted in descending order of score
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].ps).toBeGreaterThanOrEqual(result[i + 1].ps);
    }
  });

  it('should handle "min" impact correctly', () => {
    const m = new Matrix([
      [2, 9, 9],
      [9, 1, 1],
      [9, 2, 2],
      [9, 3, 3],
      [1, 9, 9],
      [9, 0, 0],
    ]);
    const w = [0.1, 0.1, 0.1];
    const ia = ["min", "max", "max"];

    const result = topsis.getSorted(m, w, ia);

    // Assuming that for 'min' impact, a lower value in the matrix leads to a higher performance score
    // Check that the alternative with the lowest value in the first column has the highest performance score
    const minValue = Math.min(...m.data.map((row) => row[0]));
    const maxValue = Math.max(...result.map((alternative) => alternative.ps));
    const alternativeWithMinValue = result.find(
      (alternative) => alternative.data[0] === minValue
    );

    expect(alternativeWithMinValue.ps).toBe(maxValue);
  });
});
