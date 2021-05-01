const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:planter_id', async (req, res, next) => {
	try {
		let results = await db.sensorsData(req.params.planter_id);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.get('/sensors/:messurment,:planter_id', async (req, res) => {
	try {
		let results = await db.insertIntoSensors(
			req.params.messurment,
			req.params.planter_id
		);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

module.exports = router;
