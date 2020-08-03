const express = require('express');
const router = express.Router();
const Agent = require('../models/agent');
const House = require('../models/house');

// All Agents Route
router.get('/',
    async (req, res) => {
        let searchOptions = {}
        if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i')
        }
        try {
            const agents = await Agent.find(searchOptions)
            res.render('agents/index', {
                agents: agents,
                searchOptions: req.query
            })
        } catch {
            res.redirect('/')
        }
    }
);

// New Agent Route
router.get('/new',
    (req, res) => {
        res.render('agents/new', { agent: new Agent() })
    }
);

// Create Agent Route
router.post('/', async (req, res) => {
    const agent = new Agent(
        {
            name: req.body.name
        }
    )
    try {
        const newAgent = await agent.save()
        res.redirect(`agents/${newAgent.id}`)
    } catch {
        res.render('agents/new', {
            agent: agent,
            errorMessage: 'Error creating Agent'
        })
    }
});

router.get('/:id',
    async (req, res) => {
        try {
            const agent = await Agent.findById(req.params.id)
            const houses = await House.find({ agent: agent.id }).limit(10).exec()
            res.render('agents/show', {
                agent: agent,
                housesByAgent: houses
            })
        } catch {
            res.redirect('/')
        }
    }
);

router.get('/:id/edit',
    async (req, res) => {
        try {
            const agent = await Agent.findById(req.params.id)
            res.render('agents/edit', { agent: agent })
        } catch {
            res.redirect('/agents')
        }
    }
);

router.put('/:id',
    async (req, res) => {
        let agent;
        try {
            agent = await Agent.findById(req.params.id)
            agent.name = req.body.name
            await agent.save()
            res.redirect(`/agents/${agent.id}`)
        } catch {
            if (agent == null) {
                res.redirect('/')
            } else {
                res.render('agents/edit', {
                    agent: agent,
                    errorMessage: 'Error updating Agent'
                })
            }
        }
    }
);

router.delete('/:id',
    async (req, res) => {
        let agent;
        try {
            agent = await Agent.findById(req.params.id)
            await agent.remove()
            res.redirect('/agents')
        } catch {
            if (agent == null) {
                res.redirect('/')
            } else {
                res.redirect(`/agents/${agent.id}`)
            }
        }
    }
);

module.exports = router;