'use client'
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageWrapper from '../../components/PageWrapper';

export default function Schedule(){
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
  
    const handleSelectSlot = (slotInfo) => {


    };
    
    return (
      <PageWrapper>
        <h1 className="text-3xl font-bold text-center mb-4">Schedule</h1>
        <div className="rounded-lg shadow p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => alert(`Event: ${event.title}`)}
            className="rounded-lg overflow-hidden"
            views={["month", "week", "day"]}
            defaultView="week"
          />
        </div>

      </PageWrapper>
    );
  };