import { assert, property, integer, record, pre, IntegerConstraints } from "fast-check";
import { equalCoordinates, dimension1Distance, manhattanDistance, x, y } from ".";

describe("One dimension distance", () => {
  test("Separation", () => {
    assert(
      property(integer(), (a) => {
        return dimension1Distance(a, a) === 0;
      })
    );
  });

  test("Separation (reciprocity)", () => {
    assert(
      property(integer({ min: -10, max: 10 }), integer({ min: -10, max: 10 }), (a, b) => {
        pre(dimension1Distance(a, b) === 0);
        return a === b;
      })
    );
  });

  test("Symetry", () => {
    assert(
      property(integer(), integer(), (a, b) => {
        return dimension1Distance(a, b) === dimension1Distance(b, a);
      })
    );
  });

  test("Triangular inequality", () => {
    assert(
      property(integer(), integer(), integer(), (a, b, c) => {
        return dimension1Distance(a, c) <= dimension1Distance(a, b) + dimension1Distance(b, c);
      })
    );
  });
});

const NO_CONSTRAINT: IntegerConstraints = {
  min: -0x80000000,
  max: 0x7fffffff,
};

const coordinates = (constraints: IntegerConstraints = NO_CONSTRAINT) =>
  record({
    x: integer(constraints),
    y: integer(constraints),
  });

describe("Manhattan distance", () => {
  test("Separation", () => {
    assert(
      property(coordinates(), (a) => {
        return manhattanDistance(a, a) === 0;
      })
    );
  });

  test("Separation (reciprocity)", () => {
    assert(
      property(coordinates({ min: -4, max: 4 }), coordinates({ min: -4, max: 4 }), (a, b) => {
        pre(manhattanDistance(a, b) === 0);
        return equalCoordinates(a, b);
      })
    );
  });

  test("Symetry", () => {
    assert(
      property(coordinates(), coordinates(), (a, b) => {
        return manhattanDistance(a, b) === manhattanDistance(b, a);
      })
    );
  });

  test("Triangular inequality", () => {
    assert(
      property(coordinates(), coordinates(), coordinates(), (a, b, c) => {
        return manhattanDistance(a, c) <= manhattanDistance(a, b) + manhattanDistance(b, c);
      })
    );
  });

  test("Triangular equality (caracteristic of the Manhattan distance)", () => {
    assert(
      property(
        coordinates({ min: -10, max: 10 }),
        coordinates({ min: -10, max: 10 }),
        coordinates({ min: -10, max: 10 }),
        (a, b, c) => {
          pre(x(a) <= x(b) && x(b) <= x(c) && y(a) <= y(b) && y(b) <= y(c));
          return manhattanDistance(a, c) === manhattanDistance(a, b) + manhattanDistance(b, c);
        }
      )
    );
  });
});
