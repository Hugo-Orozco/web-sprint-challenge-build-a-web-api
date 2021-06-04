// Write your "actions" router here!
const express = require('express');

const actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await actions.get();
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
        const data = await actions.get(id);
        if (!data) {
            res.status(404).json({
                message: 'The action was not found.'
            });
        }
        else {
            res.json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
            error: err.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        if (!body.project_id || !body.description || !body.notes) {
            res.status(400).json({
                message: 'Invalid body, project id, name, and description must be included.'
            });
        }
        else {
            const data = await actions.insert(body);
            res.status(201).json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
            error: err.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (!body.project_id || !body.description || !body.notes) {
            return res.status(400).json({
                message: 'Invalid body, project id, name, and description must be included.'
            });
        }
        const data = await actions.update(id, body);
        if (!data) {
            res.status(404).json({
                message: 'The action was not found.'
            });
        }
        else {
            res.json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
            error: err.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await actions.get(id);
        const data = await actions.remove(id);
        if (!data) {
            res.status(404).json({
                message: 'The action was not found.'
            });
        }
        else {
            res.json(deleted);
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
            error: err.message
        });
    }
});

module.exports = router;
