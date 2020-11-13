import java.util.*;
import java.util.stream.Collectors;

class GameState {
  int turnCount;
  Player myself;
  Player opponent;
  List<Recipe> recipes;

  public GameState(int turnCount, Player myself, Player opponent, List<Recipe> recipes) {
    this.turnCount = turnCount;
    this.myself = myself;
    this.opponent = opponent;
    this.recipes = recipes;
  }

  public GameState(GameState toCopy) {
    this.turnCount = toCopy.turnCount;
    this.myself = new Player(toCopy.myself);
    this.opponent = new Player(toCopy.opponent);
    this.recipes = Recipe.recipesDeepCopy(toCopy.recipes);
  }

  public int computeGameStateScore() {
    if (myself.brewedPotionCount >= Player.AMOUNT_POTION_TO_BREW || turnCount >= 100) {
      if (myself.score > opponent.score)
        return Integer.MAX_VALUE;
      else return Integer.MIN_VALUE;
    }
    // TODO: check opponent's score?
    return myself.computePlayerStateScore() + Recipe.computeRecipesStateScore(recipes);
  }

  public static TurnAction getBestTurnAction(GameState _gameState) {
    GameState gameState = new GameState(_gameState);
    return simulateTurns(gameState);
  }

  public static TurnAction simulateTurns(GameState gameState) {
    int amountOfTurns = 8;

    int maxPotentialScore = Integer.MIN_VALUE;
    TurnAction turnAction = new TurnAction(Action.WAIT);

    // -- Get score of using any recipe
    boolean hasOneSpellNonCastable = false;
    for (Recipe recipe : gameState.recipes) {
      if (recipe.action == Action.BREW && gameState.myself.canConsume(recipe)) {
        gameState.myself.consume(recipe);
        gameState.turnCount++;
        int brewScore = simulateTurnsUtil(gameState, amountOfTurns - 1);
        System.err.printf("Simulated BREW %d = %d\n", recipe.id, brewScore);

        // Backtrack
        gameState.myself.unConsume(recipe);
        gameState.turnCount--;

        if (brewScore > maxPotentialScore) {
          turnAction = new TurnAction(Action.BREW, recipe);
          maxPotentialScore = brewScore;
        }
      }
      else if (recipe.action == Action.CAST) {
        if (!recipe.castable) {
          hasOneSpellNonCastable = true;
          continue;
        }
        if (gameState.myself.canConsume(recipe)) {
//          System.err.println("0xxx "+recipe.id+" castable="+recipe.castable);
          gameState.myself.consume(recipe);
//          System.err.println("1xxx "+recipe.id+" castable="+recipe.castable);
          gameState.turnCount++;
          int castScore = simulateTurnsUtil(gameState, amountOfTurns - 1);
          System.err.printf("Simulated CAST %d = %d\n", recipe.id, castScore);

          // Backtrack
//          System.err.println("2xxxx "+recipe.id+" castable="+recipe.castable);
          gameState.myself.unConsume(recipe, true);
//          System.err.println("3xxx "+recipe.id+" castable="+recipe.castable);
          gameState.turnCount--;

          if (castScore > maxPotentialScore) {
            turnAction = new TurnAction(Action.CAST, recipe);
            maxPotentialScore = castScore;
          }
        }
      }
    }

    if (hasOneSpellNonCastable) {
      // -- Get score of using REST action
//      System.err.println("\nahahahah " + recipeDeepCopy.stream().filter(x -> x.action == Action.CAST).map(Recipe::toString).collect(Collectors.joining("\n")));
      Set<Integer> recipesIdNonCastableBefore = gameState.recipes.stream().filter(x -> x.action == Action.CAST && !x.castable ).map(x -> x.id).collect(Collectors.toSet());
      Recipe.rest(gameState.recipes, Action.CAST);
      gameState.turnCount++;
      int restScore = simulateTurnsUtil(gameState, amountOfTurns - 1);

      // Backtrack
      for (Recipe recipe : gameState.recipes)
        if (recipesIdNonCastableBefore.contains(recipe.id))
          recipe.castable = false;
      gameState.turnCount--;

      if (restScore > maxPotentialScore) {
        turnAction = new TurnAction(Action.REST);
        maxPotentialScore = restScore;
      }
    }

    return turnAction;
  }

