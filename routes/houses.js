const express = require('express');
const router = express.Router();
const House = require('../models/house');
const Agent = require('../models/agent');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];

// All Houses Route
router.get('/',
    async (req, res) => {
        let query = House.find();
        if (req.query.location != null && req.query.location != '') {
            query = query.regex('location', new RegExp(req.query.location, 'i'))
        }
        try {
            const houses = await query.exec()
            res.render('houses/index',
                {
                    houses: houses,
                    searchOptions: req.query
                }
            )
        } catch {
            res.redirect('/')
        }
    }
);

// New House Route
router.get('/new',
    async (req, res) => {
        renderNewPage(res, new House())
    }
);

// Create House Route
router.post('/',
    async (req, res) => {
        const house = new House(
            {
                location: req.body.location,
                price: req.body.price,
                numberOfBedrooms: req.body.numberOfBedrooms,
                numberOfBathrooms: req.body.numberOfBathrooms,
                description: req.body.description,
                yearBuilt: req.body.yearBuilt,
                type: req.body.type,
                Sqft: req.body.Sqft,
                parking: req.body.parking,
                agent: req.body.agent
            }
        )

        saveImage(house, req.body.image);

        try {
            const newHouse = await house.save()
            res.redirect(`houses/${newHouse.id}`)
        } catch {
            renderNewPage(res, house, true)
        }
    }
);

// Show House Route
router.get('/:id',
    async (req, res) => {
        try {
            const house = await House.findById(req.params.id)
                .populate('agent')
                .exec()
            res.render('houses/show', { house: house })
        } catch {
            res.redirect('/')
        }
    }
);

// Edit House Route
router.get('/:id/edit',
    async (req, res) => {
        try {
            const house = await House.findById(req.params.id)
            renderEditPage(res, house)
        } catch {
            res.redirect('/')
        }
    }
);

// Update House Route
router.put('/:id',
    async (req, res) => {
        let house;

        try {
            house = await House.findById(req.params.id)
            house.location = req.body.location
            house.agent = req.body.agent
            house.price = req.body.price
            house.numberOfBedrooms = req.body.numberOfBedrooms
            house.numberOfBathrooms = req.body.numberOfBathrooms
            house.description = req.body.description
            house.yearBuilt = req.body.yearBuilt
            house.type = req.body.type
            house.Sqft = req.body.Sqft
            house.parking = req.body.parking

            if (req.body.image != null && req.body.image !== '') {
                saveImage(house, req.body.image)
            }
            await house.save()
            res.redirect(`/houses/${house.id}`)
        } catch {
            if (house != null) {
                renderEditPage(res, house, true)
            } else {
                redirect('/')
            }
        }
    }
);

// Delete House Page
router.delete('/:id',
    async (req, res) => {
        let house;
        try {
            house = await House.findById(req.params.id)
            await house.remove()
            res.redirect('/houses')
        } catch {
            if (house != null) {
                res.render('houses/show', {
                    house: house,
                    errorMessage: 'Could not remove house'
                })
            } else {
                res.redirect('/')
            }
        }
    }
);

async function renderNewPage(res, house, hasError = false) {
    renderFormPage(res, house, 'new', hasError)
};

async function renderEditPage(res, house, hasError = false) {
    renderFormPage(res, house, 'edit', hasError)
};

async function renderFormPage(res, house, form, hasError = false) {
    try {
        const agents = await Agent.find({})
        const params = {
            agents: agents,
            house: house
        }
        if (hasError) {
            if (form === 'edit') {
                params.errorMessage = 'Error Updating House'
            } else {
                params.errorMessage = 'Error Creating House'
            }
        }
        res.render(`houses/${form}`, params)
    } catch {
        res.redirect('/houses')
    }
};

function saveImage(house, imageEncoded) {
    if (imageEncoded == null) return
    const image = JSON.parse(imageEncoded)
    if (image != null && imageMimeTypes.includes(image.type)) {
        house.houseImage = new Buffer.from(image.data, 'base64')
        house.houseImageType = image.type
    }
};

module.exports = router;