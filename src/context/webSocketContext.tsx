import dayjs from 'dayjs';
import { createContext, useContext, type PropsWithChildren } from 'react';
import type { CreateEventBodyProps, EventProps } from 'services/events/events';
import { io } from 'socket.io-client';
import { useGlobalInformationContext } from './GlobalInformationProvider';
import { apiBaseUrl } from 'services/api-client';

interface WSSContextProps {
  handleSendMessage: (room: string) => void;
  handleJoin: (room: string, leave?: string) => void;
}

const socket = io(apiBaseUrl);

socket.on('connect', function () {
  console.log('SOCKET CONNECTED');
});

socket.on('disconnect', function () {
  console.log('SOCKET DISCONNECTED');
});

const WebSocket = createContext({} as WSSContextProps);

export const useSocketContext = () => useContext(WebSocket);

const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const { handleSetEvents } = useGlobalInformationContext();

  socket.on('LAST_MESSAGE', (received: EventProps) => {
    handleSetEvents([received]);
  });

  socket.on('MASSIVE_MESSAGES', (received: Array<EventProps>) => {
    handleSetEvents(received);
  });

  const handleJoin = (room: string, leave?: string) => {
    socket.emit('JOIN', { room, leave });
    if (leave) console.log('LEAVING FROM', room);
    console.log('JOININ TO', room);
  };

  const handleSendMessage = (room: string) => {
    const body: CreateEventBodyProps = {
      datetime: dayjs().toISOString(),
      title: 'Confirmación de Pago',
      description: 'CORPORACIÓN NETAPPPERU SAC te envió un pago por S/ 1. El cód. de seguridad es: 160', // YAPE to YAPE
      // description: 'Yape! CORPORACIÓN NETAPPPERU SAC te envió un pago por S/ 1', // PLIN to YAPE
      package: 'com.whatsapp',
      room,
      amount: 123,
      securityCode: '123',
      sender: 'Nombre el que envía',
    };
    socket.emit('SEND', body);
  };

  return <WebSocket.Provider value={{ handleSendMessage, handleJoin }}>{children}</WebSocket.Provider>;
};
export default WebSocketProvider;