  public static int simulateTurnsUtil(GameState gameState, int turnsLeft) {
    if (turnsLeft == 0) return gameState.computeGameStateScore();

    int maxPotentialScore = Integer.MIN_VALUE;

    // -- Get score of using any recipe
    boolean hasOneSpellNonCastable = false;
    for (Recipe recipe : gameState.recipes) {
      if (recipe.action == Action.BREW && gameState.myself.canConsume(recipe)) {
        gameState.myself.consume(recipe);
        gameState.turnCount++;
        int brewScore = simulateTurnsUtil(gameState, turnsLeft - 1);

        // Backtrack
        gameState.myself.unConsume(recipe);
        gameState.turnCount--;

        maxPotentialScore = Math.max(maxPotentialScore, brewScore);
      }
      else if (recipe.action == Action.CAST) {
        if (!recipe.castable) {
          hasOneSpellNonCastable = true;
          continue;
        }
        if (gameState.myself.canConsume(recipe)) {
          gameState.myself.consume(recipe);
          gameState.turnCount++;

          int castScore = simulateTurnsUtil(gameState, turnsLeft - 1);

          // Backtrack
          gameState.myself.unConsume(recipe, true);
          gameState.turnCount--;

          maxPotentialScore = Math.max(maxPotentialScore, castScore);
        }
      }
    }

    // -- Get score of using REST action
    if (hasOneSpellNonCastable) {
      Set<Integer> recipesIdNonCastableBefore = gameState.recipes.stream().filter(x -> x.action == Action.CAST && !x.castable ).map(x -> x.id).collect(Collectors.toSet());
      Recipe.rest(gameState.recipes, Action.CAST);
      gameState.turnCount++;
      int restScore = simulateTurnsUtil(gameState, turnsLeft - 1);

      // Backtrack
      for (Recipe recipe : gameState.recipes)
        if (recipesIdNonCastableBefore.contains(recipe.id))
          recipe.castable = false;
      gameState.turnCount--;

      maxPotentialScore = Math.max(maxPotentialScore, restScore);
    }

    return maxPotentialScore;
  }

  public static List<Recipe> readRecipesInput(Scanner in) {
    List<Recipe> recipesTemp = new ArrayList<>();

    int actionCount = in.nextInt(); // the number of spells and recipes in play
    for (int i = 0; i < actionCount; i++) {
      int actionId = in.nextInt(); // the unique ID of this spell or recipe
      String actionType = in.next(); // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
      int delta0 = in.nextInt(); // tier-0 ingredient change
      int delta1 = in.nextInt(); // tier-1 ingredient change
      int delta2 = in.nextInt(); // tier-2 ingredient change
      int delta3 = in.nextInt(); // tier-3 ingredient change
      int price = in.nextInt(); // the price in rupees if this is a potion
      int tomeIndex = in.nextInt(); // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax
      int taxCount = in.nextInt(); // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell
      boolean castable = in.nextInt() != 0; // in the first league: always 0; later: 1 if this is a castable player spell
      boolean repeatable = in.nextInt() != 0; // for the first two leagues: always 0; later: 1 if this is a repeatable player spell

      recipesTemp.add(
        new Recipe(
          actionId,
          new int[] { delta0, delta1, delta2, delta3 },
          Action.valueOf(actionType),
          price,
          tomeIndex,
          taxCount,
          castable,
          repeatable
        )
      );
    }

    Collections.sort(recipesTemp);
    return recipesTemp;
  }

  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    GameState gameState = new GameState(1, new Player(), new Player(), null);

    // Game loop
    while (true) {
      gameState.recipes = readRecipesInput(in);
      gameState.myself.update(in.nextInt(), in.nextInt(), in.nextInt(), in.nextInt(), in.nextInt());
      gameState.opponent.update(in.nextInt(), in.nextInt(), in.nextInt(), in.nextInt(), in.nextInt());
      long turnStartTime = System.currentTimeMillis();

      System.err.println("\n----- TURN " + gameState.turnCount + " -----");

      System.err.println("myself  : " + gameState.myself);
      System.err.println("opponent: " + gameState.opponent);
      System.err.println("recipes:\n" + gameState.recipes.stream().map(Recipe::toString).collect(Collectors.joining("\n")));

      // Save moves list or recompute everytime?
      TurnAction turnAction = GameState.getBestTurnAction(gameState);
      gameState.turnCount++;
      long turnEndTime = System.currentTimeMillis();
      System.err.println("--> Turn took " + (turnEndTime - turnStartTime) + " ms");
      System.out.println(turnAction + " " + turnAction);
    }
  }
}

enum Action {
  BREW,
  CAST,
  OPPONENT_CAST,
  LEARN,
  WAIT,
  REST
}

class TurnAction {
  Action action;
  Recipe usedRecipe;

  public TurnAction(Action action) {
    this.action = action;
  }

  public TurnAction(Action action, Recipe usedRecipe) {
    this.action = action;
    this.usedRecipe = usedRecipe;
  }


  @Override
  public String toString() {
    if (action == Action.REST || action == Action.WAIT)
      return action.toString();
    return action.toString() + " " + usedRecipe.id;
  }
}

class Recipe implements Comparable<Recipe> {
  int id;
  int[] ingredients;
  int ingredientsElementsCount;
  Action action;
  int rupeesPrice;
  int tomeIndex;
  int taxCount;
  boolean castable;
  boolean repeatable;

  public Recipe(int id, int[] ingredients, Action action, int rupeesPrice, int tomeIndex, int taxCount, boolean castable, boolean repeatable) {
    this.id = id;
    this.ingredients = ingredients;
    this.ingredientsElementsCount = ingredients[0] + ingredients[1] + ingredients[2] + ingredients[3];
    this.action = action;
    this.rupeesPrice = rupeesPrice;
    this.tomeIndex = tomeIndex;
    this.taxCount = taxCount;
    this.castable = castable;
    this.repeatable = repeatable;
  }

