import{MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
const Map =()=>
{
    const position = [51.505, -0.09]

    return (
<>
    <MapContainer center={position} zoom={3} scrollWheelZoom={false} style={{ height: '2vh', width: '2wh' }}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
    </>
    )
};

export default Map;