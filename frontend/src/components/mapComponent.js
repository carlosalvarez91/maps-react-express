import React,{useEffect, useState} from 'react';
import {Map, Marker, Polygon, GoogleApiWrapper} from 'google-maps-react';

const PointComponent = (props) =>{
  return(
    <Marker
    position={{lat:props.position[0], lng:props.position[1]}}
     />
  )
}

const PolygonComponent = (props) =>{
  let arrLatLngObj = []
  props.data.geometry.coordinates.forEach(e=>{
    e.forEach(c=>{
      arrLatLngObj.push({
        lat: c[0],
        lng: c[1]
      })
    })

  })
  console.log('.......',arrLatLngObj)
  return(
    <Polygon
      paths={arrLatLngObj}
      strokeColor={"#0000FF"}//props.data.properties.strokeColor
      strokeOpacity={0.8}// props.data.properties.strokeOpacity
      strokeWeight={2}// props.data.properties.strokeWeight
      fillColor="#0000FF"
      fillOpacity={0.35} 
      />
  )
}
const MapComponent = (props) =>{
  const [polygonsData, setPolygonsData] = useState([])
  const [pointsData, setPointsData] = useState([])

  useEffect(() => { 
    fetch('/api/altitudeangel')
      .then(res => res.json())
      .then(async function (data){ 
        let arrPolygons = []
        let arrPoints = []
        
         await data.forEach(e=>{
          if(e.geometry.type ==="Polygon"){
            arrPolygons.push(e)
          }else if(e.geometry.type ==="Point"){
            arrPoints.push(e)
          }
        })

        await setPolygonsData(arrPolygons)
        await setPointsData(arrPoints)

      });
  });

  return(
      <Map 
        google={props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}
        center={{
          lat: 51.45678869904309,
          lng:-0.9652591746662439
        }}
        >

        {
          polygonsData.map(p=>{
          return <PolygonComponent 
                    key={p.id}
                    data={p}
                    />
          })
        }


        {
          pointsData.map(p=>{
          return <PointComponent
                          key={p.id}
                          position={p.geometry.coordinates} />
          })
        }

      </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBDsGQgHNnlPs95ROT0LENHhJ5twax51ZA')
})(MapComponent)
