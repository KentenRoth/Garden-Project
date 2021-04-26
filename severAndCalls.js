var mysql = require('mysql');

var con = mysql.createConnection({
	host: '####',
	user: '####',
	password: '####',
	database: 'garden',
});

con.connect(function (err) {
	if (err) throw err;
});

exports.planterOneMessurment = (messurment) => {
	var q = `INSERT INTO sensors (messurment, planter_id) VALUES (${messurment}, 1)`;
	con.query(q, function (err, result) {
		if (err) throw err;
		console.log(result);
	});
};

exports.planterOneWaterMotor = () => {};

exports.planterTwoMessurment = (messurment) => {
	var q = `INSERT INTO sensors (messurment, planter_id) VALUES (${messurment}, 2)`;
	con.query(q, function (err, result) {
		if (err) throw err;
		console.log(result);
	});
};

exports.planterTwoWaterMotor = () => {};

closeConnection = () => {
	con.end(function (err) {
		if (err) throw err;
		console.log('connection closed');
	});
};
