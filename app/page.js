'use client'

import PageWrapper from "../components/PageWrapper";
import Room from "../components/Room";
import { useState, useEffect } from "react";
import axios from "axios"
import { Button, Divider, Input, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Form } from "@nextui-org/form";
import PageActions from "../components/PageActions";

export default function HomePage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState("");
  const [weekday, setWeekday] = useState([new Date().getDay()]);
  const [resources, setResources] = useState([]);
  const [capacity, setCapacity] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState({name: ''})
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const availableShifts = [{key: "MORNING", label: "Manhã"},
                           {key: "AFTERNOON", label: "Tarde"},
                           {key: "NIGHT", label: "Noite"}];
  const availableWeekday = [{key: 1, label: "Segunda"},
                              {key: 2, label: "Terça"},
                              {key: 3, label: "Quarta"},
                              {key: 4, label: "Quinta"},
                              {key: 5, label: "Sexta"},
                              {key: 6, label: "Sábado"},
                              {key: 0, label: "Domingo"}];
  const [availableResources, setAvailableResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if(selectedRoom && selectedRoom.id){
      onOpenChange();
    }

  }, [selectedRoom]);

  useEffect(() => {
      axios.get('/api/resources')
        .then((response) => {
          setAvailableResources(response.data)
          setIsLoaded(true);
        });
    }, []);

  const closeModal = () => {
    onOpenChange();
    setBlankState();
  }

  const setBlankState = () => {
    setSelectedRoom({name: ''});
    setSelectedTeacher(null);
  }

  useEffect(() => {
    axios.get('/api/teachers')
      .then((response) => setTeachers(response.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/rooms/search?startDate=${startDate}&endDate=${endDate}&shift=${shift}&capacity=${capacity}&weekday=${weekday}&resources=${resources}`);
      const data = await response.data;
      setIsLoading(false);
      if(data.length === 0){
        alert("Nenhuma sala encontrada.");
      }
      setAvailableRooms(data);
    } catch (error) {
      alert("Opa! algo errado aconteceu! tente novamente.");
    }
  };

  const handleScheduleRoom = async (e) => {
    e.preventDefault();
    try {
      isLoading = true;
      const response = await axios.post(`/api/schedule`, { teacherId: Number(selectedTeacher),
                                                           roomId: Number(selectedRoom.id),
                                                           shift,
                                                           startDate,
                                                           endDate,
                                                           weekday: weekday.split(",").map(Number)
                                                          });
      const data = await response.data;
      setAvailableRooms(availableRooms.filter(room => room.id !== selectedRoom.id));
      alert("Sala agendada com sucesso!");
      onOpenChange();
      setBlankState();
    } catch (error) {
      alert("Opa! Algo deu errado! Tente novamente.");
    }
  };

  return (
      <PageWrapper>
        <div className="flex">
        <h1 className="text-2xl font-bold mb-4 align-baseline text-primary">Buscar Salas Disponíveis</h1>
          <PageActions>
            <Form validationBehavior="native" className="flex flex-row items-center" onSubmit={handleSearch}>
                    <Input
                      size="lg"
                      color="primary"
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="rounded max-w-36"
                      isRequired
                      labelPlacement="outside"
                      label="Inicio"
                    />
                    <Input
                      size="lg"
                      color="primary"
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="rounded max-w-36"
                      isRequired
                      labelPlacement="outside"
                      label="Fim"
                    />
                    <Select
                      color="primary"
                      size="lg"
                      id="shift"
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                      className="rounded min-w-32"
                      isRequired
                      labelPlacement="outside"
                      label="Turno"
                    >
                      {availableShifts.map((shift) => (
                        <SelectItem className="bg-background text-primary" key={shift.key}>{shift.label}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      color="primary"
                      size="lg"
                      id="weekday"
                      labelPlacement="outside"
                      value={weekday}
                      onChange={(e) => setWeekday(e.target.value)}
                      className="rounded min-w-32 max-w-32"
                      isRequired
                      selectionMode="multiple"
                      label="Dia da semana"
                    >
                      {availableWeekday.map((weekday) => (
                        <SelectItem className="bg-background text-primary" key={weekday.key}>{weekday.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      color="primary"
                      size="lg"
                      type="number"
                      id="capacity"
                      value={capacity}
                      onChange={(e) => setCapacity(Math.max(1, Number(e.target.value)) )}
                      className="rounded min-w-32 max-w-32"
                      isRequired
                      labelPlacement="outside"
                      label="Capacidade"
                    />
                    <Select
                      size="lg"
                      color="primary"
                      id="resources"
                      labelPlacement="outside"
                      value={resources}
                      onChange={(e) => setResources(e.target.value)}
                      className="rounded min-w-32 max-w-32"
                      selectionMode="multiple"
                      label="Recursos"
                    >
                      {availableResources.map((resource) => (
                        <SelectItem className="bg-background text-primary" key={resource.id}>{resource.name}</SelectItem>
                      ))}
                    </Select>
                    <Button isLoading={isLoading}  spinnerPlacement="end" size="lg" color="primary" type="submit" className="min-w-32 rounded self-end">
                      Buscar
                    </Button>
            </Form>
          </PageActions>
        </div>
        <Divider/>
        <div className="flex  justify-between">
          <div className="flex flex-row w-full">
            {availableRooms.length > 0 && (
              <div className="flex flex-col mt-6 gap-4 w-full">
                <h2 className="text-xl font-semibold text-primary">Salas encontradas:</h2>
                <Divider/>
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
          onOpenChange={closeModal}
        >
          <ModalContent>
            <ModalHeader>
              <p className="primary bold" >Escolha o professor para o qual deseja agendar a sala : {selectedRoom.name}</p>
            </ModalHeader>
            <ModalBody>
              <Select
                color="primary"
                type="date"
                id="teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded"
                isRequired
                labelPlacement="outside"
                label="Professor"
              >
                {teachers.map((teacher) => (
                    <SelectItem className="bg-background text-primary" key={teacher.id}>{teacher.name}</SelectItem>
                  ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button auto flat color="error" onClick={closeModal}>
                Cancelar
              </Button>
              <Button color="primary" auto onClick={handleScheduleRoom}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageWrapper>
  );
}
