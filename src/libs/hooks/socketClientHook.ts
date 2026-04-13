import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseSocket } from '$libs/const/defaultURL.ts';

interface DataEventMessage {
  from: string;
  data: unknown;
}

interface ClientHook {
  connectTo: (namespace: string) => boolean;
  connected: boolean;
  messages: DataEventMessage[];
  sendMessage: (event: string, data: unknown) => void;
}

/**
 * Hook to use SocketIO client.
 */
export default function useSocketClient(
  eventListener: string[] = [],
  token?: string,
  url?: string,
): ClientHook {
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const defaultURL = url ?? baseSocket;

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<DataEventMessage[]>([]);

  useEffect(() => {
    if (!socketClient) return;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socketClient.on('connect', handleConnect);
    socketClient.on('disconnect', handleDisconnect);

    const handleEvent = (event: string) => (data: unknown) => {
      setMessages(prev => [...prev, { from: event, data }]);
    };

    const handlers = eventListener.map(event => {
      const handler = handleEvent(event);

      socketClient.on(event, handler);

      return { event, handler };
    });

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('disconnect', handleDisconnect);

      for (const { event, handler } of handlers) {
        socketClient.off(event, handler);
      }

      socketClient.disconnect();
    };
  }, [socketClient]);

  const connectTo = (namespace: string) => {
    socketClient?.disconnect();

    const socket = io(`${defaultURL}/${namespace}`, {
      auth: { token },
    });

    setSocketClient(socket);
    setConnected(socket?.connected);

    return connected;
  };

  const sendMessage = (event: string, data: unknown) => {
    if (socketClient?.connected) {
      socketClient.emit(event, data);
    }
  };

  return {
    connectTo,
    connected,
    sendMessage,
    messages,
  };
}
