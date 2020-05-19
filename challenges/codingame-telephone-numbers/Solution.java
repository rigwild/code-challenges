import java.util.*;
import java.io.*;
import java.math.*;

class Solution {
    static class _Node<K> extends HashMap<K, _Node<K>> {
        private static final long serialVersionUID = 1L;

        private K content;
        private HashMap<K, _Node<K>> children = new HashMap<>();

        public _Node(K content) {
            super();
            this.content = content;
        }

        public void addChild(K content) {
            this.children.put(content, new _Node<>(content));
        }

        public boolean hasChild(K content) {
            return this.children.containsKey(content);
        }

        public _Node<K> getChild(K content) {
            return this.children.get(content);
        }

        public int count() {
            int c = 1;
            for (_Node<K> aChild : this.children.values())
                c += aChild.count();
            return c;
        }

        public String toString() {
            String str = this.content + "";
            for (_Node<K> aChild : this.children.values())
                str += aChild.toString();
            return str;
        }
    }

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();

        HashMap<Integer, _Node<Integer>> trees = new HashMap<>();

        for (int i = 0; i < n; i++) {
            String telephone = in.next();

            // Init tree if it does not exists yet
            Integer firstDigit = Integer.parseInt(telephone.charAt(0) + "");
            if (!trees.containsKey(firstDigit))
                trees.put(firstDigit, new _Node<>(firstDigit));

            // Insert digits in tree
            _Node<Integer> t = trees.get(firstDigit);
            for (int y = 1; y < telephone.length(); y++) {
                // Init node if it does not exists yet
                Integer currentDigit = Integer.parseInt(telephone.charAt(y) + "");
                if (!t.hasChild(currentDigit))
                    t.addChild(currentDigit);

                t = t.getChild(currentDigit);
            }
        }

        int count = 0;
        for (Solution._Node<Integer> aTree : trees.values())
            count += aTree.count();

        // The number of elements (referencing a number) stored in the structure.
        System.out.println(count);
    }
}
