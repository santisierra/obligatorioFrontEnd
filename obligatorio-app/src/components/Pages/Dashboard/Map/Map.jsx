//import{MapContainer, Marker, Popup, TileLayer} from "react-leaflet"

import { MapContainer, TileLayer, useMap ,Marker, Popup} from 'react-leaflet'
import"leaflet/dist/leaflet.css"
import { getUsuariosPorPais, getPaises } from '../../../../services/api'; // Ajusta la importación según la estructura de tu proyecto
import { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {Icon} from "leaflet";

const Map =()=>
{
    const userLogged = useSelector((store) => store.userSlice.userLogged);

    const [usuariosPorPais, setUsuariosPorPais] = useState([]);
    const [paises, setPaises] = useState([]);
  
    useEffect(() => {
      // Obtener la información de la cantidad de usuarios por país
      getUsuariosPorPais(userLogged.id,userLogged.apiKey)
        .then(data => {
          setUsuariosPorPais(data.paises);
        })
        .catch(error => console.error('Error al obtener la información de usuarios por país:', error));
  
      // Obtener los datos de los países
      getPaises()
        .then(data => {
          setPaises(data.paises);
        })
        .catch(error => console.error('Error al obtener los datos de los países:', error));
    }, []);


    const position = [50, -0.09]
    // Define los límites del mapa
    const maxBounds = [
        [-90, -180], // Límite suroeste
        [90, 180]    // Límite noreste
    ];
    const customIcon = new Icon({
        iconUrl:require("./../../../../../src/marker.png"),
        iconSize:[22,38]
    })

    return (


        <MapContainer center={position} zoom={1} scrollWheelZoom={true} style={{ height: '50vh', width: '80vw' }} maxBounds={maxBounds} maxBoundsViscosity={1} minZoom={1} maxZoom={5}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {usuariosPorPais.length === 0 ? (
          <p>Cargando usuarios por país...</p>
        ) : (
          paises.map((pais) => {
            const usuariosRegistrados = Array.isArray(usuariosPorPais) ? usuariosPorPais.find((item) => item.id === pais.id)?.cantidadDeUsuarios : 0;
    
            return (
              <Marker key={pais.id} position={[pais.latitude, pais.longitude]} icon={customIcon}>
                <Popup>{`${pais.name}: ${usuariosRegistrados} usuarios registrados`}</Popup>
              </Marker>
            );
          })
        )}
      </MapContainer>
    

    )
};

export default Map;