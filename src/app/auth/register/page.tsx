"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // You can change the role as needed; this default is "ADMIN"
    const [role, setRole] = useState("ADMIN");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!response.ok) {
                throw new Error("Erro no registro");
            }

            const data = await response.json();
            // Caso receba um token ou outra confirmação, redirecione conforme necessário
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "Erro no registro");
        }
    };

    return (
        <main className="justify-center items-center flex flex-col h-screen">
            <h1 className="text-6xl mb-4">Registro</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    value={name}
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
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
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Registrar
                </button>
                {error && <span className="text-red-500">{error}</span>}
            </form>
        </main>
    );
}