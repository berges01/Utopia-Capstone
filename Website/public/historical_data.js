async function loadDB() {
    try {
        const historicalDB_response = await fetch('/api/historical/data')
        historical_database = await historicalDB_response.json()
        displayDB(historical_database)
    } catch (error) {
        console.log(error)
    }
}

function displayDB(historical_database) {
    const tableElement = document.querySelector('tbody')

    for (const [i, entry] of historical_database.entries()) {
        const locationEl = document.createElement('td')
        const timeEl = document.createElement('td')
        const countEl = document.createElement('td')
        
        locationEl.textContent = entry.device_location
        timeEl.textContent = new Date(entry.current_time).toLocaleString()
        countEl.textContent = entry.people_count
        
        const rowEl = document.createElement('tr')
        rowEl.appendChild(locationEl)
        rowEl.appendChild(timeEl)
        rowEl.appendChild(countEl)
        rowEl.setAttribute('class', 'table-light')

        tableElement.appendChild(rowEl)
    }
}



loadDB()