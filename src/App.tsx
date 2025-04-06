import { Marker, Popup } from 'react-leaflet';

import '@styles/App.scss';
import { NavLink } from 'react-router';
import Button from '@components/buttons/Button.tsx';
import ConektaCheckout from '@components/checkout/ConektaCheckout.tsx';
import MapView from './components/map/MapView';

function App() {
  return (
    <>
      <MapView
        center={{ lat: 20.566807292503427, lng: -103.22299991414923 }}
        zoom={15}
      >
        <Marker position={[20.566807292503427, -103.22299991414923]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapView>

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/login" end>
          Login
        </NavLink>
      </nav>

      <Button label={'Push me'} />
      <ConektaCheckout />
    </>
  );
}

export default App;
