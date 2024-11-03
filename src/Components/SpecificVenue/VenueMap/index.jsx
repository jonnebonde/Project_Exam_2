import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

function VenueMap({ latitude, longitude }) {
  console.log(latitude, longitude);
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={23}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Venue Location</Popup>
      </Marker>
    </MapContainer>
  );
}

VenueMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default VenueMap;
