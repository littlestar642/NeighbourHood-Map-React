import React from 'react';
import MarkerList from './MarkerList'

class SearchBox extends React.Component{

    state={
        query:'',
        markers:[]
    }
    componentDidMount=()=>{
        this.setState({markers:this.props.locations})
    }

    handleInput=(e)=>{
        let newArr=this.props.locations.filter((location)=>{
            return location.name.toLowerCase().includes(e.target.value)
        })
        this.setState({query:e.target.value,markers:newArr})
        console.log(newArr)
        this.props.getNewArr(newArr);
    }
    markerToSet=(val)=>{
        let markerSet=this.props.locations.filter((location)=>location.name===val);
        this.props.markerSetting(markerSet[0]);
    }
    render(){
        return(
            <div className='searchBox'>
                <div className='inputField'>
                <h1>Enter the Name to Search</h1>
                <input className='inputBox' aria-labelledby='Place Filter' type="text" value={this.state.query} onChange={this.handleInput}/>
                </div>
                <div>
                <ul className='markerList'>
                <MarkerList setMarker={this.markerToSet}  markers={this.state.markers}/>
                </ul>
                </div>
            </div>
        )
    }
}




export default SearchBox