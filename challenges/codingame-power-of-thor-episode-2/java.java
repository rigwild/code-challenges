import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.io.*;
import java.math.*;

class PossibleMove {
  public Cell cell;
  public Game.ACTION action;

  public PossibleMove(Cell cell, Game.ACTION action) {
    this.cell = cell;
    this.action = action;
  }
}

class MinimaxScore {
  public int score;
  public Game.ACTION action;
  public int newThorPosition;

  public MinimaxScore(int score) {
    this.score = score;
    this.action = Game.ACTION.WAIT;
  }

  public MinimaxScore(int score, Game.ACTION action) {
    this.score = score;
    this.action = action;
  }

  public MinimaxScore(int score, Game.ACTION action, int newThorPosition) {
    this.score = score;
    this.action = action;
    this.newThorPosition = newThorPosition;
  }
}

class Cell {
  public int pos;
  public boolean hasGiant = false;
  public boolean hasThor = false;

  public Cell(int pos) {
    this.pos = pos;
  }

  public Cell(Cell copy) {
    this.pos = copy.pos;
    this.hasGiant = copy.hasGiant;
    this.hasThor = copy.hasThor;
  }
}

class Game {
  public int width;
  public int height;
  public Cell[] cells;

  public int thorLightningsLeft;
  public int thorPos;
  public ArrayList<Integer> giantsPos = new ArrayList<>();

  public Game(int width, int height) {
    this.cells = new Cell[width * height];
    this.width = width;
    this.height = height;
    for (int i = 0; i < height; i++) {
      for (int j = 0; j < width; j++) {
        int pos = Game.coordinatesToPos(this.width, j, i);
        this.cells[pos] = new Cell(pos);
      }
    }
  }

  // public ArrayList<Cell> getNeighbors(int pos) {
  // ArrayList<Cell> neighbors = new ArrayList<>();

  // if (pos % this.width != 0) // left
  // neighbors.add(this.cells[pos - 1]);
  // if ((pos + 1) % this.width != 0) // right
  // neighbors.add(this.cells[pos + 1]);
  // if (pos - this.width >= 0) // top
  // neighbors.add(this.cells[pos - this.width]);
  // if (pos + this.width < this.width * this.height) // bottom
  // neighbors.add(this.cells[pos + this.width]);

  // if (pos - this.width - 1 >= 0 && pos % this.width != 0) // top-left
  // neighbors.add(this.cells[pos - this.width - 1]);
  // if (pos - this.width + 1 >= 0 && (pos - this.width + 1) % this.width != 0) //
  // top-right
  // neighbors.add(this.cells[pos - this.width + 1]);
  // if (pos + this.width - 1 < this.width * this.height && pos % this.width != 0)
  // // bottom-left
  // neighbors.add(this.cells[pos + this.width - 1]);
  // if (pos + this.width + 1 < this.width * this.height && (pos + this.width + 1)
  // % this.width != 0) // bottom-right
  // neighbors.add(this.cells[pos + this.width + 1]);

  // return neighbors;
  // }

  public void clearGiantsPos() {
    for (int pos : this.giantsPos)
      this.cells[pos].hasGiant = false;
    this.giantsPos.clear();
  }

  public void markGiantPos(int x, int y) {
    int pos = Game.coordinatesToPos(this.width, x, y);
    this.cells[pos].hasGiant = true;
    this.giantsPos.add(pos);
  }

  public void setThorPos(int x, int y) {
    this.setThorPos(Game.coordinatesToPos(this.width, x, y));
  }

  public void setThorPos(int pos) {
    this.cells[this.thorPos].hasThor = false;
    this.cells[pos].hasThor = true;
    this.thorPos = pos;
  }

  public static int coordinatesToPos(int width, int x, int y) {
    return y * width + x;
  }

  public static int posToX(int width, int pos) {
    return pos % width;
  }

  public static int posToY(int width, int pos) {
    return pos / width;
  }

