import Image from "next/image";

export default function MarwaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#93BFC7] to-[#ABE7B2] text-[#016B61]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text -5xl font-extrabold tracking-tight sm:text-[5rem]">
          Hands test to <span className="text-[hsl(280,100%,70%)]">Git</span>
        </h1>
      </div>
    </main>
  );
}

