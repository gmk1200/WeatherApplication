 let pinnedAreas=[];
 let currentArea="";
 let currentLatitude;
 let currentLongitude;
 let areaList = {};
let currentName="";
let baseUrl = "https://api.open-meteo.com/v1/forecast?"
let params = "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

renderOnLoad();

async function renderOnLoad(){
    console.log("loading..");
   getLocation();
    setTimeout(async()=>{
        let url= baseUrl+"latitude="+currentLatitude+"&longitude="+currentLongitude+params;
        let data=await getResponse(url);
        await populateData(data);


        console.log(currentLatitude);

    },1000)

   

}

async function populateData(data){
    let location=document.getElementById('location')
    location.innerHTML="Hyderabad";
    // document.append(location);
    let temp=document.getElementById('temparatere');
    temp.innerHTML=data.current.temperature_2m

    let date= document.getElementById('date');
    date.innerHTML=data.current.time


}

function updateDropdown(operation, val, name) {

if(operation === "ADD"){
refreshDropdown();
}else{
pinnedAreas.pop(val);
//pop the area(val) from the areaList
}
}

function refreshDropdown(){
    
    //add curentArea as an option child
    //loop pinned areas as option childs
    //if the currentarea is in pinned areas skip to add as an optionchild in dropdown

}


function savePinnedArea(){
let name= document.getElementById('location');
let obj=new Area(name, currentLatitude, currentLongitude);
pinnedAreas.push(currentArea);
areaList[currentArea]=obj;

}




function updateCurrentLocation(value){
    currentArea=value;
    currentName=document.getElementById('location');

}



 async function getResponse(url){
    const response = await fetch(url,{method:'GET'});
    const data= await response.json();
    console.log(data);
    return data;
 }

 async function getLocation(){
    if("geolocation" in navigator){
         navigator.geolocation.watchPosition(
            function(position){
                const lat=position.coords.latitude;
                const lng=position.coords.longitude;
                currentLatitude = lat;
                currentLongitude = lng;
                return lat+'@'+lng;
                console.log(`Latitude: ${lat}, longitude: ${lng}`);
                
            }
        )
    }
 }


 class Area {
    constructor(name, lat, lng){
        this.name= name;
        this.lat= lat;
        this. lng=lng;
    }
 }


