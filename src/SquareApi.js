class Helper {
    static baseURL(){
        return "http://api.foursquare.com/v2";
    }
    static auth(){
        const keys = {
            client_id:"GMAHCFI5SAZS4NJQGULEOB3DFQ13NHS4CD3XP3R03IL3WUF2", 
            client_secret:"OQWL20I5ETDESXMUL5X2VTY3F2HE0PMO05ZAJXNTH1Q2FIAS", 
            v:"20180323"
        }
        return Object.keys(keys) //all keys into array
        .map(key=> `${key}=${keys[key]}`)
        .join("&");
    }
    static urlBuilder(urlPrams){
        if(!urlPrams){
            return ""
        }
        return Object.keys(urlPrams)
        .map(key => `${key}=${urlPrams[key]}`)
        .join("&");
        
    }
    static headers(){
        return{
            Accept:"application/json"
        }
    }
    static simpleFetch(endPoint, method, urlPrams){
        let requestData ={
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlPrams
                )}`,
                requestData
                ).then(res => res.json(),(e)=>e);
    }
} 
export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/search","GET",urlPrams); //foursquare venue search
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET"); //foursquare venues fetch
    }
    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET"); //foursquare photo fetch
    }
}
