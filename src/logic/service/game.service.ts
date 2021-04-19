import _, { set } from "lodash";
import { SquareCord } from "@/logic/model/squareWithCord";
import { Square } from "@/logic/model/square";
import { Coord, Map2D } from "@/logic/service/grid.service";

class CordService {
  plantMine(c: SquareCord) {
    console.log("plant at", c.cord.x, c.cord.y);
    c.square.isBomb = true;
    c.neighbor.forEach((e) => {
      e.square.nMine++;
      e.square.nMineDisplay++;
    });
  }
}

const cordService = new CordService();

class GameSetting {
  width: number = 0;
  height: number = 0;
  numberOfMine: number = 0;
}

interface IGameService {
  setting: GameSetting;
  squares: Map2D<SquareCord>;
  get(c: Coord): SquareCord | undefined;
}

class GameService implements IGameService {
  setting: GameSetting;
  squares: Map2D<SquareCord>;

  constructor(setting: GameSetting = new GameSetting()) {
    this.setting = setting;
    this.squares = new Map2D<SquareCord>();
  }

  private neighborCord(c: Coord): SquareCord[] {
    const res: SquareCord[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const cord = this.squares.get({ x: c.x + x, y: c.y + y });
        if (cord) res.push(cord);
      }
    }
    return res;
  }

  get(c: Coord): SquareCord | undefined {
    return this.squares.get(c);
  }

  generateMap() {
    console.log("gen map");
    this.squares.clear();
    for (let x = 0; x < this.setting.width; x++) {
      for (let y = 0; y < this.setting.height; y++) {
        this.squares.set({ x, y }, new SquareCord({ x, y }, new Square()));
      }
    }
    this.squares.forEach((s, c) => {
      s.neighbor = this.neighborCord(c);
    });
  }

  generateMine() {
    console.log("gen mine");
    const cells = _.shuffle(this.squares.all()).slice(
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

export { IGameService, GameService, GameSetting };
