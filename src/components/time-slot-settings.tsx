import {
    Trash2
} from 'lucide-react';
import { Button } from './ui/button';
import { TimeSlot } from './timegrid-settings';

type TimeSlotSettingsProps = {
  item: TimeSlot;
  handleTimeSlotSettings: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeTimeSlot: (item: TimeSlot) => void;
  dayId: string;
  index: number;
};

export default function TimeSlotSettings({
  item,
  handleTimeSlotSettings,
  removeTimeSlot,
  dayId,
  index,
}: TimeSlotSettingsProps) {
  return (
    <div className="flex gap-2">
      <input
        id={`${dayId}-${index}-start`}
        type="time"
        value={item.start_time}
        onChange={handleTimeSlotSettings}
        className="border rounded p-1"
      />
      <input
        id={`${dayId}-${index}-end`}
        type="time"
        value={item.end_time}
        onChange={handleTimeSlotSettings}
        className="border rounded p-1"
      />
      <Button onClick={() => removeTimeSlot(item)}><Trash2/></Button>
    </div>
  );
}