import { Cell } from "@/logic/model/cell";
import _, { set } from "lodash";
import { Map2D } from "@/logic/service/grid.service";
import { Coord } from "../model/coord";

class CordService {
  plantMine(c: Cell) {
    console.log("plant at", c.coord.x, c.coord.y);
    c.isBomb = true;
    c.neighbor.forEach((e) => {
      e.nMine++;
    });
  }
}

const cordService = new CordService();

class GameSetting {
  width: number = 0;
  height: number = 0;
  numberOfMine: number = 0;
}

class GameService {
  setting: GameSetting;
  cells: Map2D<Cell>;

  constructor(setting: GameSetting = new GameSetting()) {
    this.setting = setting;
    this.cells = new Map2D();
  }

  neighborCord(c: Coord): Cell[] {
    const res: Cell[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const cord = this.cells.get({ x: c.x + x, y: c.y + y });
        if (cord) res.push(cord);
      }
    }
    return res;
  }

  get(c: Coord): Cell | undefined {
    return this.cells.get(c);
  }

  generateMap() {
    console.log("gen map");
    this.cells.clear();
    for (let x = 0; x < this.setting.width; x++) {
      for (let y = 0; y < this.setting.height; y++) {
        this.cells.set({ x, y }, new Cell({ x, y }));
        // this.cells.set({ x, y }, new SquareCord({ x, y }, new Square()));
      }
    }
    this.cells.forEach((s, c) => {
      s.neighbor = this.neighborCord(c);
    });
  }

  generateMine() {
    console.log("gen mine");
    const cells = _.shuffle(this.cells.all()).slice(
      0,
      this.setting.numberOfMine
    );
    cells.forEach((e) => cordService.plantMine(e));
  }

  start(setting: GameSetting = this.setting) {
    this.setting = { ...setting };
    this.generateMap();
    this.generateMine();
  }
}

export { GameService, GameSetting };
