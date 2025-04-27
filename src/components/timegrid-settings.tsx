'use client';

import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import {
    ListPlus
} from 'lucide-react';
import TimeSlotSettings from './time-slot-settings';
import { useState } from 'react';

export type TimeSlot = {
    start_time: string;
    end_time: string;
};

type DayOfWeek = {
    id: string;
    label: string;
    control: {
        timeSlots: TimeSlot[];
    };
};

const dayOfWeek: DayOfWeek[] = [
    {
        id: 'monday',
        label: 'Segunda-feira',
        control: { timeSlots: [] }
    },
    {
        id: 'tuesday',
        label: 'Terça-feira',
        control: { timeSlots: [] }
    },
    {
        id: 'wednesday',
        label: 'Quarta-feira',
        control: { timeSlots: [] }
    },
    {
        id: 'thursday',
        label: 'Quinta-feira',
        control: { timeSlots: [] }
    },
    {
        id: 'friday',
        label: 'Sexta-feira',
        control: { timeSlots: [] }
    },
    {
        id: 'saturday',
        label: 'Sábado',
        control: { timeSlots: [] }
    },
    {
        id: 'sunday',
        label: 'Domingo',
        control: { timeSlots: [] }
    },
];


export default function TimeGridSettings() {
    const [dayOfWeekState, setDayOfWeekState] = useState(dayOfWeek);

    const handleTimeSlotSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const [dayId, timeSlotIndex, field] = id.split('-');
        const index = parseInt(timeSlotIndex, 10);
        setDayOfWeekState((prevState) =>
            prevState.map((day) => {
                if (day.id === dayId) {
                    const updatedTimeSlots = [...day.control.timeSlots];
                    if (field === 'start') {
                        updatedTimeSlots[index] = { ...updatedTimeSlots[index], start_time: value };
                    } else if (field === 'end') {
                        updatedTimeSlots[index] = { ...updatedTimeSlots[index], end_time: value };
                    }
                    return { ...day, control: { ...day.control, timeSlots: updatedTimeSlots } };
                }
                return day;
            }
            )
        );
    };

    const addTimeSlot = (dayId: string) => {
        setDayOfWeekState((prevState) =>
            prevState.map((day) =>
                day.id === dayId
                    ? {
                          ...day,
                          control: {
                              ...day.control,
                              timeSlots: [...day.control.timeSlots, { start_time: '', end_time: '' }],
                          },
                      }
                    : day
            )
        );
    };

    const removeTimeSlot = (item: TimeSlot) => {
        setDayOfWeekState((prevState) =>
            prevState.map((day) => ({
                ...day,
                control: {
                    ...day.control,
                    timeSlots: day.control.timeSlots.filter((slot) => slot !== item),
                },
            }))
        );
    };

    const onConfirm = () => {
        const timeSlots = dayOfWeekState.reduce((acc, day) => {
            const dayTimeSlots = day.control.timeSlots
            .filter((slot) => slot.start_time.trim() !== '' && slot.end_time.trim() !== '')
            .map((slot) => ({
                start_date: slot.start_time,
                end_date: slot.end_time,
            }));
            return { ...acc, [day.id]: dayTimeSlots };
        }, {});
        console.log('Time Slots:', timeSlots);
        toast.success('Configurações salvas com sucesso!');
        // Aqui você pode fazer o que quiser com os dados, como enviá-los para uma API
    };

    return (
        <>
            <div className='mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50'>
                <div className='flex flex-col gap-4 p-4'>
                    <h1 className='text-xl font-bold'>Configurações de grade de tempo</h1>
                    <p className='text-sm text-muted-foreground'>
                        Aqui você pode ajustar as configurações da grade de tempo.
                    </p>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='time-grid-interval' className='text-sm font-medium'>
                            Intervalo da grade de tempo
                        </label>
                        <Input 
                            id='time-grid-interval'
                            type='number'
                            placeholder='Intervalo em minutos'
                            // onChange={handleTimeGridSettings}
                            className='w-48'
                            min={1}
                            max={120}
                            step={5}
                            defaultValue={15}
                        />

                        <div>
                        <Accordion type="single" collapsible className="w-full">
                            {dayOfWeekState.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger>{item.label}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className='text-sm text-muted-foreground'>
                                            Aqui você pode configurar as opções para {item.label}.
                                        </p>
                                        <div className='flex flex-col items-center gap-4 mt-4'>
                                            {item.control.timeSlots?.map((timeSlot: any, index: number) => (
                                                <TimeSlotSettings 
                                                    key={index} 
                                                    item={timeSlot} 
                                                    dayId={item.id} 
                                                    index={index} 
                                                    handleTimeSlotSettings={handleTimeSlotSettings} 
                                                    removeTimeSlot={removeTimeSlot} 
                                                />
                                            ))}
                                            <Button variant='outline' className='ml-4 w-full' onClick={() => addTimeSlot(item.id)}>
                                                <ListPlus />
                                                <span className='text-sm font-medium'>Adicionar intervalo</span>
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        </div>
                    </div>  
                    <Button onClick={onConfirm}>Salvar</Button>
                </div>
            </div>
        </>
    );
}

