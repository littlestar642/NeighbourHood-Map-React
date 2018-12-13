import React from 'react';
import {Map,Marker, GoogleApiWrapper,InfoWindow
} from 'google-maps-react';

import SquareAPI from './SquareApi'

export class MapContainer extends React.Component {
  state={
    markers:[], //state to store all markers
    showingInfoWindow: false,
    activeMarker: null, //state to choose the selected marker
    selectedPlace: {},
    markersObject:[], //state to get the array of markersObject
    pop:[], //state to get the Popular places array
    map:{}
  }
 
  global={
    active:null
  }
  componentDidMount=()=>{
    this.setState({markers:this.props.initials});
    window.gm_authFailure=()=>{
      alert('Google Map Auth Failed. Seems Your API config is invalid')
    }
  }
  
  onMarkerClick=(props,marker,e)=>{
    if(this.global.active!=null){
      this.global.active.setAnimation(null)
      this.global.active.setMap(null)
    }
    console.log(marker,props)
    let newobj=this.state.markersObject.map(mark=>{
      if(mark && mark.name!==marker.name){
        mark.setIcon(null);
        mark.setAnimation(null);
      }
      return mark
    })
    this.setState({markersObject:newobj})
    marker.setIcon('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png')
    marker.setAnimation(props.google.maps.Animation.BOUNCE)
    SquareAPI.search({ll:`${props.position.lat},${props.position.lng}`}).then((res)=>{
      if(res===undefined){
        alert('The request to API failed. Seems You are not Connected to internet')
        return;
    }
      let popularPlaces=res.response.venues.map(venue=>venue.name);
      this.setState({pop:popularPlaces})
    }).catch((e)=>{
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
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.state.activeMarker && this.state.activeMarker.setIcon(null)
    this.global.active && this.global.active.setAnimation(null)
    this.global.active && this.global.active.setMap(null)
    this.global.active=null;
    if(this.state.showingInfoWindow){
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        pop:[]
      })
    }
  }
  componentDidUpdate=()=>{
    this.global.active=null;
    let newArr=this.state.markersObject && this.state.markersObject.filter(marker=>{
      return (marker && marker.name)=== (this.props.markerToset && this.props.markerToset.name)
    })
    this.global.active=newArr[0];
    newArr[0] && newArr[0].setMap(this.state.map)
    newArr[0] && newArr[0].setAnimation(this.props.google.maps.Animation.BOUNCE)
  }
  onMarkerMounted = element => {
    this.setState(prevState => {
      if(element!==null && prevState.markersObject.find(elem=>elem.name===element.name)===undefined){
      return {markersObject: [...prevState.markersObject,element.marker]}
      }
      else{
        return {markersObject:prevState.markersObject}
      }
    })
  };
  mapMounted=element=>{
    this.setState({map:element.map})
  }
  
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
      ref={this.mapMounted}
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