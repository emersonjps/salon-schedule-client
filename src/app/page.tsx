"use client"

import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Slot {
  startTime: string
  endTime: string
  available: boolean
}

interface Agenda {
  id: number
  professionalId: number
  date: string
  workStartTime: string
  workEndTime: string
  slots: Slot[]
  createdAt: string
  updatedAt: string
}

export default function Agenda() {
  const [agenda, setAgenda] = useState<Agenda | null>(null)

  useEffect(() => {
    fetch("http://localhost:3000/timegrid")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAgenda(data[0])
        }
      })
      .catch((err) => console.error(err))
  }, [])

  if (!agenda) return <p>Carregando agenda...</p>

  const events = agenda.slots.map((slot) => ({
    title: slot.available ? "Disponível" : "Indisponível",
    start: `${agenda.date}T${slot.startTime}`,
    end: `${agenda.date}T${slot.endTime}`,
    color: slot.available ? "green" : "red",
  }))

  return (
    <section className="mt-8 pl-10 pr-10">

      <nav className="flex flex-row justify-end gap-2">
        {Array.from({ length: 7 }).map((_, i) => {          
          return (
            <Avatar key={i}>
              <AvatarImage src="https://avatars.githubusercontent.com/u/82915254?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )
        })}
      </nav>

      <h2 className="text-3xl font-bold">Agenda para {agenda.date}</h2>
      <p>
        Horário de trabalho: {agenda.workStartTime} - {agenda.workEndTime}
      </p>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
        height="auto"
      />
    </section>
  )
}