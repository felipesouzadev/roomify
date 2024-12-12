'use client'
import { useState } from "react";
import { Autocomplete, AutocompleteItem, Select, SelectItem, Input } from "@nextui-org/react";
import TrashIcon from './Icons/TrashIcon'

export default function SelectResources({ availableResources, availableTypes, selectedResources, setSelectedResources, deleteResource, index}) {

    const [selectedResource, setSelectedResource] = useState(selectedResources[index]);
    const [selectedType, setSelectedType] = useState(selectedResources[index].type);

    const updateResourceValue = (value) => {
        const resourceExists = availableResources.find((resource ) => resource.name === value);
        if (!resourceExists){
          setSelectedResource({...selectedResource, name: value, id: null, type: '', value: 1, createdAt: null, updatedAt: null});
          selectedResources[index] = selectedResource;
          setSelectedResources([...selectedResources]);
        }
    }

    const selectResource = (e) => {
          if(e && e.id)  {
              setSelectedResource(e);
              selectedResources[index] = e
              setSelectedResources([...selectedResources]);
          }
      }

      const onSelectedType = (selected) =>{
        setSelectedType(Array.from(selected)[0]);
        setSelectedResource({...selectedResource, type: Array.from(selected)[0]});
        selectedResources[index].type = Array.from(selected)[0];
        setSelectedResources([...selectedResources]);
      }

      const onDefineValue = (value) => {
        setSelectedResource({...selectedResource, value: value});
        selectedResources[index].value = value;
        setSelectedResources([...selectedResources]);
      }


    return (
            <div className="flex flex-row">
            <div className="flex flex-row justify-start items-start w-full h-10 gap-2" key={`resource-${index}`}>
                <Autocomplete
                inputValue={selectedResource.name}
                color="primary"
                id="select-resource"
                value={selectedResource.name}
                allowsCustomValue
                onSelectionChange={(e) => selectResource(JSON.parse(e))}
                onInputChange={(value) => updateResourceValue(value)}
                onFocusChange={(changed) => updateResourceValue(selectedResource.name)}
                className="rounded max-w-32"
                label="Resources"
                >
              {availableResources.map((availableResource) => (
                <AutocompleteItem value={availableResource.name} key={JSON.stringify(availableResource)}>{availableResource.name}</AutocompleteItem>
              ))}
              </Autocomplete>
              <Select
               color="primary"
               value={selectedResource.type}
               selectedKeys={selectedResource.type ? [selectedResource.type] : []}
               onSelectionChange={(selected) => onSelectedType(selected)}
               isDisabled={!!selectedResource.id}
               className="rounded max-w-32">
                 {availableTypes.map((type) => (
                   <SelectItem key={type.key} value={type.key}>{type.value}</SelectItem>
                 ))}
              </Select>
              {selectedResource.type === 'QUANTITY' && (
                <Input
                  color="secondary"
                  type="number"
                  value={selectedResource.value}
                  onChange={(e) => onDefineValue(Math.max(1, Number(e.target.value)))}
                  className="rounded max-w-32"
                  placeholder="Quantity"
                />
              )
              }
            
           </div>
           <button onClick={() => deleteResource(index)}><TrashIcon/></button>
           </div>
      )
  }