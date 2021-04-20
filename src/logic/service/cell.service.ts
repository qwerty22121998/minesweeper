import { Cell, State } from "@/logic/model/cell";
class CellService {
  GetDisplayString(cell: Cell): string {
    switch (cell.state) {
      case State.Flag:
        return "🚩";
      case State.Cover:
        return "";
      case State.Uncover:
        return (cell.nMine - cell.nFlag).toString();
    }
  }

  GetButtonType(cell: Cell): string {
    if (cell.isTrigger) return "danger";
    switch (cell.state) {
      case State.Flag:
        return "warning";
      case State.Uncover:
        return cell.isMine ? "danger" : "default";
    }
    return "primary";
  }

  GetTextColor(cell: Cell): string {
    return "text-black-900";
  }
}

export { CellService };
