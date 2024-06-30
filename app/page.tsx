"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [len, setLen] = useState(3);
  const [swap, setSwap] = useState(0);
  const [board, setBoard] = useState<string[][]>([]);
  const [count, setCount] = useState(0);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [winner, setWinner] = useState<any>("");

  function create_Board(n: number) {
    setLen(n);
    const newBoard = Array.from({ length: n }, () => Array(n).fill(""));
    const newEpisodes = Array.from({ length: n }, () =>
      Array.from({ length: n }, (_, colIndex) => ({
        ep: colIndex + 1,
        type: "",
      }))
    );
    setBoard(newBoard);
    setEpisodes(newEpisodes);
  }

  useEffect(() => {
    create_Board(3);
  }, []);

  function changeValue(col: any, row: any, input: any) {
    let c1 = 0;
    let c2 = 0;
    let draw = 0;
    let win = "";

    if (winner == "") {
      
      const newBoard = [...board];
      if (newBoard[row][col] == "") {
        newBoard[row][col] = input == 0 ? "O" : "X";
      }

      //check row
      for (let i = 0; i < len; i++) {
        c1 = 0;
        c2 = 0;
        for (let j = 0; j < len; j++) {
          if (newBoard[i][j] == "X") {
            c1++;
          } else if (newBoard[i][j] == "O") {
            c2++;
          }
        }
        if (c1 == len) {
          console.log("X is win");
          win = "X";
        } else if (c2 == len) {
          console.log("O is win");
          win = "O";
        } else {
          draw = 1;
        }
      }

      // check col
      for (let i = 0; i < len; i++) {
        c1 = 0;
        c2 = 0;
        for (let j = 0; j < len; j++) {
          if (newBoard[j][i] == "X") {
            c1++;
          } else if (newBoard[j][i] == "O") {
            c2++;
          }
        }
        if (c1 == len) {
          console.log("X is win");
          win = "X";
        } else if (c2 == len) {
          console.log("O is win");
          win = "O";
        } else {
          draw = 1;
        }
      }

      //check left
      c1 = 0;
      c2 = 0;
      for (let i = 0; i < len; i++) {
        if (newBoard[i][i] == "X") {
          c1++;
          if (c1 == len) {
            break;
          }
        } else if (newBoard[i][i] == "O") {
          c2++;
          if (c2 == len) {
            break;
          }
        }
      }
      if (c1 == len) {
        console.log("X is win");
        win = "X";
      } else if (c2 == len) {
        console.log("O is win");
        win = "O";
      } else {
        draw = 1;
      }

      //check right
      c1 = 0;
      c2 = 0;
      for (let i = 0; i < len; i++) {
        for (let j = len - 1 - i; j >= 0; j--) {
          if (newBoard[i][j] == "X") {
            console.log(i, j, newBoard[i][j], c1);
            c1++;
            break;
          } else if (newBoard[i][j] == "O") {
            c2++;
            break;
          }
        }
      }
      if (c1 == len) {
        console.log("X is win");
        win = "X";
      } else if (c2 == len) {
        console.log("O is win");
        win = "O";
      } else {
        draw = 1;
      }

      //check draw
      setCount(count + 1);
      // console.log(count);
      if (draw == 1 && count == len * len - 1) {
        console.log("Draw");
        win = "No One";
      }

      setBoard(newBoard);
      const episode = {
        ep: count,
        type: input === 0 ? "O" : "X",
        row: row,
        col: col,
      };
      setEpisodes([...episodes, episode]);

      setWinner(win);

      console.log(episodes);

      input == 0 ? setSwap(1) : setSwap(0);
    }
  }

  function restart() {
    create_Board(len);
    setEpisodes([]);
    setWinner("");
    setCount(0);
    setSwap(0);
  }

  function save(){
    console.log("save");
    console.log(board);
    console.log(episodes);

    const data = {
      board: board,
      episodes: episodes,
      winner: winner,
      board_size: len,
    };

    fetch("https://ccc-back-hdvr.vercel.app/historys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Request complete! response:", res);
    });

  }

  function route() {
    router.push("/history");
  }
  
  return (
    <>
      <div>
        <div className="input-bar">
          <input
            type="text"
            placeholder="ไม่แนะนำกรอกเกิน 100"
            
            onChange={(e) => create_Board(parseInt(e.target.value.replace(/[^0-9]/g, "")))
            }
          />
          <button onClick={() => {route()}}> History </button>
        </div>

        <table>
          <tbody>
            {Array.from({ length: len }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: len }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    onClick={() => changeValue(colIndex, rowIndex, swap)}
                  >
                    {" "}
                    {board[rowIndex] && board[rowIndex][colIndex]}{" "}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {winner && (
          <div className="winner">
            <h1>The Winner is {winner}</h1>
            <div className="winner-col">
              <button onClick={() => restart()} className="restart-button">
                Restart
              </button>
              <button onClick={() => {save()}}> Save </button>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
