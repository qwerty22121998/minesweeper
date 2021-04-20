import { Cell, Position } from "@/logic/model/cell";
import _ from "lodash";

interface GameSetting {
  width: number;
  height: number;
  numberOfBomb: number;
}
class GameService {
  setting: GameSetting;
  cells: Cell[][] = [];
  gameOver: boolean = false;

  constructor() {
    this.setting = {
      width: 0,
      height: 0,
      numberOfBomb: 0,
    };
  }

  createCells() {
    this.cells = [];
    for (let x = 0; x < this.setting.height; x++) {
      this.cells.push([]);
      for (let y = 0; y < this.setting.width; y++) {
        this.cells[x].push(new Cell({ x, y }));
      }
    }
  }

  neighbor(p: Position): Position[] {
    const res: Position[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x == 0 && y == 0) continue;
        const newP = { x: p.x + x, y: p.y + y };
        if (newP.x < 0 || newP.x >= this.setting.height) continue;
        if (newP.y < 0 || newP.y >= this.setting.width) continue;
        res.push(newP);
      }
    }
    return res;
  }

  placeMine({ x, y }: Position) {
    const neighbor: Position[] = this.neighbor({ x, y });
    const cell = this.cells[x][y];
    cell.isMine = true;
    neighbor.forEach(({ x, y }: Position) => {
      const nCell = this.cells[x][y];
      nCell.nMine++;
    });
  }

  generateMine() {
    _.shuffle(_.flatten(this.cells))
      .slice(0, this.setting.numberOfBomb)
      .forEach((cell) => {
        this.placeMine(cell.pos);
      });
  }

  start(s: GameSetting) {
    this.setting = s;
    this.createCells();
    this.generateMine();
  }
}

export { GameService };
