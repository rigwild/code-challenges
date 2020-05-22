import java.util.*;
import java.io.*;
import java.math.*;

class Solution {
  public static void main(String args[]) {
    Scanner in = new Scanner(System.in);

    Vertex root = null;

    int n = in.nextInt();
    for (int i = 0; i < n; i++) {
      String name = in.next();
      String parent = in.next();
      int birth = in.nextInt();
      String death = in.next();
      String religion = in.next();
      String gender = in.next();

      Vertex v = new Vertex(i, name, parent, birth, death, religion, gender);
      if (root == null)
        root = v;
      else
        root.addLink(v);
    }

    root.getTreeOutput().forEach(x -> System.out.println(x.name));
  }
}

class Vertex {
  public LinkedList<Vertex> links = new LinkedList<>();
  public int id;
  public String name;
  public String parent;
  public int birth;
  public String death;
  public String religion;
  public String gender;

  public Vertex(int id, String name, String parent, int birth, String death, String religion, String gender) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.birth = birth;
    this.death = death;
    this.religion = religion;
    this.gender = gender;
  }

  public void addLink(Vertex toLink) {
    if (this.name.equals(toLink.parent))
      this.links.add(toLink);
    else
      this.links.forEach(aLink -> aLink.addLink(toLink));
  }

  public LinkedList<Vertex> getTreeOutput() {
    LinkedList<Vertex> output = new LinkedList<>();
    if (this.death.equals("-") && !this.religion.equals("Catholic"))
      output.add(this);

    this.links.sort((a, b) -> {
      if (a.gender.equals(b.gender))
        return a.birth - b.birth;
      return a.gender.equals("M") ? -1 : 1;
    });
    this.links.forEach(aLink -> output.addAll(aLink.getTreeOutput()));

    return output;
  }
}