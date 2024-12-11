'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
        Button, Input, Spacer,
        useDisclosure
       } from "@nextui-org/react";
import {
        Modal, 
        ModalContent, 
        ModalHeader, 
        ModalBody, 
        ModalFooter
      } from "@nextui-org/modal";
import PageActions from '../../components/PageActions';
import PageWrapper from '../../components/PageWrapper';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentTeacher, setCurrentTeacher] = useState({ id: null, name: "", subject: "", contact: "" });


  const handleOpenModal = (teacher = { id: null, name: "", subject: "", contact: "" }) => {
    setCurrentTeacher(teacher);
    onOpen()
  };

  useEffect(() => {
    axios.get('/api/teachers')
      .then((response) => setTeachers(response.data));
  }, []);

  const handleAddTeacher = async () => {
    const response = await axios.post('/api/teachers', currentTeacher);
    const addedTeacher = response.data;
    setTeachers((prevTeachers) => [...prevTeachers, addedTeacher]);
    setCurrentTeacher({ id: null, name: "", subject: "", contact: "" });
    onOpenChange();
  };

  return (
    <PageWrapper>
      <PageActions>
        <Button auto onClick={() => handleOpenModal()}>
          Create Teacher
        </Button>
      </PageActions>
      <Spacer y={1} />
      <Table isStriped>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Subject</TableColumn>
          <TableColumn>Contact</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.contact}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  light
                  onClick={() => handleOpenModal(teacher)}
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
                  {currentTeacher.id ? "Edit Teacher" : "Add New Teacher"}
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  value={currentTeacher.name}
                  onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                  clearable
                />
                <Spacer y={1} />
                <Input
                  label="Subject"
                  value={currentTeacher.subject}
                  onChange={(e) =>
                    setCurrentTeacher({ ...currentTeacher, subject: e.target.value })
                  }
                  clearable
                />
                <Spacer y={1} />
                <Input
                  label="Contact"
                  value={currentTeacher.contact}
                  onChange={(e) =>
                    setCurrentTeacher({ ...currentTeacher, contact: e.target.value })
                  }
                  clearable
                />
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button auto onClick={handleAddTeacher}>
                  Save
                </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </PageWrapper>
  );
};

export default Teachers;
