import React  from "react";
import Placeform from "../components/Places/Placeform";
import { insertPlace } from "../utils/Database";

function Addplace({navigation}){

    async function createplaceHandler(place){
        console.log(place.address)
        await insertPlace(place);
        navigation.navigate('AllPlaces')
    }

    return <Placeform oncreateplace={createplaceHandler}/>
}

export default Addplace;