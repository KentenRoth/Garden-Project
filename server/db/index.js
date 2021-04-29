var mysql = require('mysql');

var con = mysql.createPool({
	host: '####',
	user: '####',
	password: '####',
	database: 'garden',
});

let gardendb = {};

gardendb.allWaterMotors = () => {
	const q = 'SELECT * FROM waterMotors';
	return new Promise((resolve, reject) => {
		con.query(q, function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

gardendb.insertIntoSensors = (messurment, planter_id) => {
	const q = 'INSERT INTO sensors (messurment, planter_id) VALUES ( ?, ?)';
	return new Promise((resolve, reject) => {
		con.query(q, [messurment, planter_id], function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

module.exports = gardendb;
