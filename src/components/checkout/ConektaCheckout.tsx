import { useEffect } from 'react';

export default function ConektaCheckout() {
  const options = {
    backgroundMode: 'lightMode',
    colorPrimary: '#081133',
    colorText: '#585987',
    colorLabel: '#585987',
    inputType: 'minimalMode',
  };

  const config = {
    locale: 'es',
    publicKey: '{{yourKey}}',
    targetIFrame: 'checkout',
    checkoutRequestId: '{{checkoutRequestId}}',
  };

  const callbacks = {
    onGetInfoSuccess: function (loadingTime: any) {
      console.log('loading time en milisegundos', loadingTime.initLoadTime);
    },
    onFinalizePayment: function (order: any) {
      console.log('success: ', JSON.stringify(order));
    },
    onErrorPayment: function (error: any) {
      console.log('error en pago: ', error);
    },
  };

  useEffect(() => {
    if ('ConektaCheckoutComponents' in window) {
      const component: any = window.ConektaCheckoutComponents;

      if ('Integration' in component)
        component.Integration({
          config,
          callbacks,
          options,
        });
    }
  }, []);

  return <div id={'checkout'}></div>;
}
