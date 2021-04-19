import { Coord } from "@/logic/service/grid.service";
import { Square } from "./square";

class SquareCord {
  cord: Coord;
  square: Square;
  neighbor: SquareCord[] = [];

  constructor(cord: Coord, square: Square) {
    this.cord = cord;
    this.square = square;
  }
}

export { SquareCord };
