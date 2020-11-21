import java.util.*;
import java.io.*;
import java.math.*;

class Solution {
  public static void main(String args[]) {
    Scanner in = new Scanner(System.in);
    int w = in.nextInt();
    int h = in.nextInt();
    if (in.hasNextLine()) {
      in.nextLine();
    }
    String[] topLabels =  in.nextLine().split("  ");
    int labelsCount = topLabels.length;
    char[][] grid = new char[labelsCount][h - 2];
    for (int i = 0; i < h - 2; i++) {
      String line = in.nextLine();
      for (int j = 0; j < labelsCount; j++) {
        int pipePosition = j * 3;
        char direction = 'E';
        if (pipePosition > 0 && line.charAt(pipePosition - 1) == '-')
          direction = 'L';
        else if (pipePosition < w - 1 && line.charAt(pipePosition + 1) == '-')
          direction = 'R';
        grid[j][i] = direction;
      }
    }
    String[] bottomLabels =  in.nextLine().split("  ");

    // Find the output
    for (int i = 0; i < topLabels.length; i++) {
      int currentColumnIndex = i;
      for (int j = 0; j < grid[0].length; j++) {
        if (grid[currentColumnIndex][j] == 'R')
          currentColumnIndex++;
        else if (grid[currentColumnIndex][j] == 'L')
          currentColumnIndex--;
      }
      System.out.println(topLabels[i] + "" + bottomLabels[currentColumnIndex]);
    }
    System.err.println(grid);
  }
}
