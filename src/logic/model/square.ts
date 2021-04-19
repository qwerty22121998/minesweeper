class Square {
  key: Symbol;
  isBomb: boolean = false;
  isRevealed: boolean = false;
  isFlagged: boolean = false;
  isHighlight: boolean = false;

  nMine: number = 0;
  nMineDisplay: number = 0;

  constructor() {
    this.key = Symbol();
  }
}

export { Square };
