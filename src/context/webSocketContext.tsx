import { Button } from '@mui/material';
import { notification } from 'antd';
import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { CreateEventBodyProps, EventProps } from 'services/events/events';
import { getEventsRequest } from 'services/events/events.requests';
import { io } from 'socket.io-client';

interface WSSContextProps {
  handleSendMessage: VoidFunction;
  loading: boolean;
  eventlist: Array<EventProps>;
}

const socket = io('http://192.168.1.202:5001');
// const defaultRoom = 'default_room';
const defaultRoom = '987654321';

socket.on('connect', function () {
  console.log('SOCKET CONNECTED');
  socket.emit('JOIN', defaultRoom);
});

socket.on('disconnect', function () {
  console.log('SOCKET DISCONNECTED');
});

const WebSocket = createContext({} as WSSContextProps);

export const useSocketContext = () => useContext(WebSocket);

const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [eventlist, setEventlist] = useState<Array<EventProps>>([]);

  socket.on('LAST_MESSAGE', (received: EventProps) => {
    eventlist.unshift(received);
    setEventlist([...eventlist]);
  });

  socket.on('MASSIVE_MESSAGES', (received: Array<EventProps>) => {
    const joined = [...received, ...eventlist];
    setEventlist([...joined]);
  });

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = async () => {
    try {
      setLoading(true);

      const res = await getEventsRequest({ room: defaultRoom });
      setEventlist([...res]);
    } catch (error) {
      notification.error({
        title: 'No se pudo obtener el listado de notificaciones',
        description: 'Vuelva a carga la página o vuelva mas tarde',
        actions: [<Button onClick={() => window.location.reload()}>Volver a cargar</Button>],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const body: CreateEventBodyProps = {
      datetime: dayjs().toISOString(),
      title: `Título ${eventlist.length + 1}`,
      description: `Descripción del mensaje ${eventlist.length + 1}`,
      package: 'com.whatsapp',
      room: defaultRoom,
      amount: 1,
      securityCode: '123',
      sender: 'Aldo',
    };
    socket.emit('SEND', body);
  };

  return <WebSocket.Provider value={{ handleSendMessage, loading, eventlist }}>{children}</WebSocket.Provider>;
};
export default WebSocketProvider;
