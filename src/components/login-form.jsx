import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/authService";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

async function handleSubmit(event, navigate) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await login(email, password);

        if (!response) throw new Error("Login inválido");
        localStorage.setItem("token", response.access_token);

        toast.success("Login realizado com sucesso!");
        navigate("/home");
    } catch (error) {
        toast.error(error.message || "Erro ao fazer login");
    }
}

export function LoginForm({
    className,
    ...props
}) {
    const navigate = useNavigate();
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={(e) => handleSubmit(e, navigate)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Entrar na sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Informe seu e-mail abaixo para acessar sua conta
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" variant="outline" className="w-full cursor-pointer hover:bg-gray-100">
                    Entrar
                </Button>
            </div>
            <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <a href="#" className="underline underline-offset-4">
                    Cadastre-se
                </a>
            </div>
        </form>
    );
}
