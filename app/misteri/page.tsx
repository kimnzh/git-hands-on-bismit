'use client';
import { useState } from 'react';
import Image  from 'next/image';


export default function KalHello() {
    const [angkaPertama, setAngkaPertama] = useState(0);
    const [operator, setOperator] = useState('+');
    const [angkaKedua, setAngkaKedua] = useState(0);
    const [hasil, setHasil] = useState(null); 
    const hitungOperasi = () => {
        let result;
        switch (operator) {
            case '+':
                result = angkaPertama + angkaKedua;
                break;
            case '-':
                result = angkaPertama - angkaKedua;
                break;
            case '*':
                result = angkaPertama * angkaKedua;
                break;
            case '/':
                if (angkaKedua === 0) {
                    result = 'Error'; 
                } else {
                    result = angkaPertama / angkaKedua;
                }
                break;
            default:
                result = 'Invalid Op'; 
        }
        setHasil(result);
    };

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen  bg-linear-to-b from-[#2e026d] to-[#15162c] text-white text-center px-4">
                <div className="p-8 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700">
                    <h1 className="text-4xl font-bold mb-6">Calculator Ceritanya</h1>
                    <div className="bg-gray-900 text-right p-4 rounded-md mb-4 shadow-inner min-h-[100px]">
                        <p className="text-3xl font-mono tracking-wider text-gray-400">
                            {`${angkaPertama} ${operator} ${angkaKedua}`}
                        </p>
                        {hasil !== null && (
                            <p className="text-5xl font-bold text-gray-400 mt-1">
                                = {hasil}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <input 
                            type="number"
                            value={angkaPertama}
                            onChange={(e) => setAngkaPertama(Number(e.target.value))}
                            className="w-full sm:w-auto p-3 text-lg text-center bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            aria-label="Angka Pertama"
                        />
                        <input
                            type="text"
                            maxLength="1"
                            value={operator}
                            onChange={(e) => setOperator(e.target.value)}
                            className="w-16 p-3 text-lg text-center font-bold bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            aria-label="Operator"
                        />
                        <input 
                            type="number"
                            value={angkaKedua}
                            onChange={(e) => setAngkaKedua(Number(e.target.value))}
                            className="w-full sm:w-auto p-3 text-lg text-center bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            aria-label="Angka Kedua"
                        />
                    </div>
                    <button
                        onClick={hitungOperasi}
                        className="w-full mt-6 py-3 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Hitung (=)
                    </button>
                </div>

            </main>
        </>
    );
}