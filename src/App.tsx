import '@styles/App.scss';
import Button from '@components/buttons/Button.tsx';
import StreetRoute from '@components/map/StreetRoute.tsx';
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

      <div>
        <StreetRoute
          from={{ lat: 20.566131156580823, lng: -103.29118486392122 }}
          to={{ lat: 20.566963187357228, lng: -103.22847750386998 }}
        />

        <Button label={'Push me'} />
      </div>
    </>
  );
}

export default App;
