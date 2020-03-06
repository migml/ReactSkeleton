import * as React from 'react';
import Proptypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as axios from 'axios';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(data, marker, a) {
        if (this.props.onClick !== undefined) {
            let lat = a.latLng.lat();
            let lng = a.latLng.lng();
            let oc = this.props.onClick;
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=0b7cf4c67d6347ffafd367fa0e09510e`)
                .then(function (response) {
                    let locationInfo = {
                        latitude: lat,
                        longitude: lng,
                        country: response.data.results[0].components.country, //pais
                        state: response.data.results[0].components.state,//comunidad
                        city: (response.data.results[0].components.city || response.data.results[0].components.locality || response.data.results[0].components.county),
                        zip: response.data.results[0].components.postcode,//codigopostal
                        road: response.data.results[0].components.road,//calle                        
                    }
                    return locationInfo;
                })
                .catch(function (error) {
                    return null;
                })
                .then(function (data) {
                    oc(data);
                });
        }
    }
    render() {
        return (
            <Map centerAroundCurrentLocation={true} google={this.props.google} onClick={this.handleChange} fullscreenControl={false} zoom={16}>
                <Marker onClick={this.onMarkerClick} name={'Current location'} />
                <InfoWindow onClose={() => {}}>
                    <div><h1>Hola</h1></div>
                </InfoWindow>
            </Map>
        );
    }
}

MapContainer.propTypes = {
    markers: Proptypes.object,
    onClick: Proptypes.func
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA79cbqr-1ctakxcihn-jTo3xRTwtKUlZU')
})(MapContainer)