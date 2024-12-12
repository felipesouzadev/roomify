'use client'
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Card } from "@nextui-org/react";
import axios from "axios"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageWrapper from '../../components/PageWrapper';
import GetCurrentWeek from "../utils/GetCurrentWeek";

export default function Schedule(){
    const localizer = momentLocalizer(moment);
    const { sunday, friday } = GetCurrentWeek(new Date());
    const [events, setEvents] = useState([]);
    const [startDate, setStartDate] = useState(sunday);
    const [endDate, setEndDate] = useState(friday);
    const [filteredDates, setFilteredDates] = useState([]);
    const currentDate = new Date();

    const handleDatesChange = (range, start, end) => {
      setStartDate(range[0].toISOString().split('T')[0]);
      setEndDate(range[range.length - 1].toISOString().split('T')[0]);
    }

    const customSlotPropGetter = (date) => {
      if(date.getDay() === currentDate.getDay() && date.getDate() === currentDate.getDate()){
        return {
          className: "bg-secondary",
        }
      }
      return {
        className: "",
      }
    }

    const customDayPropGetter = (date) => {
        if(date.getDay() === currentDate.getDay() && date.getDate() === currentDate.getDate()){
          return {
            className: "bg-secondary",
          }
        } else {
          return {
            className: "",
          }
        }

    }

    useEffect(() => {
      if(!filteredDates.some((date) => date.startDate === startDate && date.endDate === endDate)){
        axios.get(`/api/events?startDate=${startDate}&endDate=${endDate}`)
          .then((response) =>  {
            const foundEvents = response.data.map((event) => {
              return {
                id: event.id,
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
              };
            });
            setFilteredDates(filteredDates.concat({startDate: startDate, endDate: endDate}));
            setEvents(events.concat(foundEvents));
          });
        }
    }, [startDate, endDate]);
  
    return (
      <PageWrapper>
        <h1 className="text-3xl font-bold text-center mb-4">Schedule</h1>
        <Card className="bg-background text-foreground">
            <Calendar
              localizer={localizer}
              events={events}
              defaultDate={currentDate}
              startAccessor="start"
              endAccessor="end"
              className="rounded-lg overflow-hidden"
              views={["week"]}
              defaultView="week"
              showMultiDayTimes
              dayLayoutAlgorithm="no-overlap"
              slotPropGetter={customSlotPropGetter}
              dayPropGetter={customDayPropGetter}
              onRangeChange={(start, end) => {handleDatesChange(start, end)}}
              step={60}
            />
        </Card>
      </PageWrapper>
    );
  };