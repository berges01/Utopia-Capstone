async function loadDB() {
    try {
        const historicalDB_response = await fetch('/api/historical/data')
        historical_database = await historicalDB_response.json()
        displayDB(historical_database)
    } catch (error) {
        console.log(error)
    }
}

function removeTableElements() {
    const tableElement = document.getElementById('historical-data')
    while (tableElement.firstChild) {
        tableElement.removeChild(tableElement.firstChild)
    }
}

function displayDB(historical_database) {
    // Remove exising elements in table if there
    removeTableElements()
    const tableElement = document.getElementById('historical-data')
    const thead = document.createElement('thead')
    const row = document.createElement('tr')
    const locationColumn = document.createElement('th')
    const dateColumn = document.createElement('th')
    const numPeopleColumn = document.createElement('th')
    const timeColumn = document.createElement('th')
    const tbody = document.createElement('tbody')
    locationColumn.textContent = 'Location'
    dateColumn.textContent = 'Date'
    numPeopleColumn.textContent = 'Number of People'
    timeColumn.textContent = 'Time'
    tableElement.appendChild(thead)
    tableElement.appendChild(tbody)
    thead.appendChild(row)
    row.appendChild(locationColumn)
    row.appendChild(dateColumn)
    row.appendChild(numPeopleColumn)
    row.appendChild(timeColumn)

    for (const [i, entry] of historical_database.entries()) {
        const locationEl = document.createElement('td')
        const dateEl = document.createElement('td')
        const countEl = document.createElement('td')
        const timeEl = document.createElement('td')
        
        locationEl.textContent = entry.device_location
        dateEl.textContent = entry.date.substring(0,10)
        countEl.textContent = entry.people_count
        timeEl.textContent = entry.time
        
        const rowEl = document.createElement('tr')
        rowEl.appendChild(locationEl)
        rowEl.appendChild(dateEl)
        rowEl.appendChild(countEl)
        rowEl.appendChild(timeEl)
        rowEl.setAttribute('class', 'table-light')

        tbody.appendChild(rowEl)
    }
}

async function filterLocation() {
    try {
        const dropDownLocationEle = document.getElementById('location-dropdown')
        const locationDataResponse = await fetch(`/api/filter/location/?location=${dropDownLocationEle.value}`)
        locationData = await locationDataResponse.json()
        displayDB(locationData)
    } catch (error) {
        console.log(error)
    }
}

async function filterDay() {
    try {
        const dropDownDayEle = document.getElementById('day-dropdown')
        const dayDataResponse = await fetch(`/api/filter/day/?day=${dropDownDayEle.value}`)
        dayData = await dayDataResponse.json()
        displayDB(dayData)
    } catch (error) {
        console.log(error)
    }
}
loadDB()
