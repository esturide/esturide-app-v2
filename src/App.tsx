import { Marker, Popup } from 'react-leaflet';

import MapView from '@components/view/MapView.tsx';
import { Button } from 'antd';

import '@styles/App.scss';

function App() {
  const onPress = async () => {
    console.log('Button pressed');
  };

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

      <div>
        <Button onClick={onPress}>A</Button>
      </div>
    </>
  );
}

export default App;
