import React from 'react';
import {Map,Marker, GoogleApiWrapper,InfoWindow
} from 'google-maps-react';

import SquareAPI from './SquareApi'

export class MapContainer extends React.Component {
  state={
    markers:[], //state to store all markers
    showingInfoWindow: false,
    activeMarker: {}, //state to choose the selected marker
    selectedPlace: {},
    markersObject:[], //state to get the array of markersObject
    pop:[] //state to get the Popular places array
  }
 
  componentDidMount=()=>{
    this.setState({markers:this.props.initials});    
  }
  
  onMarkerClick=(props,marker,e)=>{
    console.log(marker,props)
    let newobj=this.state.markersObject.map(mark=>{
      if(mark.name!==marker.name){
        mark.setIcon(null);
        mark.setAnimation(null);
      }
      return mark
    })
    this.setState({markersObject:newobj})
    marker.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png')
    marker.setAnimation(props.google.maps.Animation.BOUNCE)
    SquareAPI.search({ll:`${props.position.lat},${props.position.lng}`}).then((res)=>{
      let popularPlaces=res.response.venues.map(venue=>venue.name);
      this.setState({pop:popularPlaces})
    }).catch(()=>{
      let popularPlaces=[];
      this.setState({pop:popularPlaces})
    })
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    }); 
  }
  onMapClick=(props)=>{
    this.state.activeMarker.setAnimation(null);
    this.state.activeMarker.setIcon(null)

    if(this.state.showingInfoWindow){
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        pop:[]
      })
    }
  }
  onMarkerMounted = element => {
    this.setState(prevState => ({
      markersObject: [...prevState.markersObject, element && element.marker]
    }))
  };
  
  
  
  render() {
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.props.locations.length; i++) {
    bounds.extend(this.props.locations[i]['location']);
    }
   
    return (
      <Map google={this.props.google} initialCenter={{
        lat:25.830717,
        lng:84.185715
      }} zoom={13} 
      onClick={this.onMapClick}
      bounds={bounds}
      >
        {this.props.locations.map(marker=>{
          return <Marker  ref={this.onMarkerMounted} position={marker.location} onClick={this.onMarkerClick}  name={marker.name} key={marker.name} />
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace && this.state.selectedPlace.name}</h1>
              <h2>Popular Places</h2>
              <ul>
                {this.state.pop.map(place=>{
                  return (
                    <li key={place}>{place}</li>
                  )
                })}
              </ul>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY64-rI8IUDqyIassBMifvj2S3IE-Jgww'
})(MapContainer)