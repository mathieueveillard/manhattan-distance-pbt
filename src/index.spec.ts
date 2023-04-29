import fc from "fast-check";
import { equalCoordinates, dimension1Distance, manhattanDistance } from ".";

describe("One dimension distance", () => {
  test("Separation", () => {
    fc.assert(
      fc.property(fc.nat(), (a) => {
        return dimension1Distance(a, a) === 0;
      })
    );
  });

  test("Separation (reciprocity)", () => {
    fc.assert(
      fc.property(fc.nat({ max: 10 }), fc.nat({ max: 10 }), (a, b) => {
        fc.pre(dimension1Distance(a, b) === 0);
        return a === b;
      })
    );
  });

  test("Symetry", () => {
    fc.assert(
      fc.property(fc.nat(), fc.nat(), (a, b) => {
        return dimension1Distance(a, b) === dimension1Distance(b, a);
      })
    );
  });

  test("Triangular inequality", () => {
    fc.assert(
      fc.property(fc.nat(), fc.nat(), fc.nat(), (a, b, c) => {
        return dimension1Distance(a, c) <= dimension1Distance(a, b) + dimension1Distance(b, c);
      })
    );
  });
});

describe("Manhattan distance", () => {
  test("Separation", () => {
    fc.assert(
      fc.property(fc.record({ x: fc.nat(), y: fc.nat() }), (a) => {
        return manhattanDistance(a, a) === 0;
      })
    );
  });

  test("Separation (reciprocity)", () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        (a, b) => {
          fc.pre(manhattanDistance(a, b) === 0);
          return equalCoordinates(a, b);
        }
      )
    );
  });

  test("Symetry", () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        (a, b) => {
          return manhattanDistance(a, b) === manhattanDistance(b, a);
        }
      )
    );
  });

  test("Triangular inequality", () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        (a, b, c) => {
          return manhattanDistance(a, c) <= manhattanDistance(a, b) + manhattanDistance(b, c);
        }
      )
    );
  });

  test("Triangular equality (caracteristic of the Manhattan distance)", () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        fc.record({ x: fc.nat({ max: 6 }), y: fc.nat({ max: 6 }) }),
        (a, b, c) => {
          fc.pre(b.x >= a.x && b.x <= c.x && b.y >= a.y && b.y <= c.y);
          return manhattanDistance(a, c) === manhattanDistance(a, b) + manhattanDistance(b, c);
        }
      )
    );
  });
});
