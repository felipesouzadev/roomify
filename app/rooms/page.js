'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
        Button, Input, Spacer, useDisclosure } from "@nextui-org/react";
import { Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter } from "@nextui-org/modal";
import PageActions from '../../components/PageActions'
import PageWrapper from '../../components/PageWrapper'

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentRoom, setCurrentRoom] = useState({ id: null, name: "", capacity: "" });

  const handleOpenModal = (room = { id: null, name: "", capacity: "" }) => {
    setCurrentRoom(room);
    onOpen()
  };

  useEffect(() => {
    axios.get('/api/rooms')
      .then((response) => setRooms(response.data));
  }, []);

  const handleAddRoom = async () => {
    const response = await axios.post('/api/rooms', currentRoom);
    const addedRoom = response.data;
    setRooms((prevRooms) => [...prevRooms, addedRoom]);
    setCurrentRoom({ id: null, name: "", capacity: "" });
    onOpenChange();
  };
  
  return (
    <PageWrapper>
      <PageActions>
        <Button auto onClick={() => handleOpenModal()}>
          Create Room
        </Button>
      </PageActions>
      <Table isStriped>
        <TableHeader>
          <TableColumn>Room Name</TableColumn>
          <TableColumn>Capacity</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  light
                  onClick={() => handleOpenModal(room)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
          <ModalHeader>
            <h2 id="modal-title" size={18}>
              {currentRoom.id ? "Edit Room" : "Add New Room"}
            </h2>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Room Name"
              value={currentRoom.name}
              onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
              clearable
            />
            <Spacer y={1} />
            <Input
              label="Capacity"
              type="number"
              value={currentRoom.capacity}
              onChange={(e) =>
                setCurrentRoom({ ...currentRoom, capacity: Number(e.target.value) })
              }
              clearable
            />
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenChange}>
              Cancel
            </Button>
            <Button auto onClick={handleAddRoom}>
              Save
            </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
    </PageWrapper>
  );
};
