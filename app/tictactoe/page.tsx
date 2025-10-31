'use client';

import { useEffect, useMemo, useState } from 'react';

type Cell = 'X' | 'O' | ''; // nilai sel papan
type Player = 'X' | 'O';

const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board: Cell[]): { player: Player; combo: number[] } | null {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a] as Player, combo };
    }
  }
  return null;
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(''));
  const [current, setCurrent] = useState<Player>('X');
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const result = useMemo(() => calculateWinner(board), [board]);
  const winner = result?.player ?? null;
  const winningCells = result?.combo ?? [];
  const isDraw = useMemo(() => board.every((c) => c !== '') && !winner, [board, winner]);

  useEffect(() => {
    const savedScore = localStorage.getItem("Score");
    if (savedScore) {
      const {x, o} = JSON.parse(savedScore);
      setXScore(x);
      setOScore(o);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Score", JSON.stringify({x: xScore, o: oScore}));
  }, [xScore, oScore]);

  function handleClick(index: number) {
    // Jika sel sudah terisi atau sudah ada pemenang, abaikan klik
    if (board[index] !== '' || winner) return;

    const next = [...board];
    next[index] = current;
    setBoard(next);

    // Cek pemenang setelah langkah ini
    const w = calculateWinner(next);
    if (w) {
      if (w === 'X') setXScore((s) => s + 1);
      else setOScore((s) => s + 1);
      return;
    }

    // Jika belum menang, ganti giliran
    setCurrent((prev) => (prev === 'X' ? 'O' : 'X'));
  }

  function resetBoard() {
    setBoard(Array(9).fill(''));
    setCurrent('X');
  }

  function resetScore() {
    setXScore(0);
    setOScore(0);
    localStorage.removeItem("tictactoeScore")
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Tic-Tac-Toe</h1>

        {/* Skor */}
        <div className="grid grid-cols-3 gap-3 text-center mb-6">
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <p className="text-sm opacity-80">Pemain</p>
            <p className="text-xl font-semibold">{current}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <p className="text-sm opacity-80">Skor X</p>
            <p className="text-xl font-semibold">{xScore}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/10">
            <p className="text-sm opacity-80">Skor O</p>
            <p className="text-xl font-semibold">{oScore}</p>
          </div>
        </div>

        {/* Status permainan */}
        <div className="mb-4 text-center min-h-7">
          {winner ? (
            <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
              🎉 Pemenang: <span className="font-bold">{winner}</span>
            </span>
          ) : isDraw ? (
            <span className="inline-block px-3 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/40">
              🤝 Seri! Tidak ada pemenang.
            </span>
          ) : (
            <span className="inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/20">
              Giliran <span className="font-semibold">{current}</span>
            </span>
          )}
        </div>

        {/* Papan 3x3 */}
        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, i) => {
            const isWinningCell = winningCells.includes(i);
            
            return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`aspect-square rounded-2xl border text-4xl font-extrabold flex items-center justify-center transition select-none
                ${isWinningCell
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_15px_#34d399]'
                  : 'bg-white/5 border-white/15 hover:bg-white/10'}
              `}
              aria-label={`cell-${i}`}
            >
              {cell}
            </button>
            );
          })}

        </div>

        {/* Aksi */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={resetBoard}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 shadow-md transition"
          >
            Reset Papan
          </button>

          <button
            onClick={resetScore}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 shadow-md transition"
          >
            Reset Score
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 text-sm text-gray-300/90 space-y-1">
          <p>🔁 Papan akan terkunci ketika ada pemenang. Tekan <em>Reset Papan</em> untuk mulai lagi.</p>
          <p>🧠 Coba refactor: ekstrak komponen <code>&lt;Square/&gt;</code> sendiri dan tambahkan animasi jika mau.</p>
        </div>
      </div>
    </main>
  );
}
