const GOOGLE_API_KEY = ""

export function getPreview(lat,lng){
    const imageurl=`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`

    return imageurl
}


export async function getAddress(lat,lng){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB8fzce9tOKTDshHH_XemwZdcqYNKOAcnc`
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Failed to fetch address");
    }

    const data = await response.json()
    const address = data.results[0].formatted_address;
    console.log(address)
    return address;
}