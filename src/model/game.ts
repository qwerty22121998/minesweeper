import { Cell, CellType as Type } from "@/model/cell";
import _ from "lodash";

interface Cord {
  cell: Cell;
  x: number;
  y: number;
}

interface IGame {
  leftClick(x: number, y: number): void;
  rightClick(x: number, y: number): void;
  start(): void;
}

class Game implements IGame {
  width: number;
  height: number;
  numberOfBomb: number;
  cells: Cell[][] = [];
  seed: string = "";
  gameOver: boolean = false;

  constructor(width: number, height: number, numberOfBomb = 0) {
    this.width = width;
    this.height = height;
    this.numberOfBomb = numberOfBomb;
  }

  nearbyCells({ x, y }: Cord): Cord[] {
    const res = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        const xtmp = x + i;
        const ytmp = y + j;
        if (xtmp < 0 || ytmp < 0) continue;
        if (xtmp >= this.height || ytmp >= this.width) continue;
        res.push(this.cord(xtmp, ytmp));
      }
    }
    return res;
  }

  cord(x: number, y: number): Cord {
    return {
      cell: this.cells[x][y],
      x,
      y,
    };
  }
  leftClick(x: number, y: number) {
    const c = this.cord(x, y);
    if (c.cell.flag) return;
    if (!c.cell.reveal) return this.trigger(c);
  }

  rightClick(x: number, y: number) {
    const c = this.cord(x, y);
    if (!c.cell.reveal) return this.flag(c);
    if (c.cell.number > 0) return this.notice(c);
    if (c.cell.reveal) return this.spread(c);
  }

  flag(c: Cord) {
    const num = c.cell.flag ? 1 : -1;
    c.cell.flag = !c.cell.flag;
    this.nearbyCells(c).forEach((cord) => {
      cord.cell.number += num;
    });
  }

  reset() {
    this.gameOver = false;
    this.cells = [];
    for (let i = 0; i < this.height; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.width; j++) {
        this.cells[i].push(new Cell());
      }
    }
  }

  get cords(): Cord[] {
    const res: Cord[] = [];
    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        res.push(this.cord(x, y));
      }
    }
    return res;
  }

  genBomb() {
    const cord = _.shuffle(this.cords);
    for (let i = 0; i < this.numberOfBomb; i++) this.placeBomb(cord[i]);
  }

  placeBomb(c: Cord) {
    c.cell.type = Type.Bomb;
    c.cell.number = 99;
    this.nearbyCells(c)
      .filter((cord) => cord.cell.type !== Type.Bomb)
      .forEach((cord) => {
        cord.cell.number++;
        cord.cell.neabyBomb++;
      });
  }

  reveal() {
    _.flatten(this.cells).forEach((e) => {
      e.reveal = true;
      e.flag = false;
    });
  }

  endGame(win: boolean) {
    this.reveal();
    this.gameOver = true;
  }

  trigger(c: Cord) {
    if (c.cell.flag) return;
    if (c.cell.type == Type.Bomb) return this.endGame(false);
    this.spread(c);
  }

  spread(c: Cord) {
    c.cell.reveal = true;
    if (c.cell.number <= 0) {
      if (c.cell.type === Type.Bomb) return this.endGame(false);
      this.nearbyCells(c)
        .filter((c) => !c.cell.reveal)
        .forEach((c: Cord) => {
          this.spread(c);
        });
    }
  }

  notice(c: Cord) {
    this.nearbyCells(c)
      .filter((cord) => !cord.cell.reveal)
      .forEach((cord) => cord.cell.notice());
  }

  start() {
    this.reset();
    this.genBomb();
    // this.cord(1, 1).cell.type = Type.Bomb;
    // this.genNums();
    this.seed = Math.random().toString(36);
  }
}

export { IGame, Game };
