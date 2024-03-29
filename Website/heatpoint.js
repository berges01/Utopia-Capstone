let sensor_locations = [
    {devEui: "2232330000888809", location: "Murdock Sensor 2", lat: process.env.NINELAT, lng: process.env.NINELNG },
    {devEui: "2232330000888802", location: "Murdock Sensor 3", lat: process.env.TWOLAT, lng: process.env.TWOLNG },
    {devEui: "2232330000888805", location: "Murdock Sensor 1", lat: process.env.MS1LAT, lng: process.env.MS1LNG },
    {devEui: "2232330000888806", location: "Murdock Sensor 5", lat: process.env.MS5LAT, lng: process.env.MS5LNG },
    {devEui: "2232330000888810", location: "Murdock Sensor 4", lat: process.env.MS4LAT, lng: process.env.MS4LNG }
];



let heatpoints = [];

class heatpoint {
    lat;
    lng;
    weight;
    devEui;
    time;

    constructor(devEui, time) {
        this.devEui = devEui;
        this.time = time;
    }

    setWeight(count) {
        switch (true) {
            case count <= 10:
                this.weight = .5
                break
            case count <= 20:
                this.weight = 1
                break
            case count <= 50:
                this.weight = 3
                break
            case count <= 100:
                this.weight = 5
                break
            case count <= 250:
                this.weight = 10
                break
            default:
                this.weight = 0
                break
        }
    }

    setLatandLng() {
        let devEui = this.devEui
        for (let i = 0; i < sensor_locations.length; i++) {
            if (sensor_locations[i].devEui == devEui) {
                this.lat = sensor_locations[i].lat
                this.lng = sensor_locations[i].lng
            }
        }
    }
    
    save() {
        heatpoints.push(this);
    }
}

function create(id, count, time) {
    deleteHeatPoint(id)
    const newHeatpoint = new heatpoint(id, time);
    buffer = Buffer.from(count, "base64")
    decimalCount = buffer.readUInt8(0)
    newHeatpoint.setWeight(decimalCount)
    newHeatpoint.setLatandLng()
    newHeatpoint.save()
}

function deleteHeatPoint(devEui) {
    for (let i = 0; i < heatpoints.length; i++) {
        if (heatpoints[i].devEui == devEui) {
            heatpoints.splice(i, 1)
        }
    }
}

async function get() {
    return heatpoints;
}

module.exports = {
    create,
    get,
}
