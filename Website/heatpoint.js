let sensor_locations = [
    {devEui: "2232330000888809", location: "CTB-45A", lat: process.env.NINELAT, lng: process.env.NINELNG },
    {devEui: "2232330000888802", location: "Brigham Square", lat: process.env.THREELAT, lng: process.env.THREELAT }
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

function create(uplink) {
    deleteHeatPoint(uplink.body.deviceInfo.devEui)
    const newHeatpoint = new heatpoint(uplink.body.deviceInfo.devEui, uplink.body.time);
    buffer = Buffer.from(uplink.body.data, "base64")
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