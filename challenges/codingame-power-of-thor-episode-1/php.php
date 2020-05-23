<?php
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

// $lightX: the X position of the light of power
// $lightY: the Y position of the light of power
// $initialTx: Thor's starting X position
// $initialTy: Thor's starting Y position
fscanf(STDIN, "%d %d %d %d", $lightX, $lightY, $initialTx, $initialTy);

// game loop
while (TRUE)
{
    // $remainingTurns: The remaining amount of turns Thor can move. Do not remove this line.
    fscanf(STDIN, "%d", $remainingTurns);

$move = "";
if ($initialTy > $lightY) {
    $move .= 'N';
    $initialTy += -1;
}
else if ($initialTy < $lightY) {
    $move .= 'S';
    $initialTy += 1;
}
if ($initialTx > $lightX) {
    $move .= 'W';
    $initialTx += -1;
}
else if ($initialTx < $lightX) {
    $move .= 'E';
    $initialTx += 1;
}

    // A single line providing the move to be made: N NE E SE S SW W or NW
    echo("$move\n");
}
?>