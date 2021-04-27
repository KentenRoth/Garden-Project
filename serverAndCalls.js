var mysql = require('mysql');

var con = mysql.createConnection({
	host: '####',
	user: '####',
	password: '####',
	database: 'garden',
});

con.connect(function (err) {
	if (err) throw err;
	console.log('connected');
});

exports.planterOneMessurment = (messurment) => {
	var q = `INSERT INTO sensors (messurment, planter_id) VALUES (${messurment}, 1)`;
	con.query(q, function (err, result) {
		if (err) throw err;
		return;
	});
};

exports.planterTwoMessurment = (messurment) => {
	var q = `INSERT INTO sensors (messurment, planter_id) VALUES (${messurment}, 2)`;
	con.query(q, function (err, result) {
		if (err) throw err;
		return;
	});
};

exports.waterMotorOneActivated = () => {
	var q =
		'INSERT INTO waterMotors (planter_id, sensor_id) VALUES (1, LAST_INSERT_ID())';
	con.query(q, function (err, result) {
		if (err) throw err;
		return;
	});
};

exports.waterMotorTwoActivated = () => {
	var q =
		'INSERT INTO waterMotors (planter_id, sensor_id) VALUES (2, LAST_INSERT_ID())';
	con -
		query(q, function (err, result) {
			if (err) throw err;
			return;
		});
};

exports.closeConnection = () => {
	con.end(function (err) {
		if (err) throw err;
		console.log('connection closed');
	});
};
