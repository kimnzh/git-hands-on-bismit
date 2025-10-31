'use client';

import { useMemo, useState } from 'react';

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

function calculateWinner(board: Cell[]): Player | null {
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(''));
  const [current, setCurrent] = useState<Player>('X');
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(() => board.every((c) => c !== '') && !winner, [board, winner]);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
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
        <div className="mb-4 text-center min-h-[28px]">
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
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-4xl font-extrabold flex items-center justify-center transition select-none"
              aria-label={`cell-${i}`}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Aksi */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={resetBoard}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 font-medium transition"
          >
            Reset Papan
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