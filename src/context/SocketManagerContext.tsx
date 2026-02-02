import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { baseSocket } from '$libs/const/defaultURL.ts';

interface DataEventMessage {
  from: string;
  data: unknown;
}

interface Props {
  connected: boolean;
  messages: DataEventMessage[];
  sendMessage: (event: string, data: unknown) => void;
}

const SocketManagerContext = createContext<Props>({
  connected: false,
  messages: [],
  sendMessage: () => {},
});

type SocketProviderProps = {
  url?: string;
  namespace?: string;
  token?: string;
  eventListener?: string[];
};

export function SocketManagerProvider({
  children,
  url,
  namespace,
  token,
  eventListener = [],
}: PropsWithChildren<SocketProviderProps>) {
  const socketRef = useRef<Socket | null>(null);
  const defaultURL = url ? url : baseSocket;
  const defaultNamespace = namespace ? namespace : '';

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<DataEventMessage[]>([]);

  useEffect(() => {
    socketRef.current = io(`${defaultURL}/${defaultNamespace}`, {
      auth: {
        token: token,
      },
    });

    socketRef.current.on('connect', () => {
      setConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setConnected(false);
    });

    for (const event of eventListener) {
      console.log(`Listener on: ${event}`);

      socketRef.current.on(event, data => {
        console.log(`Message received from ${event}`);

        setMessages(prev => [
          ...prev,
          {
            from: event,
            data: data,
          },
        ]);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessages = (event: string, data: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  };

  return (
    <SocketManagerContext.Provider
      value={{
        connected: connected,
        sendMessage: sendMessages,
        messages: messages,
      }}
    >
      {children}
    </SocketManagerContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketManagerContext);

  if (!context) {
    throw new Error('useSocket debe usarse dentro de SocketProvider');
  }

  return context;
}
