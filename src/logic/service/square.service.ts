import { Square } from "../model/square";

class SquareService {
  getDisplayString(c: Square | undefined): string {
    if (!c) return "";
    if (c.isFlagged) return "🚩";
    if (c.isRevealed) {
      if (c.isBomb) return "💣";
      return c.nMineDisplay.toString();
    }
    return "\xa0";
  }

  getButtonType(c: Square): string {
    if (c.isHighlight) return "danger";
    if (c.isFlagged) return "warning";
    if (c.isRevealed) {
      if (c.isBomb) return "danger";
      return "default";
    }
    return "primary";
  }

  getTextColor(c: Square): string {
    const color = (color: string, variant: string | number) =>
      `text-${color}-${variant}`;
    switch (c.nMineDisplay) {
      case 1:
        return color("indigo", 900);
      case 2:
        return color("green", 500);
      case 3:
        return color("yellow", 700);
      case 4:
        return color("purple", 800);
      case 5:
        return color("red", 6000);
      default:
        return color("black", 900);
    }
  }
}

export default new SquareService();
