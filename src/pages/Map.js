import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import styles from "./Map.module.scss";

export const Map = () => {
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
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Polyline
            positions={[
              [51.51, -0.12],
              [51.51, -0.13],
            ]}
          />
        </MapContainer>
      </div>
    </div>
  );
};
