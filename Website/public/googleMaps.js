// Initialize and add the map
let map;

async function initMap() {
  const oremHut = { lat: 40.329620, lng: -111.691117 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // Create the map on index.html
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: oremHut,
    mapId: "Orem UTOPIA Hut",
    mapTypeId: "satellite"
  });
  heatPoints(map);
}

async function heatPoints(map) {
      // Create heatmap
    // Microwave Sensor 1 Location
    const mS1 = { lat: 40.329442, lng: -111.690700};
    // Microwave Sensor 2 Location
    const mS2 = { lat: 40.328052, lng: -111.688704 };
    // Microwave Sensor 3 Location
    const mS3 = { lat: 40.326841, lng: -111.686955 };

    /* Data points defined as a mixture of WeightedLocation and LatLng objects */
var heatMapData = [
    { location: new google.maps.LatLng(mS1.lat, mS1.lng), weight: 1 },
    { location: new google.maps.LatLng(mS2.lat, mS2.lng), weight: 1 },
    { location: new google.maps.LatLng(mS3.lat, mS3.lng), weight: 1 }
  ];
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}

initMap();
