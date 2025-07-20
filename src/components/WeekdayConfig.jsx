import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WeekdayConfig({ day, checkboxId, data, onChange }) {
    return (
        <div className="border p-4 rounded-xl space-y-4 shadow-sm bg-card">
            <div className="flex items-center space-x-3">
                <Checkbox
                    id={checkboxId}
                    checked={data.active}
                    onCheckedChange={(checked) => onChange("active", !!checked)}
                />
                <Label htmlFor={checkboxId} className="text-lg font-medium">
                    {day}
                </Label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <Label>Início</Label>
                    <Input
                        type="time"
                        step="1"
                        value={data.startTime}
                        onChange={(e) => onChange("startTime", e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label>Início intervalo</Label>
                    <Input
                        type="time"
                        step="1"
                        value={data.breakStart}
                        onChange={(e) => onChange("breakStart", e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label>Fim intervalo</Label>
                    <Input
                        type="time"
                        step="1"
                        value={data.breakEnd}
                        onChange={(e) => onChange("breakEnd", e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label>Término</Label>
                    <Input
                        type="time"
                        step="1"
                        value={data.endTime}
                        onChange={(e) => onChange("endTime", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
