import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Stream;

// imports

public class Pac {
  public static enum Type {
    ROCK, PAPER, SCISSORS
  }

  public int pacNo;
  public int pacId;
  public PacMapCell mapPos;
  public PacMapCell target = null;
  public PacMap.BDSearch paths;
  public boolean mine;
  public boolean isEvil = false;

  public Type pacType;
  public int abilityCooldown = 0;
  public int speedTurnsLeft = 0;

  public Pac(int pacNo, int pacId, PacMapCell mapPos, boolean mine, String typeId, int speedTurnsLeft,
      int abilityCooldown) {
    this.pacNo = pacNo;
    this.pacId = pacId;
    this.mapPos = mapPos;
    this.mine = mine;
    switch (typeId) {
      case "ROCK":
        this.pacType = Type.ROCK;
        break;
      case "SCISSORS":
        this.pacType = Type.SCISSORS;
        break;
      case "PAPER":
        this.pacType = Type.PAPER;
        break;
    }
    this.speedTurnsLeft = speedTurnsLeft;
    this.abilityCooldown = abilityCooldown;
    Player.d("??? " + this.toString());
  }

  @Override
  public String toString() {
    return "Pac{" + "pacId=" + pacId + ", mapPos=" + mapPos + ", mine=" + mine + ", pacType=" + pacType + "}";
  }

  public boolean hasAbility() {
    return this.abilityCooldown == 0;
  }

  public boolean isUsingSpeed() {
    return this.speedTurnsLeft > 0;
  }

  public void markAbilityUsed() {
    this.abilityCooldown = 10;
  }

  public void markSpeedUsed() {
    this.abilityCooldown = 10;
    this.speedTurnsLeft = 5;
  }

  public void updateAbility(String typeId, int speedTurnsLeft, int abilityCooldown) {
    this.speedTurnsLeft = speedTurnsLeft;
    this.abilityCooldown = abilityCooldown;
    switch (typeId) {
      case "ROCK":
        this.pacType = Type.ROCK;
        break;
      case "SCISSOR":
        this.pacType = Type.SCISSORS;
        break;
      case "PAPER":
        this.pacType = Type.PAPER;
        break;
    }
  }

  public Stream<PacMapCell> getVisibility(PacMap map) {
    ArrayList<PacMapCell> list = new ArrayList<>();
    int[] directions = new int[] { -map.width, -1, map.width, 1 };
    boolean[] done = new boolean[4];
    PacMapCell from = this.mapPos;
    list.add(from);
    for (int d = 0, i = 1; d < 4; i++)
      for (int o = 0; o < 4; o++)
        if (!done[o]) {
          int destPos = directions[o] * i + from.id;
          int destY = map.getY(destPos);
          if (o % 2 == 1) // horizontal
            destPos += from.y - destY;
          PacMapCell dest = map.get(destPos);
          if (done[o] = (dest == null))
            d++; // A wall in this direction
          else
            list.add(dest);
        }
    return list.stream();
  };

  public boolean canEat(Pac pac2) {
    if (this.mine == pac2.mine)
      return false;

    if (this.pacType == Type.PAPER)
      return pac2.pacType == Type.ROCK;
    if (this.pacType == Type.ROCK)
      return pac2.pacType == Type.SCISSORS;
    if (this.pacType == Type.SCISSORS)
      return pac2.pacType == Type.PAPER;

    return false;
  }

  public Type getTypeThatCanEat(Pac pac2) {
    Player.d("getTypeThatCanEat p2= " + pac2);
    Type p1 = this.pacType;
    Type p2 = pac2.pacType;

    switch (p1) {
      case PAPER:
        switch (p2) {
          case PAPER:
            return Type.SCISSORS;
          case ROCK:
            return null;
          case SCISSORS:
            return Type.ROCK;
        }
      case ROCK:
        switch (p2) {
          case PAPER:
            return Type.SCISSORS;
          case ROCK:
            return Type.PAPER;
          case SCISSORS:
            return null;
        }
      case SCISSORS:
        switch (p2) {
          case PAPER:
            return null;
          case ROCK:
            return Type.PAPER;
          case SCISSORS:
            return Type.ROCK;
        }
    }
    return null;
  }

  public void setOver(PacMapCell pos) {
    if (this.mapPos != null && this.mapPos.over == this)
      this.mapPos.over = null;
    this.mapPos = pos;
    if (pos != null)
      pos.over = this;
  }

  public void setTarget(PacMapCell target) {
    if (this.target != null)
      this.target.setTargetedBy(null);
    this.target = target;
    if (target != null)
      target.setTargetedBy(this);
  }

  public void updateTarget(PacMap pacMap, int maxBestPointValue, HashMap<Integer, ArrayList<PacMapCell>> bestPoints) {
    Pac pac = this;

    if (this.target != null && this.mapPos.id == this.target.id)
      // this.target.setEmpty();
      // else if (this.target != null)
      this.target.setEmpty();

    while (pac.target == null) {
      PacMap.BDSearch path = pac.paths;
      PacMapCell best = null;
      double bestPointChoice;
      int nearestDistance;
      for (int i = maxBestPointValue; i >= 0; i--) {
        ArrayList<PacMapCell> points = bestPoints.get(i);
        // Player.d("POINTS " + i + " : " + (points == null ? null : points.size()));
        if (points != null) {
          nearestDistance = Integer.MAX_VALUE;
          bestPointChoice = 0;
          // nearestDistance = Integer.MIN_VALUE;
          boolean targeted = false;
          for (int j = 0; j < points.size(); j++) {
            PacMapCell cell = points.get(j);
            int point = path.points[cell.id];
            int distance = path.distances[cell.id]; // - path.points[cell.id]
            // double weight = path.distances[cell.id] / (path.points[cell.id] + 1f);
            if (!cell.isEmpty) {
              // Player.d("if (!cell.isEmpty) { --- distance=" + distance + ",
              // nearestDistance=" + nearestDistance);
              // if (!targeted && cell.targetedBy != null) {
              // Player.d("if (!targeted && cell.targetedBy != null) {");
              // targeted = true;
              // }
              if ((distance < nearestDistance || (distance == nearestDistance && point > bestPointChoice))
                  && (cell.targetedBy == null || distance < cell.targetedBy.paths.distances[cell.id])) {
                best = cell;
                nearestDistance = distance;
                bestPointChoice = point;
              }
            }
          }
          if (best != null)
            break;
          // if (!targeted)
          // bestPoints.remove(i);
        }
      }
      if (best == null) {
        Player.d(pac.pacId + " : (NO TARGET)");
        break;
      }
      Player.d(pac.pacId + " : (" + best.x + ", " + best.y + ") " + (pac == best.targetedBy) + " " + best.targetedBy);
      Pac conflict = best.targetedBy;
      if (conflict != null)
        conflict.setTarget(null);
      pac.setTarget(best);
      if (conflict != null)
        pac = conflict;
    }
  }
}
