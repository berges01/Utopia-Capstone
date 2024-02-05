CREATE TABLE HikingTrail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    current_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trail_name VARCHAR(100),
    people_count INT
);

INSERT INTO HikingTrail (current_time, trail_name, people_count) VALUES
    ('2024-02-04 08:00:00', 'Murdock Trail', 5),
    ('2024-02-04 08:00:15', 'Murdock Trail', 7),
    ('2024-02-04 08:00:30', 'Murdock Trail', 9),
    ('2024-02-04 08:00:45', 'Murdock Trail', 11),
    ('2024-02-04 08:01:00', 'Murdock Trail', 14),
    ('2024-02-04 08:01:15', 'Murdock Trail', 16),
    ('2024-02-04 08:01:30', 'Murdock Trail', 18),
    ('2024-02-04 08:01:45', 'Murdock Trail', 20);
