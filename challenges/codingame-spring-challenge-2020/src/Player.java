
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// imports

/**
 * Grab the pellets as fast as you can!
 **/
public class Player {
  public static void main(String args[]) {
    PacMap pacMap;

    Scanner in = new Scanner(System.in);
    int width = in.nextInt(); // size of the grid
    int height = in.nextInt(); // top left corner is (x=0, y=0)
    if (in.hasNextLine())
      in.nextLine();

    pacMap = new PacMap(width, height);
    for (int y = 0; y < height; y++) {
      String row = in.nextLine();
      for (int x = 0; x < row.length(); x++) {
        char c = row.charAt(x);
        if (c != '#')
          pacMap.add(x, y);
      }
    }

    boolean isFirstTurn = true;

    HashMap<Integer, ArrayList<PacMapCell>> bestPoints = new HashMap<>();
    int maxBestPointValue = -1;

    // PriorityQueue<Integer> bestPoints = new PriorityQueue<>(pacMap.area, (a, b)
    // -> pacMap.points[a] - pacMap.points[b]);

    boolean[] consumedPoints = new boolean[pacMap.area];
    Pac[] targets = new Pac[pacMap.area];

    // PacMap.BDSearch[] paths = new PacMap.BDSearch[visiblePacCount];
    HashMap<Integer, Pac> pacs = new HashMap<>();
    ArrayList<Pac> otherPacs = new ArrayList<>();

    int turnCount = 0;
    long turnStartDate;
    // game loop
    while (true) {
      final int turnNo = ++turnCount;
      int myScore = in.nextInt();
      int opponentScore = in.nextInt();
      int visiblePacCount = in.nextInt(); // all your pacs and enemy pacs in sight

      // ArrayList<Pac> pacsList = new ArrayList<>();
      // ArrayList<Pac> myPacs = pacsList.stream().filter(x ->
      // x.mine).collect(Collectors.toCollection(ArrayList::new));
      ArrayList<Pac> myPacs = new ArrayList<>();
      for (int i = 0; i < visiblePacCount; i++) {
        int pacId = in.nextInt(); // pac number (unique within a team)
        boolean mine = in.nextInt() != 0; // true if this pac is yours
        int x = in.nextInt(); // position in the grid
        int y = in.nextInt(); // position in the grid

        String typeId = in.next(); // unused in wood leagues
        int speedTurnsLeft = in.nextInt(); // unused in wood leagues
        int abilityCooldown = in.nextInt(); // unused in wood leagues

        if (mine) {
          if (!pacs.containsKey(pacId))
            pacs.put(pacId, new Pac(i, pacId, pacMap.get(x, y), mine, typeId, speedTurnsLeft, abilityCooldown));
          Pac pac = pacs.get(pacId);
          pac.setOver(pacMap.get(x, y));
          pac.updateAbility(typeId, speedTurnsLeft, abilityCooldown);
          myPacs.add(pac);
        } else {
          Pac pac = new Pac(i, pacId, pacMap.get(x, y), mine, typeId, speedTurnsLeft, abilityCooldown);
          pac.isEvil = true;
          pac.setOver(pacMap.get(x, y));
          otherPacs.add(pac);
        }
      }

      ArrayList<String> commandList = new ArrayList<>();

      // Update map with points on each cell
      int visiblePelletCount = in.nextInt(); // all pellets in sight
      for (int i = 0; i < visiblePelletCount; i++) {
        PacMapCell cell = pacMap.get(in.nextInt(), in.nextInt());
        int value = in.nextInt(); // amount of points this pellet is worth

        if (!cell.isDiscovered) {
          // d("ADDED PELLET ON " + cell);
          if (value > maxBestPointValue)
            maxBestPointValue = value;
          if (!bestPoints.containsKey(value))
            bestPoints.put(value, new ArrayList<>());
          bestPoints.get(value).add(cell);
        }

        cell.update(value, turnNo);
      }

      turnStartDate = System.nanoTime();

      // d("PELLETS " + visiblePelletCount);
      for (Pac oneOfmyPac : myPacs) {
        Stream<PacMapCell> visibility = oneOfmyPac.getVisibility(pacMap);

        visibility.forEach(cell -> {
          if (!cell.isEmpty && cell.updatedAt != turnNo) {
            d("REMOVED PELLET ON " + cell);
            cell.setEmpty();
          }
        });
      }

      /* ArrayList<PacMap.BDSearch> paths = */myPacs.parallelStream()
          .map((Pac x) -> (x.paths = pacMap.breadthFirstSearch(x.mapPos.id)))
          .collect(Collectors.toCollection(ArrayList::new));

      for (Pac oneOfmyPac : myPacs) {
        // PacMap.BDSearch path = (oneOfmyPac.paths =
        // pacMap.breadthFirstSearch(oneOfmyPac.mapPos));

        // Side-effects
        oneOfmyPac.updateTarget(pacMap, maxBestPointValue, bestPoints);
      }
      for (Pac oneOfmyPac : myPacs)
        oneOfmyPac.updateTarget(pacMap, maxBestPointValue, bestPoints);

      for (Pac oneOfmyPac : myPacs) {
        // d("oneOfmyPac.hasAbility() id=" + oneOfmyPac.pacId + " " +
        // oneOfmyPac.hasAbility());
        if (oneOfmyPac.hasAbility()) {
          // Check if an evil pac is near the pac to graille him
          PacMapCell selectedCellWithEvilPacToTarget = null;

          PacMapCell[] upRightDownLeft = { pacMap.get(oneOfmyPac.mapPos.id - width),
              pacMap.get(oneOfmyPac.mapPos.id + 1), pacMap.get(oneOfmyPac.mapPos.id + width),
              pacMap.get(oneOfmyPac.mapPos.id - 1) };
          for (int i = 0; i < upRightDownLeft.length; i++) {
            PacMapCell c = upRightDownLeft[i];
            if (c != null && c.over != null && c.over.isEvil) {
              d("Cell with target to eat: " + c);
              selectedCellWithEvilPacToTarget = c;
              break;
            }
          }

          if (selectedCellWithEvilPacToTarget != null && selectedCellWithEvilPacToTarget.over.isEvil) {
            oneOfmyPac.target = selectedCellWithEvilPacToTarget;

            // Swith if can't eat
            if (!oneOfmyPac.canEat(selectedCellWithEvilPacToTarget.over)) {
              d("Can eat evil pac: " + selectedCellWithEvilPacToTarget.over);
              Pac.Type toSwitchTo = oneOfmyPac.getTypeThatCanEat(selectedCellWithEvilPacToTarget.over);

              commandList.add("SWITCH " + oneOfmyPac.pacId + " " + toSwitchTo);
              oneOfmyPac.markAbilityUsed();
              oneOfmyPac.pacType = toSwitchTo;

              // Wlh meme moi jsp pq
              for (Pac oneOfmyPac2 : myPacs)
                oneOfmyPac2.updateTarget(pacMap, maxBestPointValue, bestPoints);

              oneOfmyPac.mapPos.setTargetedBy(null);
              oneOfmyPac.target = null;
              // selectedCellWithEvilPacToTarget.over = null;
              // oneOfmyPac.updateTarget(pacMap, maxBestPointValue, bestPoints);

              continue;
            }
          } else {
            // Use speed only on big maps
            // commandList.add("SPEED " + oneOfmyPac.pacId);
            // oneOfmyPac.markSpeedUsed();
            // continue;
          }
        }
        d("final target of " + oneOfmyPac + " is " + oneOfmyPac.target);
        // Move or go graille a fdpac
        PacMapCell to = oneOfmyPac.target == null ? oneOfmyPac.mapPos : oneOfmyPac.target;
        commandList.add("MOVE " + oneOfmyPac.pacId + " " + to.x + " " + to.y);
      }

      long duration = System.nanoTime() - turnStartDate;

      if (isFirstTurn)
        isFirstTurn = false;

      StringBuilder mapLog = new StringBuilder(pacMap.area + pacMap.height);
      for (int y = 0; y < pacMap.height; y++) {
        for (int x = 0; x < pacMap.width; x++) {
          PacMapCell c = pacMap.get(x, y);
          if (c == null)
            mapLog.append('#');
          else if (!c.isDiscovered)
            mapLog.append('·');
          // else if (c.isEmpty)
          // mapLog.append(' ');
          else if (c.over != null) {
            if (c.over.isEvil)
              mapLog.append('E');
            else
              mapLog.append('x');
          } else if (c.updatedAt == turnNo)
            mapLog.append('o');
          else if (c.points > 0)
            mapLog.append('-');
          else
            mapLog.append(' ');
        }
        mapLog.append("\n");
      }

      System.err.print(mapLog.toString());
      System.err.print("Turn duration : " + (duration / 1_000_000f));

      d(commandList.size() + "");
      sendActions(commandList);

      for (PacMapCell aCell : pacMap.cells)
        if (aCell != null)
          aCell.over = null;
    }

  }

  public static void sendActions(ArrayList<String> commands) {
    System.out.println(commands.stream().collect(Collectors.joining(" | ")));
  }

  public static void move(String command) {
    System.out.println(command);
  }

  public static void d(String... data) {
    for (String aData : data)
      System.err.println(aData);
  }

  // cut
}
