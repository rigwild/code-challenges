use std::io::*;macro_rules!r{($x:expr,$t:ident)=>($x.trim().parse::<$t>().unwrap())}fn main(){let mut q="".to_string();stdin().read_line(&mut q).unwrap();let k=q.split(" ").collect::<Vec<_>>();let n=r!(k[0],i32);let i=r!(k[1],i32);let mut l=r!(k[2],i32);let mut o=r!(k[3],i32);loop{let mut z="".to_string();if o<i{z+="S";o+=1;}if o>i{z+="N";o-=1;}if l<n{z+="E";l+=1;}if l>n{z+="W";l-=1;}println!("{z}")}}