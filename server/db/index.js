var mysql = require('mysql');

var con = mysql.createPool({
	host: '####',
	user: '####',
	password: '####',
	database: 'garden',
});

let gardendb = {};

gardendb.sensorsData = (planter_id) => {
	const q =
		"SELECT messurment, planter_id, DATE_FORMAT(taken, '%m/%d/%y %H:%i') AS time FROM sensors\
        WHERE planter_id = ? ORDER BY taken DESC LIMIT 1";
	return new Promise((resolve, reject) => {
		con.query(q, [planter_id], function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.insertIntoSensors = (messurment, planter_id) => {
	const q =
		'INSERT INTO sensors (messurment, planter_id)\
        VALUES ( ?, ?)';
	return new Promise((resolve, reject) => {
		con.query(q, [messurment, planter_id], function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.waterMotorData = (planter_id) => {
	const q =
		"SELECT plant, messurment, DATE_FORMAT(watered, '%m/%d/%y %H:%i') AS time FROM waterMotors\
        INNER JOIN sensors ON waterMotors.sensor_id = sensors.id\
        INNER JOIN planters ON sensors.planter_id = planters.id\
        WHERE waterMotors.planter_id = ?\
        ORDER BY watered DESC LIMIT 1";

	return new Promise((resolve, reject) => {
		con.query(q, [planter_id], function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

module.exports = gardendb;