  @Override
  public String toString() {
    StringBuilder str = new StringBuilder();
    for (int i = 0; i < height; i++) {
      for (int j = 0; j < width; j++) {
        int pos = Game.coordinatesToPos(this.width, j, i);
        Cell cell = this.cells[pos];
        if (cell.hasThor) {
          str.append("T");
          System.err.println("THOR  : " + j + " " + i + " " + pos);
        } else if (cell.hasGiant) {
          str.append("G");
          System.err.println("GIANT : " + j + " " + i + " " + pos);
        } else
          str.append("·");
      }
      str.append("\n");
    }
    return str.toString();
  }

  @Override
  public Game clone() {
    Game gameCopy = new Game(this.width, this.height);

    gameCopy.cells = new Cell[this.cells.length];
    for (int i = 0; i < gameCopy.cells.length; i++)
      gameCopy.cells[i] = new Cell(this.cells[i]);

    gameCopy.giantsPos = new ArrayList<>();
    for (Integer aGiantPos : this.giantsPos)
      gameCopy.giantsPos.add(aGiantPos);

    gameCopy.thorLightningsLeft = this.thorLightningsLeft;
    gameCopy.thorPos = this.thorPos;
    return gameCopy;
  }

  public static enum ACTION {
    W, E, N, S, NW, NE, SW, SE, WAIT, STRIKE
  };

  public static ArrayList<PossibleMove> getPossibleMoves(Game game, int pos) {
    ArrayList<PossibleMove> neighbors = new ArrayList<>();

    if (pos % game.width != 0) // left
      neighbors.add(new PossibleMove(game.cells[pos - 1], Game.ACTION.W));
    if ((pos + 1) % game.width != 0) // right
      neighbors.add(new PossibleMove(game.cells[pos + 1], Game.ACTION.E));
    if (pos - game.width >= 0) // top
      neighbors.add(new PossibleMove(game.cells[pos - game.width], Game.ACTION.N));
    if (pos + game.width < game.width * game.height) // bottom
      neighbors.add(new PossibleMove(game.cells[pos + game.width], Game.ACTION.S));

    if (pos - game.width - 1 >= 0 && pos % game.width != 0) // top-left
      neighbors.add(new PossibleMove(game.cells[pos - game.width - 1], Game.ACTION.NW));
    if (pos - game.width + 1 >= 0 && (pos - game.width + 1) % game.width != 0) // top-right
      neighbors.add(new PossibleMove(game.cells[pos - game.width + 1], Game.ACTION.NE));
    if (pos + game.width - 1 < game.width * game.height && pos % game.width != 0) // bottom-left
      neighbors.add(new PossibleMove(game.cells[pos + game.width - 1], Game.ACTION.SW));
    if (pos + game.width + 1 < game.width * game.height && (pos + game.width + 1) % game.width != 0) // bottom-right
      neighbors.add(new PossibleMove(game.cells[pos + game.width + 1], Game.ACTION.SE));

    return neighbors;
  }

