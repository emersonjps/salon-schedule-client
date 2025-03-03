"use client"

import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

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
    <section className="mt-8">
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