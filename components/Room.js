"use client"
import { Card, CardHeader, CardBody, CardFooter, Button, Divider, Chip } from "@nextui-org/react";

export default function Room({room, setSelectedRoom}) {
    return (
        <Card className="min-w-60 max-w-60 min-h-60 max-h-60 bg-secondary">
            <CardHeader className="flex">
                <h1 className="text-sm">{`Sala: ${room.name} Capacidade: ${room.capacity}`}</h1>
            </CardHeader>
            <Divider/>
            <CardBody className="h-full w-full">
                {room.roomResources && room.roomResources.length > 0 && (
                    <div className="flex flex-col gap-2">
                    <p>Recursos:</p>
                    <Divider color="primary" />
                    <div className="flex flex-wrap gap-2 overflow-auto w-full h-full">
                        {room.roomResources.map((roomResource) => (
                            <Chip size="sm" color="primary" key={roomResource.id}>{roomResource.resource.name}</Chip>
                        ))}
                    </div>
                    </div>
                )}
            </CardBody>
            <CardFooter  className="flex flex-row-reverse absolute bottom-1">
                <Button color="primary" className="self-end" variant="solid" onClick={() => setSelectedRoom(room)}>Agendar</Button>
            </CardFooter>
        </Card>  
    )
}