  public static MinimaxScore minimax(Game game, int depth, boolean isMaximizing, int alpha, int beta) {
    // No more giants left (win)
    if (game.giantsPos.size() == 0)
      return new MinimaxScore(Integer.MAX_VALUE);
    // Some giants are left but no more strikes left (lose)
    if (game.giantsPos.size() > 0 && game.thorLightningsLeft == 0)
      return new MinimaxScore(Integer.MIN_VALUE);
    // Giants kill thor (lose)
    for (int aGiantPos : game.giantsPos)
      if (aGiantPos == game.thorPos)
        return new MinimaxScore(Integer.MIN_VALUE);

    if (depth == 0)
      return new MinimaxScore(0);

    if (isMaximizing) {
      // Thor turn
      MinimaxScore bestScore = new MinimaxScore(Integer.MIN_VALUE, Game.ACTION.WAIT, game.thorPos);

      // Try to make Thor wait
      MinimaxScore waitScore = minimax(game, depth - 1, false, alpha, beta);
      if (waitScore.score > bestScore.score)
        bestScore = new MinimaxScore(waitScore.score, Game.ACTION.WAIT, game.thorPos);

      // Try to make Thor strike
      if (game.thorLightningsLeft > 0) {
        int thorLightingsLeft = game.thorLightningsLeft;
        ArrayList<Integer> giantsPos = new ArrayList<>(game.giantsPos);

        game.thorLightningsLeft--;
        // Remove all giants with a manhattan distance of <= 9
        game.giantsPos = (ArrayList<Integer>) game.giantsPos.stream()
            .filter(b -> Math.abs(Game.posToX(game.width, b) - Game.posToX(game.width, game.thorPos))
                + Math.abs(Game.posToY(game.width, b) - Game.posToY(game.width, game.thorPos)) >= 5/* 9 */)
            .collect(Collectors.toList());

        MinimaxScore strikeScore = minimax(game, depth - 1, false, alpha, beta);
        game.thorLightningsLeft = thorLightingsLeft;
        game.giantsPos = giantsPos;
        if (strikeScore.score > bestScore.score)
          bestScore = new MinimaxScore(strikeScore.score, Game.ACTION.STRIKE, game.thorPos);
      }

      // Try every Thor move
      ArrayList<PossibleMove> possibleMove = Game.getPossibleMoves(game, game.thorPos);
      for (PossibleMove aPossibleMove : possibleMove) {
        int thorPos = game.thorPos;
        game.thorPos = aPossibleMove.cell.pos;

        MinimaxScore score = minimax(game, depth - 1, false, alpha, beta);
        if (score.score > bestScore.score)
          bestScore = new MinimaxScore(score.score, aPossibleMove.action, aPossibleMove.cell.pos);

        game.thorPos = thorPos;
      }

      // Alpha-beta pruning
      if (bestScore.score >= beta)
        return bestScore;
      if (bestScore.score > alpha)
        alpha = bestScore.score;

      return bestScore;
    } else {
      // Giants turn
      MinimaxScore bestScore = new MinimaxScore(Integer.MAX_VALUE);

      ArrayList<Integer> giantsPosBackup = new ArrayList<>(game.giantsPos);
      ArrayList<Integer> newGiantsPos = new ArrayList<>(game.giantsPos);

      for (int aGiantPos : game.giantsPos) {
        ArrayList<PossibleMove> aGiantMoves = getPossibleMoves(game, aGiantPos);

        int closestToThorDistance = Integer.MAX_VALUE;
        int closestToThorPos = 0;
        // For all possible moves of this giant, find the closest to Thor
        for (PossibleMove aGiantMove : aGiantMoves) {
          int distanceFromThor = Math
              .abs(Game.posToX(game.width, aGiantMove.cell.pos) - Game.posToX(game.width, game.thorPos))
              + Math.abs(Game.posToY(game.width, aGiantMove.cell.pos) - Game.posToY(game.width, game.thorPos));
          if (distanceFromThor < closestToThorDistance) {
            closestToThorDistance = distanceFromThor;
            closestToThorPos = aGiantMove.cell.pos;
          }
        }
        newGiantsPos.add(closestToThorPos);
      }
      game.giantsPos = newGiantsPos;

      // Compute score
      MinimaxScore giantsScore = minimax(game, depth - 1, true, alpha, beta);

      if (giantsScore.score < bestScore.score)
        bestScore = new MinimaxScore(giantsScore.score);

      // Restore initial giants positions
      game.giantsPos = giantsPosBackup;

      // Alpha-beta pruning
      if (bestScore.score <= alpha)
        return bestScore;
      if (bestScore.score < beta)
        beta = bestScore.score;

      return giantsScore;
    }
  }

}

class Player {
  public static void main(String args[]) {
    Game game = new Game(40, 18);

    Scanner in = new Scanner(System.in);
    int tx = in.nextInt();
    int ty = in.nextInt();

    game.setThorPos(tx, ty);

    // game loop
    while (true) {
      // the remaining number of hammer strikes.
      int h = in.nextInt();
      game.thorLightningsLeft = h;
      // the number of giants which are still present on the map.
      int n = in.nextInt();

      for (int i = 0; i < n; i++) {
        int x = in.nextInt();
        int y = in.nextInt();
        // System.err.println(x + " " + y);
        game.markGiantPos(x, y);
      }

      System.err.println(game);
      MinimaxScore move = Game.minimax(game, 6, true, Integer.MIN_VALUE, Integer.MAX_VALUE);
      game.setThorPos(move.newThorPosition);
      System.out.println(move.action);

      // The movement or action to be carried out: WAIT STRIKE N NE E SE S SW W or N
      // System.out.println("WAIT");

      game.clearGiantsPos();
    }
  }
}
