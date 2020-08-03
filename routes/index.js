const express = require('express');
const router = express.Router();
const House = require('../models/house');

router.get('/',
    async (req, res) => {
        let houses;
        try {
            houses = await House.find().sort({ createdAt: 'desc' }).limit(20).exec()
        } catch {
            houses = [];
        }
        res.render('index', { houses: houses })
    }
);

module.exports = router;