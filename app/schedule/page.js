'use client'
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Card, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure, Button, Select, SelectItem, Switch} from "@nextui-org/react";
import axios from "axios"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageWrapper from '../../components/PageWrapper';
import GetCurrentWeek from "../utils/GetCurrentWeek";
import PageActions from "../../components/PageActions";
require('moment/locale/pt-br.js')

export default function Schedule(){
    const localizer = momentLocalizer(moment);
    const { sunday, friday } = GetCurrentWeek(new Date());
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [fileredRooms, setFilteredRooms] = useState([]);
    const [filterEnabled, setFilteredEnabled] = useState(false);
    const [startDate, setStartDate] = useState(sunday);
    const [endDate, setEndDate] = useState(friday);
    const [filteredDates, setFilteredDates] = useState([]);
    const currentDate = new Date();
    const [selectedEvent, setSelectedEvent] = useState({title: ''});
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const idRegex = /room(\d+)-teacher(\d+)-weekday(\d+)-shift(MORNING|AFTERNOON|NIGHT)/;

      useEffect(() => {
        axios.get('/api/teachers')
          .then((response) => {
            setTeachers(response.data)
          });
      }, []);

      useEffect(() => {
        axios.get('/api/rooms')
          .then((response) => {
            setRooms(response.data);
          });
      }, []);

      useEffect(() => {
        if(filterEnabled) {
          if(filterType === "teacher" && selectedTeachers.length > 0){
            setFilteredEvents(events.filter((event) => {
              const match = event.id.match(idRegex);
              const teacherId = match[2];
              return selectedTeachers.includes(parseInt(teacherId))
            }));
          } else if(filterType === "room" && selectedRooms.length > 0) {
            setFilteredEvents(events.filter((event) => {
              const match = event.id.match(idRegex);
              const roomId = match[1];
              return selectedRooms.includes(parseInt(roomId))
  
            }));
          }
        }
      }, [filterType, selectedTeachers, selectedRooms, filterEnabled]);

    const handleOpenDeleteModal = (event) => {
      setSelectedEvent(event);
      onDeleteOpen();
    }

    const handleDatesChange = (range, start, end) => {
      setStartDate(range[0].toISOString().split('T')[0]);
      setEndDate(range[range.length - 1].toISOString().split('T')[0]);
    }

    const handleDeleteEvent = async () => {
      try {
        await axios.delete(`/api/events/${selectedEvent.id}`);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
        setSelectedEvent({name: ''});
        onOpenDeleteChange();
      } catch (error) {
        alert("Opa! Ocorreu um erro ao deletar o evento");
      }
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
        <div className="flex">
        <h1 color="primary" className="text-3xl font-bold text-center text-primary mb-4">Agenda</h1>
          <PageActions>
            <div className="flex justify-end w-full items-end gap-3">
            <Select
            color="primary"
            id="filterType"
            value={filterType}
            label="Filtro"
            labelPlacement="outside"
            className="rounded max-w-28"
            size="sm"
            onChange={(e) => setFilterType(e.target.value)}>
              <SelectItem key="teacher">Professor</SelectItem>
              <SelectItem key="room">Sala</SelectItem>
            </Select>
            {filterType === "teacher" && (
              <Select
                color="primary"
                id="teacher"
                value={filterType}
                labelPlacement="outside"
                label="Select Teacher"
                selectionMode="multiple"
                className="rounded max-w-28"
                size="sm"
                onChange={(e) => setSelectedTeachers(e.target.value.split(",").map(Number))}>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            {filterType === "room" && (
              <Select
                color="primary"
                id="room"
                value={filterType}
                label="Select Room"
                labelPlacement="outside"
                selectionMode="multiple"
                className="rounded max-w-28"
                size="sm"
                onChange={(e) => setSelectedRooms(e.target.value.split(",").map(Number))}>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            <Switch  color="primary" size="sm" onChange={() => setFilteredEnabled(!filterEnabled)} />
            </div>
          </PageActions>
        </div>
        <Card className="bg-background text-foreground">
            <Calendar
              localizer={localizer}
              events={filterEnabled ? filteredEvents :  events}
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
              onSelectEvent={(event) => handleOpenDeleteModal(event)}
              step={60}
              messages={{
                next: "Prox",
                previous: "Ant",
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia"
              }}
            />
        </Card>

        <Modal isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} className="bg-background">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-primary" id="modal-title" size={18}>
              Deletar Evento
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>Você tem certeza que deseja deletar o evento {selectedEvent.title}?</p>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenDeleteChange}>
              Cancelar
            </Button>
            <Button color="danger" auto onClick={handleDeleteEvent}>
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </PageWrapper>
    );
  };