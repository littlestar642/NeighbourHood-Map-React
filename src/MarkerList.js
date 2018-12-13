import React from 'react';
import SquareAPI from './SquareApi'

class MarkerList extends React.Component{
    state={
        displayModal:false,
        pop:[],
        activeMarker:'',
        first:true
    }

    setMarker=(e)=>{
        console.log(e);
        this.props.setMarker(e.target.textContent);
        
            this.setState({activeMarker:e.target.textContent});
            let newArr=this.props.markers.filter(marker=>{
            return marker.name===e.target.textContent;
        })
        let location=newArr[0]['location']
        SquareAPI.search({ll:`${location.lat},${location.lng}`}).then((res)=>{
            let popularPlacesName=res.response.venues.map(venue=>{
                return {
                    "name":venue.name,
                    "id":venue.id
                }
            });
            console.log(res.response);
            this.setState({pop:popularPlacesName,displayModal:true})
        })
        
        
        
    }

    render(){
        return(
            this.props.markers.map(marker=>{
                return (
                    <li tabIndex='0' className='list-item' key={marker.name}>
                    <h3 onClick={this.setMarker}>{marker.name}</h3>
                    {this.state.displayModal && this.state.activeMarker===marker.name && (
                        
                        <ul><h4>Popular Places</h4>
                            {this.state.pop.map(place=>{
                                return <li key={place.id}>{place.name}</li>
                            })}
                        </ul>
                    ) }
                    </li>
                )
            })
            
                
        )
    }
}




export default MarkerList