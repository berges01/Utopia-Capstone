// Initialize and add the map
let map;

async function initMap() {
  const oremHut = { lat: 40.329620, lng: -111.691117 };
  const ctb = { lat: 40.247778, lng: -111.646678 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // Create the map on index.html
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: ctb,
    mapId: "Orem UTOPIA Hut",
    mapTypeId: "satellite"
  });
  heatPoints(map);
}

async function heatPoints(map) {
  // Create heatmap
  // Get Heatpoints
  const heatPointsRequest = await fetch('/api/latest/count')
  const heatPoints = await heatPointsRequest.json();

  // Loop through the data to create heatpoints with google maps

  var heatMapData = []
  for (let i = 0; i < heatPoints.length; i++) {
    let point = {
      location: new google.maps.LatLng(heatPoints[i].lat, heatPoints[i].lng), weight: heatPoints[i].weight 
    }
    heatMapData.push(point)
    point = {}
  }
  console.log(heatMapData)
    /* Data points defined as a mixture of WeightedLocation and LatLng objects */
// var heatMapData = [
//     { location: new google.maps.LatLng(mS1.lat, mS1.lng), weight: 1 },
//     { location: new google.maps.LatLng(mS2.lat, mS2.lng), weight: 1 },
//     { location: new google.maps.LatLng(mS3.lat, mS3.lng), weight: 1 },
//     { location: new google.maps.LatLng(mS4.lat, mS4.lng), weight: 2 }
//   ];
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}
