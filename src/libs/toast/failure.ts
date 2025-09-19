import { toast } from 'react-toastify';

export function failureMessage(message: string) {
  toast.error(message, {
    position: 'bottom-right',
  });
}
