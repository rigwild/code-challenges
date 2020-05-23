using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/
class Player
{
    static void Main(string[] args)
    {
        string[] inputs = Console.ReadLine().Split(' ');
        int lightX = int.Parse(inputs[0]); // the X position of the light of power
        int lightY = int.Parse(inputs[1]); // the Y position of the light of power
        int initialTx = int.Parse(inputs[2]); // Thor's starting X position
        int initialTy = int.Parse(inputs[3]); // Thor's starting Y position

        // game loop
        while (true)
        {
            int remainingTurns = int.Parse(Console.ReadLine()); // The remaining amount of turns Thor can move. Do not remove this line.

            // Write an action using Console.WriteLine()
            // To debug: Console.Error.WriteLine("Debug messages...");
String move = "";
if (initialTy > lightY) {
    move += 'N';
    initialTy += -1;
}
else if (initialTy < lightY) {
    move += 'S';
    initialTy += 1;
}
if (initialTx > lightX) {
    move += 'W';
    initialTx += -1;
}
else if (initialTx < lightX) {
    move += 'E';
    initialTx += 1;
}

            // A single line providing the move to be made: N NE E SE S SW W or NW
            Console.WriteLine(move);
        }
    }
}