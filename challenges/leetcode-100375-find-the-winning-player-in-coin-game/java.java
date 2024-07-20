class Solution {
  public String losingPlayer(int x, int y) {
      String player = "Bob";

      for (; x > 0 || y > 0;) {
          if (x >= 1 && y >= 4) {
              x -= 1;
              y -= 4;
              player = player.equals("Alice") ? "Bob" : "Alice";
          } else {
              return player;
          }
      }
      return player;
  }
}
