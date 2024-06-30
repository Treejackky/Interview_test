"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://ccc-back-hdvr.vercel.app/historys")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        setHistory(json);
      });
  }, []);

  return (
    <>
      {history.map((his, index) => (
        
        <div key={index}>
          <div className="content-board">

          <div>Winner: {his.winner}</div>

            <table>
              <tbody>
                {Array.from({ length: his.board_size }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: his.board_size }).map(
                      (_, colIndex) => (
                        <td key={colIndex}>
                          {his.board[rowIndex] && his.board[rowIndex][colIndex]}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

                <br />
              <div className="show-detail">
                {his.episodes.map(
                  (episode: any, episodeIndex: number) =>
                    episodeIndex > 2 && (
                      <div key={episodeIndex}>
                        <div>round: {episode.ep} </div>
                        <div>type: {episode.type} </div>
                        <div>row: {episode.row} </div>
                        <div>col: {episode.col} </div>
                      </div>
                    )
                )}
            
            </div>
          </div>
          <br />
        </div>
      ))}
    </>
  );
}
