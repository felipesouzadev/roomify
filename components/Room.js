"use client"
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";



export default function Room({room, setSelectedRoom}) {
    return (
        <Card className="min-w-60 max-w-60 bg-secondary">
            <CardHeader className="flex">
                <h1>{room.name}</h1>
            </CardHeader>
            <CardBody>
            <p>Capacity: {room.capacity}</p>
            </CardBody>
            <CardFooter className="flex flex-row-reverse">
                <Button color="primary" className="self-end" onClick={() => setSelectedRoom(room)}>Schedule</Button>
            </CardFooter>
        </Card>  
    )
}