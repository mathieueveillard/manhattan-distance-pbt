type Coordinates = {
  x: number;
  y: number;
};

export const equalCoordinates = (a: Coordinates, b: Coordinates): boolean => a.x === b.x && a.y === b.y;

export const dimension1Distance = (a: number, b: number): number => Math.abs(a - b);

export const manhattanDistance = (a: Coordinates, b: Coordinates): number =>
  dimension1Distance(a.x, b.x) + dimension1Distance(a.y, b.y);
