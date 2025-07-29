import ResponsiveLayout from '@layouts/ResponsiveLayout.tsx';

import '@styles/App.scss';

function App() {
  const items = [
    { label: 'Home', href: '/', current: true },
    { label: 'Login', href: '/login', current: false },
    {
      label: 'Street route (Demo)',
      href: '/street-route',
      current: false,
    },
  ];

  return (
    <>
      <ResponsiveLayout items={items}>
        <p>Hello world</p>
      </ResponsiveLayout>
    </>
  );
}

export default App;
