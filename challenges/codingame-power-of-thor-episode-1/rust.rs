use std::io;
macro_rules! r {
    ($x:expr, $t:ident) => {
        $x.trim().parse::<$t>().unwrap()
    };
}
fn main() {
    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    let i = input_line.split(" ").collect::<Vec<_>>();
    let l = r!(i[0], i32);
    let m = r!(i[1], i32);
    let mut x = r!(i[2], i32);
    let mut y = r!(i[3], i32);
    loop {
        let mut input_line = String::new();
        io::stdin().read_line(&mut input_line).unwrap();

        let mut my_move = "".to_string();

        if y > m {
            my_move += "N";
            y += -1;
        } else if y < m {
            my_move += "S";
            y += 1;
        }

        if x > l {
            my_move += "W";
            x += -1;
        }
        if x < l {
            my_move += "E";
            x += 1;
        }
        println!("{my_move}");
    }
}
