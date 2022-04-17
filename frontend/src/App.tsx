import React, { useEffect, useRef, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import './App.css';
export interface GeoJsonMapper {
  type: string;
  features: any[]
}
function App() {
  const [Arrondissement, setArrondissement] = useState<GeoJsonMapper>({
    "type": "FeatureCollection",
    "features": []
  });
  const [Marks, setMarker] = useState<GeoJsonMapper>({
    "type": "FeatureCollection",
    "features": []
  });
  const codePostalRef = useRef<HTMLInputElement>(null);
  const [codePostale, setCodePostale] = useState<string>();

  useEffect(() => {
    if (codePostale && codePostale.length >= 2 && Number(codePostale) <= 20 && Number(codePostale) >= 1) {
      fetch(`http://localhost:4200/api/Arrondissement/751${codePostale}`,
        {
          headers: {
            'Content-Type': 'Application/json'
          }
        }).then(res => res.json()).then(res => {
          setArrondissement({
            type: "FeatureCollection",
            features: [
              {
                "type": "Feature",
                properties: { ...res[0]?.properties },
                geometry: {
                  "type": "Polygon",
                  coordinates: res[0]?.geometry?.coordinates
                }
              }
            ]
          })
        }).catch(err => console.log(err));
      fetch(`http://localhost:4200/api/Lieux/750${codePostale}`,
        {
          headers: {
            'Content-Type': 'Application/json'
          }
        }).then(res => res.json()).then(res => {
          const features = res.map((item: any) => {
            return {
              "type": "Feature",
              properties: { ...item?.properties },
              geometry: {
                "type": "Point",
                coordinates: item?.geometry?.coordinates
              }
            }
          })
          setMarker({
            type: "FeatureCollection",
            features
          });
        }).catch(err => console.log(err));
    }

  }, [codePostale]);
  const handleClick = () => {
    setCodePostale(codePostalRef.current?.value);
  }
  return (

    <Map
      initialViewState={{
        longitude: 2.3522219,
        latitude: 48.856614,
        zoom: 10,
      }}
      attributionControl={false}
      style={{ width: '100vw', height: '100vh', }}
      mapboxAccessToken='pk.eyJ1IjoiYXlvdWJvbjEiLCJhIjoiY2wxemtmNXNrMG1qNzNjbXQyaW9jeHd2aSJ9.5xskRcmUJXypS3jH1-8nXg'
      mapStyle={'mapbox://styles/ayoubon1/cl1zl9reb003c14mrv4t7vj9u'}
    >

      <Source id="my-data" type="geojson" data={Arrondissement as GeoJSON.FeatureCollection<GeoJSON.Geometry>}>
        <Layer id='my-data' type='fill' paint={{ 'fill-color': '#454545', 'fill-opacity': 0.2 }} />
      </Source>
      <Source id="marker" type="geojson" data={Marks as GeoJSON.FeatureCollection<GeoJSON.Geometry>}>
        <Layer id='marker' type='circle'
        />
      </Source>
      <div style={{
        position: 'absolute', left: '45%', top: 100, display: 'flex', flexDirection: 'row', gap: '5px'
      }}
      >
        <input type="text" ref={codePostalRef} />
        <button onClick={handleClick}>Show</button>
      </div>
    </Map>
  )
}

export default App;
