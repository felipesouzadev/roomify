'use client'

import PageWrapper from "../components/PageWrapper";
import Room from "../components/Room";
import { useState, useEffect } from "react";
import axios from "axios"
import { Button, Input, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Form } from "@nextui-org/form";
import PageActions from "../components/PageActions";

export default function HomePage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState("");
  const [weekday, setWeekday] = useState([new Date().getDay()]);
  const [capacity, setCapacity] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const availableShifts = [{key: "MORNING", label: "Morning"},
                           {key: "AFTERNOON", label: "Afternoon"},
                           {key: "NIGHT", label: "Night"}];
  const availableWeekday = [{key: 1, label: "Monday"},
                              {key: 2, label: "Tuesday"},
                              {key: 3, label: "Wednesday"},
                              {key: 4, label: "Thursday"},
                              {key: 5, label: "Friday"},
                              {key: 6, label: "Saturday"},
                              {key: 0, label: "Sunday"}];
  
  useEffect(() => {
    if(selectedRoom){
      onOpenChange();
    }

  }, [selectedRoom]);

  const setBlankState = () => {
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
    setShift(null);
    setWeekday(new Date().getDay());
    setCapacity(null);
    setSelectedRoom(null);
    setAvailableRooms([]);
    setSelectedTeacher(null);
  }

  useEffect(() => {
    axios.get('/api/teachers')
      .then((response) => setTeachers(response.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/rooms/search?startDate=${startDate}&endDate=${endDate}&shift=${shift}&capacity=${capacity}&weekday=${weekday}`);
      const data = await response.data;
      setAvailableRooms(data);
    } catch (error) {
      console.error("Error searching rooms:", error);
      alert("An error occurred while searching for rooms.");
    }
  };

  const handleScheduleRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/schedule`, { teacherId: Number(selectedTeacher),
                                                           roomId: Number(selectedRoom.id),
                                                           shift,
                                                           startDate,
                                                           endDate,
                                                           weekDay: weekday.split(",").map(Number)
                                                          });
      const data = await response.data;
      alert("Successfully scheduled room");
      onOpenChange();
      setBlankState();
    } catch (error) {
      console.error("Error searching rooms:", error);
      alert("An error occurred while scheduling.");
    }
  };

  return (
      <PageWrapper>
        <div className="flex">
        <h1 className="text-2xl font-bold mb-4 align-baseline">Search Available Rooms</h1>
        <PageActions>
        <Form validationBehavior="native" className="flex flex-row items-baseline" onSubmit={handleSearch}>
                <Input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  isRequired
                  labelPlacement="outside"
                  label="Start Date"
                />
                 <Input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  isRequired
                  labelPlacement="outside"
                  label="End Date"
                />
                <Select
                  id="shift"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full  px-3 py-2 rounded"
                  isRequired
                  labelPlacement="outside"
                  label="Shift"
                >
                  {availableShifts.map((shift) => (
                    <SelectItem key={shift.key}>{shift.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  id="weekday"
                  labelPlacement="outside"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                  className="w-full  px-3 py-2 rounded"
                  isRequired
                  selectionMode="multiple"
                  label="Weekday"
                >
                  {availableWeekday.map((weekday) => (
                    <SelectItem key={weekday.key}>{weekday.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  placeholder="Capacity"
                  isRequired
                  labelPlacement="outside"
                  label="Capacity"
                />
                <Button type="submit" className="text-white px-4 py-2 rounded">
                  Search
                </Button>
            </Form>
        </PageActions>
        </div>
        <div className="flex  justify-between">
          <div className="flex flex-row w-auto">
            {availableRooms.length > 0 && (
              <div className="flex flex-col mt-6 gap-4">
                <h2 className="text-xl font-semibold">Found Rooms</h2>
                <div className="flex flex-row flex-wrap gap-6">
                  {availableRooms.map((room) => (
                    <Room key={room.id} room={room} setSelectedRoom={setSelectedRoom}/>
                  ))}
                  </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <ModalHeader>
            </ModalHeader>
            <ModalBody>
              <Select
                type="date"
                id="teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded"
                isRequired
                labelPlacement="outside"
                label="Teacher"
              >
                {teachers.map((teacher) => (
                    <SelectItem key={teacher.id}>{teacher.name}</SelectItem>
                  ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="error" onClick={onOpenChange}>
                Cancel
              </Button>
              <Button auto onClick={handleScheduleRoom}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageWrapper>
  );
}
