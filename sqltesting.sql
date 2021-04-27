CREATE TABLE planters(
    id INT AUTO_INCREMENT PRIMARY KEY,
    planter INT,
    plant VARCHAR(50) NOT null,
    planted Date DEFAULT CURDATE()
);

CREATE TABLE sensors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    messurment DECIMAL(6,2),
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

INSERT INTO planters (planter, plant)
    VALUES (1, 'Garlic');

INSERT INTO planters (planter, plant)
    VALUES (2, 'Green Onions');

INSERT INTO sensors (messurment, planter_id)
    VALUES (1892.39, 1);

INSERT INTO waterMotors (planter_id, sensor_id) 
    VALUES(1, LAST_INSERT_ID())

SELECT plant, messurment, watered FROM waterMotors
    INNER JOIN sensors ON waterMotors.sensor_id = sensors.id
    INNER JOIN planters ON sensors.planter_id = planters.id
    ORDER BY watered;