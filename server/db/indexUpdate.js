let mysql = require('mysql');

let con = mysql.createPool({
	host: '192.168.##.###',
	user: '###',
	password: '###',
	database: 'garden',
});

let gardendb = {};

// Temperature Table
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

gardendb.getTemperatureData = () => {
	const q = 'SELECT * FROM temperature ORDER BY created_at DESC LIMIT 24';
	return new Promise((resolve, reject) => {
		con.query(q, function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

// Garden Table
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

gardendb.getNonharvestedPlanters = () => {
	const q = 'SELECT * FROM garden WHERE harvested = 0';
	return new Promise((resolve, reject) => {
		con.query(q, function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.getSingleGarden = (planter) => {
	const q = 'SELECT * FROM garden WHERE planter = ? AND harvested = 0';
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

// Soil Table
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

gardendb.getSoilMoistureForPlanter = (planter) => {
	const q =
		'SELECT measurement FROM soil WHERE garden_id = (SELECT id FROM garden WHERE planter = ? AND harvested = false) ORDER BY measured DESC LIMIT 24';
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

// Watering Table
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

gardendb.getWateringDataForPlanter = (planter) => {
	const q =
		'SELECT watered FROM watering WHERE garden_id = (SELECT id FROM garden WHERE planter = ? AND harvested = false) AND watered >= NOW() - INTERVAL 1 DAY ORDER BY watered DESC';
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

// Getting all data for a single planter
gardendb.getSingleNonHarvestedGarden = (planter) => {
	const q = `
        SELECT g.*, s.measurement, s.measured, w.watered 
        FROM garden AS g
        JOIN soil AS s ON g.id = s.garden_id
        JOIN watering AS w ON g.id = w.garden_id
        WHERE g.planter = ? AND g.harvested = 0 AND w.watered >= NOW() - INTERVAL 1 DAY
        ORDER BY s.measured DESC
    `;
	return new Promise((resolve, reject) => {
		con.query(q, [planter], function (err, results) {
			if (err) {
				console.log(err);
				return reject(err);
			}

			const groupedResults = {};
			results.forEach((result) => {
				if (!groupedResults[result.id]) {
					groupedResults[result.id] = {
						id: result.id,
						plant: result.plant,
						planted: result.planted,
						harvested: result.harvested,
						planter: result.planter,
						measurement: [],
						watered: [],
					};
				}

				const measurementString = `${
					result.measurement
				}-${result.measured.toISOString()}`;
				if (
					!groupedResults[result.id].measurement
						.map(
							(m) =>
								`${m.measurement}-${m.measured.toISOString()}`
						)
						.includes(measurementString)
				) {
					groupedResults[result.id].measurement.push({
						measurement: result.measurement,
						measured: result.measured,
					});
				}

				const wateredString = result.watered.toISOString();
				if (
					!groupedResults[result.id].watered.includes(wateredString)
				) {
					groupedResults[result.id].watered.push(wateredString);
				}
			});

			return resolve(Object.values(groupedResults)[0]);
		});
	});
};

module.exports = gardendb;
