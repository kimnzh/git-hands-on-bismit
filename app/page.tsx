import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Hands on to <span className="text-[hsl(280,100%,70%)]">GUGUGAGA</span>
        </h1>
        <Link
          href="/misteri"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition"
        >
          Kalkulator
        </Link>
      </div>
    </main>
  );
}
