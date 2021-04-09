enum Type {
  None = "-",
  Bomb = "x",
}

class Cell {
  type: Type = Type.None;
  reveal: boolean = false;
  flag: boolean = false;
  neabyBomb: number = 0;
  number: number = 0;
  disabled: boolean = false;

  constructor() {}

  display(): string {
    if (this.flag) return "🚩";
    if (this.reveal && this.type == Type.Bomb) return "💣";
    if (this.reveal) return this.neabyBomb.toString();
    return "\xa0";
  }

  get btnType() {
    if (this.disabled) return "danger";
    if (this.flag) return "warning";
    if (this.reveal && this.type == Type.Bomb) return "danger";
    if (this.reveal) return "default";
    return "primary";
  }
  get class() {
    if (this.reveal && this.type == Type.Bomb) return "text-red-900";
    switch (this.neabyBomb) {
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

  notice() {
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, 100);
  }
}

export default Cell;

export { Cell, Type as CellType };
