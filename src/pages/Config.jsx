import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeekdayConfig } from "@/components/WeekdayConfig";
import api from "@/services/api";

const weekdays = [
    { label: "Segunda-feira", id: "monday" },
    { label: "Terça-feira", id: "tuesday" },
    { label: "Quarta-feira", id: "wednesday" },
    { label: "Quinta-feira", id: "thursday" },
    { label: "Sexta-feira", id: "friday" },
    { label: "Sábado", id: "saturday" },
    { label: "Domingo", id: "sunday" },
];

export default function Config() {
    const [duration, setDuration] = useState("00:30");

    const [scheduleConfig, setScheduleConfig] = useState(() =>
        Object.fromEntries(
            weekdays.map((day) => [
                day.id,
                {
                    active: false,
                    startTime: "09:00:00",
                    breakStart: "12:00:00",
                    breakEnd: "13:00:00",
                    endTime: "18:00:00",
                },
            ])
        )
    );

    const handleChange = (dayId, field, value) => {
        setScheduleConfig((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        const payload = weekdays.map((day) => ({
            day: day.id,
            ...scheduleConfig[day.id],
            duration,
        }));

        console.log("Enviando para o back-end:", payload);

        try {
            const response = await api.post("/schedules", payload);

            if (!response.ok) throw new Error("Erro ao salvar");
            alert("Configuração salva com sucesso!");
        } catch (err) {
            alert("Erro ao salvar horários!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted">
            <Card className="w-full max-w-5xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-2">
                        Configuração da aplicação
                    </CardTitle>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="duration" className="text-base">
                            Tempo por atendimento
                        </Label>
                        <Input
                            id="duration"
                            type="time"
                            step="60"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-40"
                        />
                    </div>
                </CardHeader>

                <CardContent className="space-y-6 mt-4">
                    {weekdays.map((day) => (
                        <WeekdayConfig
                            key={day.id}
                            day={day.label}
                            checkboxId={day.id}
                            data={scheduleConfig[day.id]}
                            onChange={(field, value) => handleChange(day.id, field, value)}
                        />
                    ))}

                    <div className="flex justify-end">
                        <Button onClick={handleSubmit}>Salvar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
