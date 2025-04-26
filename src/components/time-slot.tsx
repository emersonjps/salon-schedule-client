import { Input } from './ui/input';

export default function TimeSlotSettings({ 
    item, 
    handleTimeSlotSettings 
}: { 
    item: { id: string }, 
    handleTimeSlotSettings: (event: React.ChangeEvent<HTMLInputElement>) => void 
}) {
    return (
        <div className='flex justify-between items-center mt-4'>
            <div className='flex gap-2'>
                <div>
                    <label htmlFor={`${item.id}-start-time`} className='text-sm font-medium'>
                        Horário de início
                    </label>
                    <Input 
                        id={`${item.id}-start-time`}
                        type='time'
                        onChange={handleTimeSlotSettings}
                        className='w-48'
                    />
                </div>
                <div>
                    <label htmlFor={`${item.id}-end-time`} className='text-sm font-medium'>
                        Horário de intervalo
                    </label>
                    <Input
                        id={`${item.id}-end-time`}
                        type='time'
                        onChange={handleTimeSlotSettings}
                        className='w-48'
                    />
                </div>
            </div>
        </div>
    );
}