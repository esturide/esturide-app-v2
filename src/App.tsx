import { Marker, Popup, TileLayer } from 'react-leaflet';
import MapView from './components/view/MapView.tsx';

import '@/styles/App.scss';

function App() {
  return (
    <>
      <MapView
        center={{ lat: 20.566807292503427, lng: -103.22299991414923 }}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[20.566807292503427, -103.22299991414923]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapView>
    </>
  );
}

export default App;
