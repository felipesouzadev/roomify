'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
        Button, Input, Spacer, useDisclosure, Skeleton
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
import EditIcon from '../../components/Icons/EditIcon'
import TrashIcon from '../../components/Icons/TrashIcon'

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
  const [currentTeacher, setCurrentTeacher] = useState({ id: null, name: "", subject: "", contact: "" });
  const [isLoaded, setIsLoaded] = useState(false);


  const handleOpenModal = (teacher = { id: null, name: "", subject: "", contact: "" }) => {
    setCurrentTeacher(teacher);
    onOpen()
  };

  const handleDeleteTeacher = async () => {
    try {
      await axios.delete(`/api/teachers/${currentTeacher.id}`);
      setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== currentTeacher.id));
      setCurrentTeacher({ id: null, name: "", subject: "", contact: "" });
      onOpenDeleteChange();
    } catch (error){
      alert('Error deleting teacher');
    }
  }

  const handleEditTeacher = async () => {
    try{
      const response = await axios.put(`/api/teachers/${currentTeacher.id}`, currentTeacher);
      const updatedTeacher = response.data;
      setTeachers((prevTeachers) => prevTeachers.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
      setCurrentTeacher({ id: null, name: "", subject: "", contact: "" });
      onOpenChange();
    } catch (error) {
      alert('Error updating teacher');
    }
  }

  const handleOpenDeleteModal = (teacher) => {
    setCurrentTeacher(teacher);
    onDeleteOpen();
   }

  useEffect(() => {
    axios.get('/api/teachers')
      .then((response) => {
        setTeachers(response.data)
        setIsLoaded(true);
      });
  }, []);

  const handleAddTeacher = async () => {
    try {
      const response = await axios.post('/api/teachers', currentTeacher);
      const addedTeacher = response.data;
      setTeachers((prevTeachers) => [...prevTeachers, addedTeacher]);
      setCurrentTeacher({ id: null, name: "", subject: "", contact: "" });
      onOpenChange();
    } catch (error) {
      alert('Error adding teacher');
    }
  };

  return (
    <PageWrapper>
      <PageActions>
        <Button color="primary" auto onClick={() => handleOpenModal()}>
          Create Teacher
        </Button>
      </PageActions>
      <Spacer y={1} />
      <Skeleton isLoaded={isLoaded}>
      <Table isStriped classNames={{wrapper: "bg-background", th: "text-primary", td: "text-primary", tr: "even:"}}>
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
                  color="primary"
                  size="sm"
                  variant="light"
                  onClick={() => handleOpenModal(teacher)}
                >
                  <EditIcon/>
                </Button>
                <Button 
                  color="primary"
                  size="sm"
                  variant="light"
                  onClick={() => handleOpenDeleteModal(teacher)}
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
        >
          <ModalContent>
              <ModalHeader>
                <h2 className="text-primary" id="modal-title" size={18}>
                  {currentTeacher.id ? "Edit Teacher" : "Add New Teacher"}
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  color="primary"
                  label="Name"
                  value={currentTeacher.name}
                  onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                  clearable
                />
                <Spacer y={1} />
                <Input
                  color="primary"
                  label="Subject"
                  value={currentTeacher.subject}
                  onChange={(e) =>
                    setCurrentTeacher({ ...currentTeacher, subject: e.target.value })
                  }
                  clearable
                />
                <Spacer y={1} />
                <Input
                  color="primary"
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
                <Button auto  color="primary" onClick={currentTeacher.id ? handleEditTeacher : handleAddTeacher}>
                  Save
                </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} className="bg-background">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-primary" id="modal-title" size={18}>
              Delete Teacher
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete {currentTeacher.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenDeleteChange}>
              Cancel
            </Button>
            <Button color="danger" auto onClick={handleDeleteTeacher}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};

export default Teachers;
