import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polyline , Marker, Polygon } from '@react-google-maps/api';
// import { GOOGLE_KEY } from '../utils/key';
import axios from 'axios';
import { app_constante } from '../utils/app_constante';
import { mapStyles } from '../utils/map_style';
import {BeatLoader } from 'react-spinners';
import Sidebar from '../components/sidebar';
const containerStyle = {
  width: '100%',
  height: '100%'
}
const center = {
  lat: 5.9631,  
  lng: 12.6761  
};

const GOOGLE_KEY ='AIzaSyBy9Mq91oGtmrw1jKiRrDvKWwGpQgtzt3I'
function MyComponent() {
  const [bassin, setBassin] = useState([]);
  const [riviers, setRivers] = useState([]);
  const [shedew, setShedew] = useState([]);
  const [isLoading , SetIsLoaing] = useState(false)

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [map, setMap] = useState(null);


  const handleLoad = (map) => {
    setMap(map);
  };
  const handleCloseSidebar = () => {
        setSelectedPoint(null);
      };
      const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedPoint({ lat, lng });
      };
      const handlesetLoading = () => {
        SetIsLoaing(false)
      }
      const fetchBasin = async () => {
        SetIsLoaing(true);
        fetchRiversInBassin();
        fetchShedew();
        try {
          

          const response = await axios.get(app_constante.watershed, {
            params: {
              lat: selectedPoint.lat,
              lng: selectedPoint.lng,
              precision: 'high'
            }
          });
          console.log('les data' , response.data); // Log to see what you're actually getting
      
          console.log(response.data); // Log to check the transformation
          const coordinates = response.data.features[0].geometry.coordinates;
         setBassin(coordinates);

          const bounds = new window.google.maps.LatLngBounds();
           coordinates.forEach(poly => {
            poly.forEach(coord => {
            bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
          });
        });

        if (map) {
          map.fitBounds(bounds);
        }
       
        SetIsLoaing(false);
        } catch (error) {
          console.error("Failed to fetch data: ", error);
          SetIsLoaing(false);

        }
      };
      const fetchRiversInBassin = async () => {
        try {
          const response = await axios.get(`${app_constante.baseUrl+app_constante.upstream}`, {
            params: {
              lat: selectedPoint.lat,
              lng: selectedPoint.lng,
              precision: 'high'
            }
          });
          console.log('les data' , response.data); // Log to see what you're actually getting
          const formattedData = response.data.features.map(feature => ({
            // Chaque feature est un LineString, donc on prend ses coordonnées
            // et on les transforme en objet {lat, lng} attendu par Google Maps
            path: feature.geometry.coordinates.map(coord => ({
              lng: coord[0],
              lat: coord[1]
            }))
          }));
      
          setRivers(formattedData);
        }catch(error){
          console.log('Une erreur est survenue lors da la recupertion des riviere' , error);
          
        }}

        const fetchShedew = async () => {
          try {
            const response = await axios.get(`${app_constante.baseUrl+app_constante.downStream}`, {
              params: {
                lat: selectedPoint.lat,
                lng: selectedPoint.lng,
                precision: 'high',
                task:'flowpath',
                source: 'merit'
              }
            });
            console.log('les data' , response.data); // Log to see what you're actually getting
            const formattedDataShedew = response.data.rivers.features.map(feature => ({
              // Chaque feature est un LineString, donc on prend ses coordonnées
              // et on les transforme en objet {lat, lng} attendu par Google Maps
              path: feature.geometry.coordinates.map(coord => ({
                lng: coord[0],
                lat: coord[1]
              }))
            }));
        
            setShedew(formattedDataShedew);
          }catch(error){
            console.log('Une erreur est survenue lors da la recupertion du dowstream' , error);
            
          }}
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
    <LoadScript
      googleMapsApiKey={GOOGLE_KEY}
    >
     
        {/* Sidebar pour afficher les détails du point sélectionné */}
        {selectedPoint && (
        <Sidebar
          handleCloseSidebar={handleCloseSidebar}
          selectedPoint={selectedPoint}
          fetchBasin={fetchBasin}
          riviers={riviers}
        />
      )}
      <GoogleMap
       mapContainerStyle={containerStyle}
       center={center}
       zoom={6.5}  // Zoom approprié pour visualiser l'ensemble du Cameroun
        mapTypeId="terrain"
       color
       onLoad={handleLoad}
       onClick={handleMapClick}
       options={{
        styles: mapStyles , // Appliquer le style personnalisé ici
        disableDefaultUI: true, // Désactiver l'interface utilisateur par défaut si nécessaire
      }}
      >
       {selectedPoint && (
            <Marker position={selectedPoint} />
          )}
              {bassin && bassin.map((bassin, index) => (
          <Polygon
            key={index}
            paths={bassin.map(coord => ({ lat: coord[1], lng: coord[0] }))}
            options={{
            strokeColor: '#f44336',  // Couleur des bordures
            strokeOpacity: 0.8,       // Opacité des bordures
            strokeWeight: 2,          // Épaisseur des bordures
            fillColor: '#f44336',     // Couleur de remplissage
            fillOpacity: 0  ,
            
            }}
          />
          
        ))}
        {riviers && riviers.map((river, index) => (
          <Polyline
            key={index}
            path={river.path}
            options={{
              strokeColor: '#00BFFF',  // Couleur des bordures
              strokeOpacity: 0.8,       // Opacité des bordures
              strokeWeight: 1,
              onLoad: {handlesetLoading}       // Épaisseur des bordures
            }}
          />
        ))}
        {shedew && shedew.map((shed, index) => (
          <Polyline
            key={index}
            path={shed.path}
            options={{
              strokeColor: '#00BFFF',  // Couleur des bordures
              strokeOpacity: 0.8,       // Opacité des bordures
              strokeWeight: 1           // Épaisseur des bordures
            }}
          />
        ))}
      </GoogleMap>
      {isLoading && (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Floutage léger
        backdropFilter: 'blur(5px)' // Applique un flou au contenu sous cette div
      }}>
        <BeatLoader color="#f44336"  title='Nous analysons votre demande' size={15} />
      </div>
    )}
    </LoadScript>
    </div>
  
  )
}

export default React.memo(MyComponent);
