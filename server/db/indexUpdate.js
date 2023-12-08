let mysql = require('mysql');

let con = mysql.createPool({
	host: '192.168.##.###',
	user: '###',
	password: '###',
	database: 'garden',
});

let gardendb = {};

gardendb.insertTempData = (temp, humidity) => {
	const q = 'INSERT INTO temperature (temp, humidity) VALUES (?, ?)';
	return new Promise((resolve, reject) => {
		con.query(q, [temp, humidity], function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.insertPlanterData = (plant, planter) => {
	const q = 'INSERT INTO garden (plant, planter) VALUES (?, ?)';
	return new Promise((resolve, reject) => {
		con.query(q, [plant, planter], function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.insertSoilData = (measurment, planter) => {
	const q =
		'INSERT INTO soil (garden_id, measurement) SELECT id, ? FROM garden WHERE planter = ? AND harvested = false';
	return new Promise((resolve, reject) => {
		con.query(q, [measurment, planter], function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.insertWateringData = (planter) => {
	const q =
		'INSERT INTO watering (soil_id, garden_id) SELECT s.id AS soil_id, g.id AS garden_id FROM garden g JOIN soil s ON g.id = s.garden_id WHERE g.planter = ? AND g.harvested = false ORDER BY s.measured DESC LIMIT 1;';
	return new Promise((resolve, reject) => {
		con.query(q, [planter], function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

module.exports = gardendb;
