CREATE TABLE planters(
    id INT AUTO_INCREMENT PRIMARY KEY,
    planter INT,
    plant VARCHAR(50) NOT null,
    planted Date DEFAULT CURDATE()
);

CREATE TABLE sensors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    measurement DECIMAL(6,2),
    taken DATETIME DEFAULT NOW(),
    planter_id INT,
    FOREIGN KEY(planter_id) REFERENCES planters(id)
);

CREATE TABLE waterMotors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    watered DATETIME DEFAULT NOW(),
    planter_id INT,
    sensor_id INT,
    FOREIGN KEY(planter_id) REFERENCES planters(id),
    FOREIGN KEY(sensor_id) REFERENCES sensors(id)
);

-- Currently this is what's planted.
INSERT INTO planters (planter, plant)
    VALUES (1, 'Radishes'),
            (2, 'Green Onions')

-- Instead of LAST_INSERT_ID
-- I am returning the insertID and passing it in
-- LAST_INSERT_ID was giving to many issues
INSERT INTO waterMotors (planter_id, sensor_id) 
    VALUES(1, LAST_INSERT_ID())

-- Gets last time watered, for what plant, and the measurement it was at
SELECT plant, measurement, watered FROM waterMotors
    INNER JOIN sensors ON waterMotors.sensor_id = sensors.id
    INNER JOIN planters ON sensors.planter_id = planters.id
    WHERE waterMotors.planter_id = 1
    ORDER BY watered DESC LIMIT 1;

    SELECT plant, measurement, watered FROM waterMotors
    INNER JOIN sensors ON waterMotors.sensor_id = sensors.id
    INNER JOIN planters ON sensors.planter_id = planters.id
    WHERE waterMotors.planter_id = 2
    ORDER BY watered DESC LIMIT 1;

-- Gets the last measurement for each plant
SELECT plant, measurement, taken FROM sensors
    INNER JOIN planters on sensors.planter_id = planters.id
    WHERE  planter_id = 1
    ORDER BY taken DESC LIMIT 1;

SELECT plant, measurement, taken FROM sensors
    INNER JOIN planters on sensors.planter_id = planters.id
    WHERE planter_id = 2
    ORDER BY taken DESC LIMIT 1