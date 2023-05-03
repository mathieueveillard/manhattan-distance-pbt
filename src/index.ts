export const dimension1Distance = (a: number, b: number): number => Math.abs(a - b);

type Coordinates = {
  x: number;
  y: number;
};

const projection =
  (dimension: keyof Coordinates) =>
  (coordinates: Coordinates): number =>
    coordinates[dimension];

export const x = projection("x");

export const y = projection("y");

export const equalCoordinates = (a: Coordinates, b: Coordinates): boolean => x(a) === x(b) && y(a) === y(b);

export const manhattanDistance = (a: Coordinates, b: Coordinates): number =>
  dimension1Distance(x(a), x(b)) + dimension1Distance(y(a), y(b));
