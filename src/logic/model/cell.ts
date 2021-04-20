enum State {
  Uncover,
  Cover,
  Flag,
}

interface Position {
  x: number;
  y: number;
}

class Cell {
  state: State = State.Cover;
  isMine: boolean = false;
  nMine: number = 0;
  nFlag: number = 0;
  isTrigger: boolean = false;
  pos: Position;

  constructor(pos: Position) {
    this.pos = pos;
  }

  // display(): string {
  //   if (this.flag) return "🚩";
  //   if (this.reveal && this.type == Type.Bomb) return "💣";
  //   if (this.reveal) return this.nMine.toString();
  //   return "\xa0";
  // }

  // get btnType() {
  //   if (this.isTrigger) return "danger";
  //   if (this.flag) return "warning";
  //   if (this.reveal && this.type == Type.Bomb) return "danger";
  //   if (this.reveal) return "default";
  //   return "primary";
  // }
  // get class() {
  //   if (this.reveal && this.type == Type.Bomb) return "text-red-900";
  //   switch (this.nMine) {
  //     case 1:
  //       return "text-indigo-900";
  //     case 2:
  //       return "text-green-500";
  //     case 3:
  //       return "text-yellow-700";
  //     case 4:
  //       return "text-purple-800";
  //     case 5:
  //       return "text-red-600";
  //     default:
  //       return "text-black-900";
  //   }
  // }

  // notice() {
  //   this.isTrigger = true;
  //   setTimeout(() => {
  //     this.isTrigger = false;
  //   }, 100);
  // }
}

export default Cell;

export { Cell, State, Position };
