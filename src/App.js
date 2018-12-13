import React, { Component } from 'react';
import './App.css';
import './icon.png'
import MapContainer from './MapContainer';
import SearchBox from './SearchBox';

class App extends Component {

  state={
    locations:[
      {
          name:'Ballia',
          location:{
            lat:25.830717,
            lng:84.185715
          }
      },
      {
        name:'Varanasi',
        location:{
          lat:25.317644,
          lng:82.973915
        }
      },
      {
        name:'Gazipur',
        location:{
          lat:25.584042,
          lng:83.577019
        }
      },
      {
        name:'Buxar',
        location:{
          lat:25.561001,
          lng:83.980698
        }
      },
      {
        name:'Chappra',
        location:{
          lat:25.779566,
          lng:84.749886
        }
      }
    ],
    sortedLocations:[{
      name:'Ballia',
      location:{
        lat:25.830717,
        lng:84.185715
      }
  },
  {
    name:'Varanasi',
    location:{
      lat:25.317644,
      lng:82.973915
    }
  },
  {
    name:'Gazipur',
    location:{
      lat:25.584042,
      lng:83.577019
    }
  },
  {
    name:'Buxar',
    location:{
      lat:25.561001,
      lng:83.980698
    }
  },
  {
    name:'Chappra',
    location:{
      lat:25.779566,
      lng:84.749886
    }
  }],
  activeMarker:{},
  first:true
  }
  setNewArr=(arr)=>{
    this.setState({sortedLocations:arr})
  }
  passMarker=(obj)=>{
    this.setState({activeMarker:obj})
  }
  handleSideBar=(e)=>{
    if(this.state.first){
    document.querySelector('.column1').style.display='block';
    document.querySelector('.icon1').style.display='block';
    document.querySelector('.icon2').style.display='none';
    this.setState({first:false})
    }
    else{
      document.querySelector('.column1').style.display='none';
      document.querySelector('.icon1').style.display='none';
    document.querySelector('.icon2').style.display='block';
    this.setState({first:true})      
    }
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='column1'>
          <SearchBox markerSetting={this.passMarker} locations={this.state.locations} getNewArr={this.setNewArr}/>
        </div>
        <div className='column2'>
          <div className='topBar'> <span className='heading'><i className='fas fa-angle-double-left icon1' onClick={this.handleSideBar}></i> <i className='fas fa-angle-double-right icon2' onClick={this.handleSideBar}></i>NeighbourHood Map</span> </div>
          <div className='mapContainer' role="application">
            <MapContainer markerToset={this.state.activeMarker} locations={this.state.sortedLocations} initials={this.state.locations}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
