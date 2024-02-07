CREATE DATABASE IF NOT EXISTS HistoricalTrailData;

USE HistoricalTrailData;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'erik1999';

CREATE TABLE IF NOT EXISTS TrailUserData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `current_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trail_name VARCHAR(100),
    people_count INT
);

LOAD DATA INFILE 'dummy-data.csv' INTO TABLE TrailUserData FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';