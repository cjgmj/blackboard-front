export type UserInfo = {
  id: string;
  color: string;
  brushPath: BrushPath;
};

type BrushPath = {
  initialPoint: Point;
  points: Point[];
};

type Point = {
  x: number;
  y: number;
};
