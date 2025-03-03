"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciais inválidas");
            }

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "Erro no login");
        }
    };

    return (
        <main className="justify-center items-center flex flex-col h-screen">
            <h1 className="text-6xl mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Entrar
                </button>
                {error && <span className="text-red-500">{error}</span>}
            </form>
            <p className="mt-4">
                Não possui uma conta?{" "}
                <Link href="/auth/register" className="text-blue-500 hover:underline">
                    Registrar-se
                </Link>
            </p>
        </main>
    );
}