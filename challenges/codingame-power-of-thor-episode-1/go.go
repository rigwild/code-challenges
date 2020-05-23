package main

import "fmt"

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

func main() {
    // lightX: the X position of the light of power
    // lightY: the Y position of the light of power
    // initialTx: Thor's starting X position
    // initialTy: Thor's starting Y position
    var lightX, lightY, initialTx, initialTy int
    fmt.Scan(&lightX, &lightY, &initialTx, &initialTy)
    
    for {
        // remainingTurns: The remaining amount of turns Thor can move. Do not remove this line.
        var remainingTurns int
        fmt.Scan(&remainingTurns)
var move = "";    
if initialTy > lightY {
    move += "N";
    initialTy += -1;
}
if initialTy < lightY {
    move += "S";
    initialTy += 1;
}
if initialTx > lightX {
    move += "W";
    initialTx += -1;
}
if initialTx < lightX {
    move += "E";
    initialTx += 1;
}  
        // A single line providing the move to be made: N NE E SE S SW W or NW
        fmt.Println(move)
    }
}