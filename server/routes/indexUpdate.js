const express = require('express');
const router = express.Router();
const db = require('./db');

// Temperature Table
router.post('/temperature/:temp,:humidity', async (req, res) => {
	console.log(req.params);
	try {
		let results = await db.insertTempData(
			req.params.temp,
			req.params.humidity
		);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.get('/temperature', async (req, res) => {
	try {
		let results = await db.getTemperatureData();
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

// Garden Table
router.post('/garden/:plant,:planter', async (req, res) => {
	console.log(req.params);
	try {
		let results = await db.insertPlanterData(
			req.params.plant,
			req.params.planter
		);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.get('/garden', async (req, res) => {
	try {
		let results = await db.getNonharvestedPlanters();
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.get('/garden/:planter', async (req, res) => {
	console.log(req.params);
	try {
		let results = await db.getSingleGarden(req.params.planter);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

// Soil Table
router.post('/soil/:levels,:planter', async (req, res) => {
	console.log(req.params);
	try {
		let results = await db.insertSoilData(
			req.params.levels,
			req.params.planter
		);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

// Watering Table
router.post('/watering/:planter', async (req, res) => {
	console.log(req.params);
	try {
		let results = await db.insertWateringData(req.params.planter);
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

module.exports = router;
