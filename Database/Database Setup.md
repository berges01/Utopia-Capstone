# Database
1. Create a database called HistoricalTrailData using the following command. Run the following command to insure
that the database was created successfully. 
````
CREATE DATABASE HistoricalTrailData;
SHOW DATABASES;
````
2. Create a table called TrailUserData
````
USE HistoricalTrailData;

CREATE TABLE TrailUserData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trail_name VARCHAR(255),
  people_count INT,
  date DATE,
  time TIME
);
````
3. Don't forget to create a user that is not root who can perform the necessary functions in the web app. For more
detail on that please review the Database.js file in the Website folder of this repository.
4. Thats it! Ensure the database is running and can be accessed by the webapp. 
