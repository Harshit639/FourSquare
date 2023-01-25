import React  from "react";
import Placeform from "../components/Places/Placeform";

function Addplace({navigation}){

    function createplaceHandler(place){
        console.log(place.address)
        navigation.navigate('AllPlaces',{
            place:place,

        })
    }

    return <Placeform oncreateplace={createplaceHandler}/>
}

export default Addplace;