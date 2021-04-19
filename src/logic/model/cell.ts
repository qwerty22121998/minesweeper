import { Coord } from "./coord";

enum State {
  Uncovered,
  Covered,
  Flagged,
}

class Cell {
  coord: Coord;
  isBomb: boolean = false;
  state: State = State.Uncovered;
  nMine: number = 0;
  nNeighborFlagged: number = 0;
  neighbor: Cell[] = [];

  constructor(c: Coord) {
    this.coord = c;
  }
}

export { State, Cell };
