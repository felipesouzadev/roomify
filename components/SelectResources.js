'use client'
import axios from "axios"
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import AddIcon from '../components/Icons/AddIcon'
import SelectResouce from './SelectResouce'

export default function SelectResources({selectedResources, setSelectedResources, deleteResource}) {
    const [availableResources, setAvailableResources] = useState([]);
    const availableTypes = [{key: "QUANTITY", value: "Quantidade"}, {key: "AVAILABILITY", value: "Dispnibilidade"}];
    useEffect(() => {
        axios.get('/api/resources')
          .then((response) => setAvailableResources(response.data));
      }, []);


    const addResource = () => {
        setSelectedResources([...selectedResources, {name: '', type: '', value: '', id: null, createdAt: null, updatedAt: null}]);
    }

    return (
      <>
      <div className="flex flex-row justify-between">
        <h2>Recursos:</h2>
        <Button onClick={addResource} variant="light" className="h-6 w-6">
          <AddIcon/>
        </Button>
      </div>
      <div className="flex flex-col gap-9">
        {selectedResources.map((resource, i) => (
            <SelectResouce
              key={`resource-${i}`}
              availableResources={availableResources}
              availableTypes={availableTypes}
              selectedResources={selectedResources}
              setSelectedResources={setSelectedResources}
              deleteResource={deleteResource}
              index={i}
              />
        ))}
      </div>
    </>
    )
}