class Solution {
  public int minimumLength(String s) {
      final Map<Character, List<Integer>> charIndexes = new HashMap<>();
      for (int i = 0; i < s.length(); i++) {
          final char c = s.charAt(i);
          final List<Integer> listOfSameChar = charIndexes.getOrDefault(c, new ArrayList<>());
          listOfSameChar.add(i);
          charIndexes.put(c, listOfSameChar);
      }

      // System.out.println(String.format("charIndexes=%s", charIndexes));

      int length = s.length();

      for (List<Integer> listOfSameChar : charIndexes.values()) {
          while (listOfSameChar.size() >= 3) {
              listOfSameChar.remove(listOfSameChar.size() - 1);
              listOfSameChar.remove(0);
              length -= 2;
              // System.out.println(String.format("    charIndexes=%s", charIndexes));
          }
      }

      return length;

  //
  // Time Limit Exceeded!
  //
  
  //     for (int i = 1; i < s.length(); i++) {
  //         //System.out.println(s);

  //         char target = s.charAt(i);
  //         int leftIdx = -1;
  //         int rightIdx = -1;

  //         for (int j = 0; j < i; j++) {
  //             char current = s.charAt(j);
  //             //System.out.println(String.format("    LEFT i=%s, target=%s, current=%s", i, target, current));
  //             if (current == target) {
  //                 leftIdx = j;
  //                 break;
  //             }
  //         }
  //         if (leftIdx == -1) continue;
          
  //         for (int j = i + 1; j < s.length(); j++) {
  //             char current = s.charAt(j);
  //             //System.out.println(String.format("    RIGHT i=%s, target=%s, current=%s", i, target, current));
  //             if (current == target) {
  //                 rightIdx = j;
  //                 break;
  //             }
  //         }

  //         if (leftIdx != -1 && rightIdx != -1) {
  //             //System.out.println(String.format("  RESULT i=%s, leftIdx=%s, rightIdx=%s", i, leftIdx, rightIdx));
  //             s = s.substring(0, rightIdx) + s.substring(rightIdx + 1);
  //             s = s.substring(0, leftIdx) + s.substring(leftIdx + 1);
  //             i = 1;
  //         }
  //     }

  //     System.out.println(s);
  //     return s.length();
  }
}
