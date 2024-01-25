import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useLocalStorage } from "../shared/hooks/localStorage";

import styles from "./Map.module.scss";
//import "leaflet-draw/dist/leaflet.draw.css";

export const Map = () => {
  const [localStorageValue] = useLocalStorage("mapObject");

  return (
    <div>
      <div className={styles["map__header"]}>
        <h2>Map</h2>
      </div>

      <div style={{ height: "700px" }}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {localStorageValue
            .filter((el) => el.type === "line")
            .map((el) => (
              <Polyline key={el.id} positions={el.map}>
                <Popup>{el.name}</Popup>
              </Polyline>
            ))}

          {localStorageValue
            .filter((el) => el.type === "point")
            .map((el) => (
              <Marker position={el.map}>
                <Popup>{el.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};
