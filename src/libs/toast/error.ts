import { toast } from 'react-toastify';

async function error(message: string): Promise<void> {
  toast.error(message, {
    position: 'bottom-right',
  });
}

export default error;
