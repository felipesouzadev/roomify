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
import EditIcon from '../../components/Icons/EditIcon'
import TrashIcon from '../../components/Icons/TrashIcon'

export default function Users() {
  const [users, setUsers] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", username: "" });


  const handleOpenModal = (user = { id: null, name: "", username: ""}) => {
    setCurrentUser(user);
    onOpen()
  };

    const handleDeleteUser = async () => {
      await axios.delete(`/api/users/${currentUser.id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== user.id));
      setCurrentUser({ id: null, name: "", username: "" });
      onOpenDeleteChange();
    }
  
    const handleOpenDeleteModal = (user) => {
      setCurrentUser(user);
      onDeleteOpen();
     }

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => setUsers(response.data));
  }, []);

  const handleAddUser = async () => {
    const response = await axios.post('/api/users', currentUser);
    const addedUser = response.data;
    setUsers((prevUsers) => [...prevUsers, addedUser]);
    setCurrentUser({ id: null, name: "", username: "" });
    onOpenChange();
  };

  return (
    <PageWrapper>
      <PageActions>
        <Button color="primary" auto onClick={() => handleOpenModal()}>
          Create User
        </Button>
      </PageActions>
      <Spacer y={1} />
      <Table isStriped classNames={{wrapper: "bg-background", th: "text-primary", td: "text-primary", tr: "even:"}}>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Username</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{`${user.name}${user.isOwner ? ' - OWNER' : ''}`}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Button 
                  color="primary"
                  size="sm"
                  variant="light"
                  onClick={() => handleOpenModal(user)}
                >
                  <EditIcon/>
                </Button>
                <Button 
                  color="primary"
                  size="sm"
                  variant="light"
                  isDisabled={user.isOwner}
                  onClick={() => handleOpenDeleteModal(user)}
                >
                  <TrashIcon/>
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
                <h2 className="text-primary" id="modal-title" size={18}>
                  {currentUser.id ? "Edit User" : "Add New User"}
                </h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  color="primary"
                  label="Name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  clearable
                />
                <Spacer y={1} />
                <Input
                  color="primary"
                  disabled={currentUser.id}
                  label="Username"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  clearable
                />
                <Spacer y={1} />
                {currentUser && !currentUser.id  && (
                  <Input
                  color="primary"
                  label="Password"
                  type='password'
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                  clearable
                />
                )}
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button auto  color="primary" onClick={handleAddUser}>
                  Save
                </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} className="bg-background">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-primary" id="modal-title" size={18}>
              Delete User
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete {currentUser.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onOpenDeleteChange}>
              Cancel
            </Button>
            <Button color="warning" auto onClick={handleDeleteUser}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
