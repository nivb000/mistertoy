import { useState } from "react";
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { MapProps } from "@/interfaces/mapprops";

const AnyReactComponent = ({ key,lat,lng,text } : MapProps) => <div>{text}</div>;

export const Map = () => {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 12
    const branchesMarkers = [
        { city: 'Tel Aviv', position: { lat: 32.0853, lng: 34.7818 } },
        { city: 'Bat Yam', position: { lat: 32.016499, lng: 34.750278 } },
        { city: 'New york', position: { lat: 40.712776, lng: -74.005974 } },
    ]

    const setMapPos = ({ lat, lng }:{lat: number,lng: number}) => {
        setCoordinates({ lat, lng })
    }

    return (
        <div className="map-container">
            <ButtonGroup variant="contained" color="info" aria-label="outlined button group">
                {branchesMarkers.map(branch => (
                    <Button key={branch.city} onClick={() => setMapPos({ lat: branch.position.lat, lng: branch.position.lng })}>{branch.city}</Button>
                ))}
            </ButtonGroup>
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    center={coordinates}
                    zoom={zoom}>
                    {branchesMarkers.map(({ position: { lat, lng } }) => <AnyReactComponent key={lat} lat={lat} lng={lng} text={<LocationOnIcon />} />)}
                </GoogleMapReact>
            </div>
        </div>
    )
}