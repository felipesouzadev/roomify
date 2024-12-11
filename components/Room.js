"use client"

import { Button } from "@nextui-org/react";
export default function Room({room, setSelectedRoom}) {
    return (
        <div className="flex flex-col gap-2 border p-2 rounded-lg min-w-52 max-w-52">
            <div className="flex-row">
                <h1>Sala: {room.name}</h1>
                <h2>Capacity: {room.capacity}</h2>
            </div>
            <Button className="self-end" onClick={() => setSelectedRoom(room)}>Schedule</Button>
        </div>  
    )
}