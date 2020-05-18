import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Queue;

// imports

public class PacMap {
  public class BDSearch {
    public final int from;
    public final int[] fathers;
    public final int[] distances;
    public final int[] points;
    public final int[] exists;

    public BDSearch(final int from, final int[] fathers, final int[] distances, final int[] points,
        final int[] exists) {
      this.from = from;
      this.fathers = fathers;
      this.distances = distances;
      this.points = points;
      this.exists = exists;
    }
  }

  public final PacMapCell[] cells;
  public final int width, height, area;

  public PacMap(int width, int height) {
    this.width = width;
    this.height = height;
    this.area = width * height;
    this.cells = new PacMapCell[this.area];
    // for (int i = 0; i < this.area; i++)
    // if (cells[i] != '#')
    // this.cells[i] = new PacMapCell(i, this.getX(i), this.getY(i));
    // this.points = new int[area];
    // this.consumedPoints = new boolean[this.area];
    // this.targets = new Pac[this.area];
  }

  public int getID(int x, int y) {
    return y * width + x;
  }

  public int getX(int id) {
    return id % width;
  }

  public int getY(int id) {
    return id / width;
  }

  public void add(int x, int y) {
    int id = this.getID(x, y);
    this.cells[id] = new PacMapCell(id, x, y);
  }

  public PacMapCell get(int x, int y) {
    return this.cells[this.getID(x, y)];
  }

  public PacMapCell get(int pos) {
    if (pos >= 0 && pos < this.area)
      return this.cells[pos];
    return null;
  }

  // public void updatePoint(int id, int value) {
  // }

  // public HashMap<Integer, ArrayList<Integer>> getZones() {
  // HashMap<Integer, ArrayList<Integer>> zones = new HashMap<>();

  // boolean[] visited = new boolean[this.area];

  // int currentCell = -1;

  // // Mark all walls as visited and first non-wall cell as starting point
  // for (int i = 0; i < visited.length; i++)
  // if (this.cells[i] == null)
  // visited[i] = true;
  // else if (currentCell == -1)
  // currentCell = i;

  // while (true) {
  // int neighboursCount = 0;

  // int up = currentCell - width;
  // int bottom = currentCell + width;
  // int left = currentCell - 1;
  // int right = currentCell + 1;

  // // if (currentCell % width == 0)
  // // left += width;
  // // if (right % width == 0)
  // // right -= width;

  // ArrayList<Integer> zoneCells = new ArrayList<>();

  // // zoneCells.add()
  // for (int i = 0; i < zoneCells.size(); i++) {
  // if (up >= 0 && this.cells[up] != null) {
  // neighboursCount++;
  // zoneCells.add(up);
  // }
  // if (bottom < area && this.cells[bottom] != null) {
  // neighboursCount++;
  // zoneCells.add(bottom);
  // }
  // if (this.cells[left] != null) {
  // neighboursCount++;
  // zoneCells.add(left);
  // }
  // if (this.cells[right] != null) {
  // neighboursCount++;
  // zoneCells.add(right);
  // }

  // if (neighboursCount > 2) {
  // }
  // }

  // break;
  // }
  // }

  public BDSearch breadthFirstSearch(int from) {
    int[] distances = new int[area];
    int[] fathers = new int[area];
    int[] points = new int[area];
    int[] exists = new int[area];
    Arrays.fill(distances, Integer.MAX_VALUE);
    Queue<Integer> queue = new LinkedList<>();
    distances[from] = 0;
    points[from] = 0;
    queue.add(from);
    while (!queue.isEmpty()) {
      final int current = queue.poll();
      final int distance = distances[current];
      final int point = points[current];
      int up = current - width;
      int bottom = current + width;
      int left = current - 1;
      int right = current + 1;

      if (current % width == 0)
        left += width;
      if (right % width == 0)
        right -= width;

      int exitCount = 0;
      if (up >= 0 && distances[up] == Integer.MAX_VALUE && this.cells[up] != null) {
        exitCount++;
        queue.add(up);
        distances[up] = distance + 1;
        points[up] = point + this.get(up).points;
      }
      if (bottom < area && distances[bottom] == Integer.MAX_VALUE && this.cells[bottom] != null) {
        exitCount++;
        queue.add(bottom);
        distances[bottom] = distance + 1;
        points[bottom] = point + this.get(bottom).points;
      }
      if (distances[left] == Integer.MAX_VALUE && this.cells[left] != null) {
        exitCount++;
        queue.add(left);
        distances[left] = distance + 1;
        points[left] = point + this.get(left).points;
      }
      if (distances[right] == Integer.MAX_VALUE && this.cells[right] != null) {
        exitCount++;
        queue.add(right);
        distances[right] = distance + 1;
        points[right] = point + this.get(right).points;
      }
      exists[current] = exitCount;
    }
    return new BDSearch(from, fathers, distances, points, exists);
  }
}