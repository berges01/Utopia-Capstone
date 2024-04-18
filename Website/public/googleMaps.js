// Initialize and add the map
let map;

async function initMap() {
  const murdock = { lat: 40.329620, lng: -111.691117 };
  const byu = { lat: 40.247778, lng: -111.646678 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // Create the map on index.html
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: murdock,
    mapId: "murdock",
    mapTypeId: "satellite"
  });
  heatPoints(map);
}

async function heatPoints(map) {
  // Create heatmap
  // Get Heatpoints
  const heatPointsRequest = await fetch('/api/latest/count')
  const heatPoints = await heatPointsRequest.json();
  console.log(heatPoints)

  // Loop through the data to create heatpoints with google maps
  var heatMapData = []
  for (let i = 0; i < heatPoints.length; i++) {
    let point = {
      location: new google.maps.LatLng(heatPoints[i].lat, heatPoints[i].lng), weight: heatPoints[i].weight 
    }
    heatMapData.push(point)
    point = {}
  }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
  
}
