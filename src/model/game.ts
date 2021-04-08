import { Cell, CellType } from "@/model/cell";
import _ from "lodash";
class Game {
  width: number;
  height: number;
  numberOfBomb: number;
  field: Cell[][] = [];
  seed: string = "";
  gameOver: boolean = false;

  constructor(width: number, height: number, numberOfBomb = 0) {
    this.width = width;
    this.height = height;
    this.numberOfBomb = numberOfBomb;
  }

  reset() {
    this.gameOver = false;
    this.field = [];
    for (let i = 0; i < this.height; i++) {
      this.field.push([]);
      for (let j = 0; j < this.width; j++) {
        this.field[i].push(new Cell());
      }
    }
  }

  genBomb() {
    let cells = [..._.flatten(this.field)];
    cells = _.shuffle(cells);
    for (let i = 0; i < this.numberOfBomb; i++) cells[i].type = CellType.Bomb;
  }

  genNums() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.genNum(i, j);
      }
    }
  }
  genNum(x: number, y: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        const xtmp = x + i;
        const ytmp = y + j;
        if (xtmp < 0 || xtmp >= this.height) continue;
        if (ytmp < 0 || ytmp >= this.width) continue;
        if (this.field[xtmp][ytmp].type == CellType.Bomb) {
          this.field[x][y].number++;
        }
      }
    }
  }

  reveal() {
    _.flatten(this.field)
    .forEach((e) => {
      e.reveal = true;
    });
  }

  endGame(win: boolean) {
    this.reveal();
    this.gameOver = true;
  }

  trigger(x: number, y: number) {
    const cell = this.field[x][y];
    if (cell.type == CellType.Bomb) return this.endGame(false);
    this.spread(x, y);
  }
  spread(x: number, y: number) {
    if (x < 0 || x >= this.height) return;
    if (y < 0 || y >= this.width) return;
    const cell = this.field[x][y];
    if (cell.type === CellType.Bomb || cell.reveal) return;
    cell.reveal = true;
    if (cell.number === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          this.spread(x + i, y + j);
        }
      }
    }
  }

  start() {
    this.reset();
    this.genBomb();
    this.genNums();
    this.seed = Math.random().toString(36);
  }
}

export { Game };
