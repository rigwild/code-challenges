import java.util.*;
import java.io.*;
import java.math.*;
import java.util.HashMap;

class Player {
    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int nbFloors = in.nextInt(); // number of floors
        int width = in.nextInt(); // width of the area
        int nbRounds = in.nextInt(); // maximum number of rounds
        int exitFloor = in.nextInt(); // floor on which the exit is found
        int exitPos = in.nextInt(); // position of the exit on its floor
        int nbTotalClones = in.nextInt(); // number of generated clones
        int nbAdditionalElevators = in.nextInt(); // ignore (always zero)
        int nbElevators = in.nextInt(); // number of elevators

        HashMap<Integer, Integer> elevators = new HashMap<>();
        for (int i = 0; i < nbElevators; i++) {
            int elevatorFloor = in.nextInt(); // floor on which this elevator is found
            int elevatorPos = in.nextInt(); // position of the elevator on its floor
            elevators.put(elevatorFloor, elevatorPos);
        }

        // game loop
        while (true) {
            int cloneFloor = in.nextInt(); // floor of the leading clone
            int clonePos = in.nextInt(); // position of the leading clone on its floor
            String direction = in.next(); // direction of the leading clone: LEFT or RIGHT

            boolean isOnExitFloor = cloneFloor == exitFloor;
            Integer sameFloorElevatorPos = elevators.get(cloneFloor);
            if (sameFloorElevatorPos == null) sameFloorElevatorPos = -1;
            int posToTarget = isOnExitFloor ? exitPos : sameFloorElevatorPos;
            String targetDirection = clonePos < posToTarget ? "RIGHT" : "LEFT";

            // action: WAIT or BLOCK
            if ((clonePos != posToTarget && !targetDirection.equals(direction)) || clonePos == 0 || clonePos == width - 1)
              System.out.println("BLOCK");
            else System.out.println("WAIT");
        }
    }
}