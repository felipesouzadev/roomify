'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
        Button, Input, Spacer, useDisclosure, Skeleton } from "@nextui-org/react";
import { Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter } from "@nextui-org/modal";
import PageActions from '../../components/PageActions'
import PageWrapper from '../../components/PageWrapper'
import SelectResources from '../../components/SelectResources'
import EditIcon from '../../components/Icons/EditIcon'
import TrashIcon from '../../components/Icons/TrashIcon'

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
  const [currentRoom, setCurrentRoom] = useState({ id: null, name: "", capacity: "" });
  const [selectedResources, setSelectedResources] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  

  const deleteResource = (index) => {
    selectedResources.splice(index, 1);
    setSelectedResources([...selectedResources]);
  }

  const handleDeleteRoom = async () => {
    try{
      await axios.delete(`/api/rooms/${currentRoom.id}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== currentRoom.id));
      setCurrentRoom({ id: null, name: "", capacity: "" });
      onOpenDeleteChange();
    } catch (error) {
      alert("Opa! Ocorreu um erro ao deletar a sala");
    }
  }

  const handleEditRoom = async () => {
    try {
      currentRoom.resources = selectedResources;
      const response = await axios.put(`/api/rooms/${currentRoom.id}`, currentRoom);
      const updatedRoom = response.data;
      setRooms((prevRooms) => prevRooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)));
      setCurrentRoom({ id: null, name: "", capacity: "" });
      onOpenChange();
    } catch (error) {
      alert("Opa! Ocorreu um erro ao atualizar a sala");
    }
  }

  const handleOpenDeleteModal = (room) => {
    setCurrentRoom(room);
    onDeleteOpen();
  }

  const handleOpenModal = (room = { id: null, name: "", capacity: "" }) => {
    setCurrentRoom(room);
    setSelectedResources(room.roomResources ? room.roomResources.map((roomResource) => ({ id: roomResource.resourceId,
                                                                     name: roomResource.resource.name,
                                                                     type: roomResource.resource.type, 
                                                                     value: roomResource.value })) : []);
    onOpen()
  };

  useEffect(() => {
    axios.get('/api/rooms')
      .then((response) => {
        setRooms(response.data);
        setIsLoaded(true);
      });
  }, []);

  const handleAddRoom = async () => {
    try {
      currentRoom.resources = selectedResources;
      const response = await axios.post('/api/rooms', currentRoom);
      const addedRoom = response.data;
      setRooms((prevRooms) => [...prevRooms, addedRoom]);
      setCurrentRoom({ id: null, name: "", capacity: "" });
      onOpenChange();
    } catch(error) {
      alert("Opa! Ocorreu um erro ao adicionar a sala");
    }
  };
  
  return (
    <PageWrapper>
      <PageActions>
        <Button color="primary" auto onClick={() => handleOpenModal()}>
          Criar Sala
        </Button>
      </PageActions>
      <Skeleton isLoaded={isLoaded}>
      <Table layout="fixed" isStriped classNames={{wrapper: "bg-background", th: "text-primary text-bold font-lg", td: "text-primary"}}>
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Capacidade</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>
                <Button 
                  color="primary"
                  size="sm"
                  variant="light"
                  onClick={() => handleOpenModal(room)}
                >
                  <EditIcon/>
                </Button>
                <Button 
                  color="primary"
                  size="sm"
                  variant="light"
                  onClick={() => handleOpenDeleteModal(room)}
                >
                  <TrashIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Skeleton>

      <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-background"
        >
          <ModalContent>
          <ModalHeader>
            <h2 className="text-primary" id="modal-title" size={18}>
              {currentRoom.id ? "Editar Sala" : "Criar Sala"}
            </h2>
          </ModalHeader>
          <ModalBody>
            <Input
              color="primary"
              label="Nome"
              value={currentRoom.name}
              onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
              clearable
            />
            <Spacer y={1} />
            <Input
              color="primary"
              label="Capacidade"
              type="number"
              value={currentRoom.capacity}
              onChange={(e) =>
                setCurrentRoom({ ...currentRoom, capacity: Math.max(1, Number(e.target.value)) })
              }
              clearable
            />
            <SelectResources selectedResources={selectedResources} setSelectedResources={setSelectedResources} deleteResource={deleteResource}/>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenChange}>
              Cancelar
            </Button>
            <Button color="primary" auto onClick={currentRoom.id ? handleEditRoom : handleAddRoom}>
              Salvar
            </Button>
          </ModalFooter>
          </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} className="bg-background">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-primary" id="modal-title" size={18}>
              Deletar Sala
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>Você tem certeza que deseja deletar a sala {currentRoom.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenDeleteChange}>
              Cancelar
            </Button>
            <Button color="danger" auto onClick={handleDeleteRoom}>
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
