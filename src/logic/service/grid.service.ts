interface Coord {
  x: number;
  y: number;
}

class Map2D<T> {
  data: Map<number, Map<number, T>>;

  constructor() {
    this.data = new Map();
  }

  set(cord: Coord, value: T) {
    if (!this.data.get(cord.x)) {
      this.data.set(cord.x, new Map());
    }
    const xAxis = this.data.get(cord.x);
    xAxis?.set(cord.y, value);
  }

  get(cord: Coord): T | undefined {
    const data = this.data.get(cord.x)?.get(cord.y);
    return data;
  }

  clear() {
    this.data.clear();
  }

  forEach(callbackfn: (value: T, key: Coord, map: Map2D<T>) => void): void {
    this.data.forEach((line, x) => {
      line.forEach((value, y) => {
        callbackfn(value, { x, y }, this);
      });
    });
  }

  all(): T[] {
    const res: T[] = [];
    this.forEach((v) => {
      res.push(v);
    });
    return res;
  }
}

export { Coord, Map2D };
