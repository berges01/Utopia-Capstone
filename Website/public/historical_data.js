async function loadDB() {
    let id = 'TrailUserData'
    try {
        const response = await fetch('/api/historical/data')
        database = await response.json();
        displayDB(database)
    } catch (error) {
        console.log(error)
    }
}

function displayDB(database) {
    const tableElement = document.querySelector('#trail-data')

    for (const [i, entry] of database.entries()) {
        const sensorIDEl = document.createElement('td')
        const timeEl = document.createElement('td')
        const countEl = document.createElement('td')

        sensorIDEl.textContent = entry.trail_name
        timeEl.textContent = new Date(entry.current_time).toLocaleString()
        countEl.textContent = entry.people_count

        const rowEl = document.createElement('tr')
        rowEl.appendChild(sensorIDEl)
        rowEl.appendChild(timeEl)
        rowEl.appendChild(countEl)

        tableElement.appendChild(rowEl)
    }
}



loadDB()