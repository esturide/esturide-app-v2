import '@styles/App.scss';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';

function App() {
  return (
    <>
      <DesktopNavigationBar
        items={[
          { label: 'Home', href: '/', current: true },
          { label: 'Login', href: '/login', current: false },
          {
            label: 'Street route (Demo)',
            href: '/street-route',
            current: false,
          },
        ]}
      />
    </>
  );
}

export default App;
