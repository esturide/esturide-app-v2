import '@styles/App.scss';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';

function App() {
  return (
    <>
      <DesktopNavigationBar
        items={[
          { name: 'Home', href: '/', current: true },
          { name: 'Login', href: '/login', current: false },
          {
            name: 'Street route (Demo)',
            href: '/street-route',
            current: false,
          },
        ]}
      />
    </>
  );
}

export default App;
