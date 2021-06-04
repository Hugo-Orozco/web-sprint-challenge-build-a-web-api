// Write your "projects" router here!
const express = require('express');

const projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await projects.get();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
            error: err.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await projects.get(id);
        if (!data) {
            res.status(404).json({
                message: 'The project was not found.'
            });
        }
        else {
            res.json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Interal server error.',
            error: err.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        if (!body.name || !body.description) {
            res.status(400).json({
                message: 'Invalid body, name and description must be included.'
            });
        }
        else {
            const data = await projects.insert(body);
            res.status(201).json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Interal server error.',
            error: err.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (!body.name || !body.description) {
            return res.status(400).json({
                message: 'Invalid body, name and description must be included.'
            });
        }
        const data = await projects.update(id, body);
        if (!data) {
            res.status(404).json({
                message: 'The project was not found.'
            });
        }
        else {
            res.json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Interal server error.',
            error: err.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await projects.get(id);
        const data = await projects.remove(id);
        if (!data) {
            res.status(404).json({
                message: 'The project was not found.'
            });
        }
        else {
            res.json(deleted);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Interal server error.',
            error: err.message
        });
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await projects.getProjectActions(id);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({
            message: 'Interal server error.',
            error: err.message
        });
    }
});

module.exports = router;
