// imports

public class PacMapCell {
  public final int id, x, y;
  public int points = 0;
  public int updatedAt;
  public boolean isDiscovered = false;
  public boolean isEmpty = false;
  public Pac targetedBy = null;
  public Pac over = null;
  // public final char cellChar;

  public PacMapCell(int id, int x, int y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  public void update(int points, int updatedAt) {
    this.updatedAt = updatedAt;
    this.isDiscovered = true;
    this.isEmpty = false;
    this.points = points;
  }

  public void setEmpty() {
    Player.d("PELLET : " + this.id);
    this.isDiscovered = true;
    this.isEmpty = true;
    this.points = 0;
    if (this.targetedBy != null)
      this.targetedBy.setTarget(null);
  }

  public void setTargetedBy(Pac pac) {
    this.targetedBy = pac;
  }

  public void resetTarget() {
    this.targetedBy = null;
  }

  @Override
  public String toString() {
    return "PacMapCell{pos=(" + x + ", " + y + ")" + ", points=" + points + ", isEmpty=" + isEmpty + "}";
  }
}
