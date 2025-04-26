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
import TimeSlotSettings from './time-slot';
import { useState } from 'react';

type TimeSlot = {
    start_date: string;
    end_date: string;
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
        control: { 
            timeSlots: [] 
        }
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
        debugger;
        const index = parseInt(timeSlotIndex, 10);
        setDayOfWeekState((prevState) =>
            prevState.map((day) => {
                if (day.id === dayId) {
                    const updatedTimeSlots = [...day.control.timeSlots];
                    if (field === 'start') {
                        updatedTimeSlots[index] = { ...updatedTimeSlots[index], start_date: value };
                    } else if (field === 'end') {
                        updatedTimeSlots[index] = { ...updatedTimeSlots[index], end_date: value };
                    }
                    return { ...day, control: { ...day.control, timeSlots: updatedTimeSlots } };
                }
                return day;
            }
            )
        );
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
                                                <TimeSlotSettings key={index} item={timeSlot} handleTimeSlotSettings={handleTimeSlotSettings}/>
                                            ))}
                                            <Button
                                                variant='outline'
                                                className='ml-4 w-full'
                                                onClick={() => {
                                                    setDayOfWeekState((prevState) =>
                                                        prevState.map((day) => day.id === item.id
                                                                ? {
                                                                      ...day,
                                                                      control: {
                                                                          ...day.control,
                                                                        timeSlots: [...day.control.timeSlots, { start_date: '', end_date: '' }],
                                                                      },
                                                                  }
                                                                : day
                                                        )
                                                    );
                                                }}
                                            >
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
                    <Button>Salvar</Button>
                </div>
            </div>
        </>
    );
}