  public Recipe(Recipe toCopy) {
    this.id = toCopy.id;
    this.ingredients = toCopy.ingredients.clone();
    this.ingredientsElementsCount = toCopy.ingredientsElementsCount;
    this.action = toCopy.action;
    this.rupeesPrice = toCopy.rupeesPrice;
    this.tomeIndex = toCopy.tomeIndex;
    this.taxCount = toCopy.taxCount;
    this.castable = toCopy.castable;
    this.repeatable = toCopy.repeatable;
  }

  public static void rest(List<Recipe> recipes, Action castOrOpponentCast) {
    if (castOrOpponentCast == Action.CAST || castOrOpponentCast == Action.OPPONENT_CAST)
      for (Recipe recipe : recipes)
        if (recipe.action == castOrOpponentCast)
          recipe.castable = true;
  }

  public static int computeRecipesStateScore(List<Recipe> recipes) {
    int potentialScore = 0;
    for (Recipe recipe : recipes)
      if (recipe.action == Action.CAST && recipe.castable)
        potentialScore += recipe.rupeesPrice / 2;
    return potentialScore;
  }

  public static List<Recipe> recipesDeepCopy(List<Recipe> recipes) {
    List<Recipe> deepCopy = new ArrayList<>();
    for (Recipe recipe : recipes)
      deepCopy.add(new Recipe(recipe));
    return deepCopy;
  }

  @Override
  public String toString() {
    return "Recipe{" +
      "id=" + id +
      ", ingredients=" + Arrays.toString(ingredients) +
      ", action=" + action +
      ", rupeesPrice=" + rupeesPrice +
      ", tomeIndex=" + tomeIndex +
      ", taxCount=" + taxCount +
      ", castable=" + castable +
      ", repeatable=" + repeatable +
      '}';
  }

  @Override
  public int compareTo(Recipe o) {
    return Integer.compare(id, o.id);
  }
}

class Player {
  static final int AMOUNT_POTION_TO_BREW = 3;
  static final int INVENTORY_MAX_SIZE = 10;

  int brewedPotionCount;
  int[] inventory;
  int inventoryElementsCount;
  int score;

  public Player() {}

  public Player(Player toCopy) {
    this.brewedPotionCount = toCopy.brewedPotionCount;
    this.inventory = toCopy.inventory.clone();
    this.inventoryElementsCount = toCopy.inventoryElementsCount;
    this.score = toCopy.score;
  }

  public void update(int tier0, int tier1, int tier2, int tier3, int score) {
    this.inventory = new int[] { tier0, tier1, tier2, tier3 };
    this.inventoryElementsCount = tier0 + tier1 + tier2 + tier3;
    this.score = score;
  }

  public boolean canConsume(Recipe recipe) {
    if (recipe.action == Action.CAST &&
      (!recipe.castable || this.inventoryElementsCount + recipe.ingredientsElementsCount > INVENTORY_MAX_SIZE))
      return false;
    return inventory[0] + recipe.ingredients[0] >= 0 &&
      inventory[1] + recipe.ingredients[1] >= 0 &&
      inventory[2] + recipe.ingredients[2] >= 0 &&
      inventory[3] + recipe.ingredients[3] >= 0;
  }

  public void consume(Recipe recipe) {
    if (recipe.action == Action.CAST)
      recipe.castable = false;
    else if (recipe.action == Action.BREW)
      this.brewedPotionCount++;
    inventory[0] += recipe.ingredients[0];
    inventory[1] += recipe.ingredients[1];
    inventory[2] += recipe.ingredients[2];
    inventory[3] += recipe.ingredients[3];
    inventoryElementsCount += recipe.ingredientsElementsCount;
    score += recipe.rupeesPrice;
  }

  public void unConsume(Recipe recipe) {
    if (recipe.action == Action.BREW)
      this.brewedPotionCount--;
    inventory[0] -= recipe.ingredients[0];
    inventory[1] -= recipe.ingredients[1];
    inventory[2] -= recipe.ingredients[2];
    inventory[3] -= recipe.ingredients[3];
    inventoryElementsCount -= recipe.ingredientsElementsCount;
    score -= recipe.rupeesPrice;
  }

  /**
   * Unconsume and set castable state
   */
  public void unConsume(Recipe recipe, boolean recipeCastableStateBeforeConsume) {
    recipe.castable = recipeCastableStateBeforeConsume;
    unConsume(recipe);
  }

  public int computePlayerStateScore() {
    return score * 300
      + inventory[0] * 10
      + inventory[1] * 20
      + inventory[2] * 30
      + inventory[3] * 50;
  }

  @Override
  public String toString() {
    return "Player{" +
      "inventory=" + Arrays.toString(inventory) +
      ", score=" + score +
      ", brewedPotionCount=" + brewedPotionCount +
      '}';
  }

  public static void main(String[] args) {
    GameState.main(args);
  }
}

class Pair<A, B> {
  A left;
  B right;

  public Pair(A left, B right) {
    this.left = left;
    this.right = right;
  }
}
