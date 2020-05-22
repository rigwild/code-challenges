<?php
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// $nbFloors: number of floors
// $width: width of the area
// $nbRounds: maximum number of rounds
// $exitFloor: floor on which the exit is found
// $exitPos: position of the exit on its floor
// $nbTotalClones: number of generated clones
// $nbAdditionalElevators: ignore (always zero)
// $nbElevators: number of elevators
fscanf(STDIN, "%d %d %d %d %d %d %d %d", $nbFloors, $width, $nbRounds, $exitFloor, $exitPos, $nbTotalClones, $nbAdditionalElevators, $nbElevators);

$elevators = [];
for ($i = 0; $i < $nbElevators; $i++)
{
    // $elevatorFloor: floor on which this elevator is found
    // $elevatorPos: position of the elevator on its floor
    fscanf(STDIN, "%d %d", $elevatorFloor, $elevatorPos);
    $elevators[$elevatorFloor] = $elevatorPos;
}

// game loop
while (TRUE)
{
    // $cloneFloor: floor of the leading clone
    // $clonePos: position of the leading clone on its floor
    // $direction: direction of the leading clone: LEFT or RIGHT
    fscanf(STDIN, "%d %d %s", $cloneFloor, $clonePos, $direction);

    $isOnExitFloor = $cloneFloor === $exitFloor;
    $sameFloorElevatorPos = isset($elevators[$cloneFloor]) ? $elevators[$cloneFloor] : -1;
    $posToTarget = $isOnExitFloor ? $exitPos : $sameFloorElevatorPos;
    $targetDirection = $clonePos < $posToTarget ? "RIGHT" : "LEFT";
  
    // action: WAIT or BLOCK
    if (($clonePos !== $posToTarget && $targetDirection !== $direction) || $clonePos === 0 || clonePos === width - 1)
      echo("BLOCK\n");
    else echo("WAIT\n");
}
?>