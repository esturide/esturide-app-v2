import { toast } from 'react-toastify';

function messageInformation(message: string) {
  toast.info(message, {
    position: 'bottom-right',
  });
}

export default messageInformation;
