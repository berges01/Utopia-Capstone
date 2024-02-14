import requests
import json

url = 'http://localhost:5000/chirpstack/data'  # Adjust the URL as needed

# Example data to send in the request body
data = {
    "device_id": "device123",
    "payload": "some_data"
}

# Convert data to JSON format
json_data = json.dumps(data)

# Specify headers
headers = {
    'Content-Type': 'application/json'
}

# Make the POST request
response = requests.post(url, data=json_data, headers=headers)

# Print response
print(response.json())
