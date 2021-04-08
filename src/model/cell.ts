enum CellType {
  None = "-",
  Bomb = "x",
}

class Cell {
  type: CellType = CellType.None;
  reveal: boolean = false;
  number: number = 0;

  constructor() {}

  display(): string {
    if (this.reveal && this.type == CellType.Bomb) return "X";
    if (this.reveal) return this.number.toString();
    return "\xa0";
  }

  get btnType() {
    if (this.reveal && this.type == CellType.Bomb) return "danger";
    if (this.reveal) return "";
    return "info";
  }
  get class() {
    if (this.reveal && this.type == CellType.Bomb) return "text-red-900";
    switch (this.number) {
      case 1:
        return "text-indigo-900";
      case 2:
        return "text-green-500";
      case 3:
        return "text-yellow-700";
      case 4:
        return "text-purple-800";
      case 5:
        return "text-red-600";
      default:
        return "text-black-900";
    }
  }
}

export default Cell;

export { Cell, CellType };
