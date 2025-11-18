// routes/tasksRoutes.js
const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const tasks = await tasksController.getTasks(db);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const task = await tasksController.getTaskById(db, req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  });

  router.post('/', async (req, res) => {
    const { title, description, status } = req.body;
    try {
      const newTask = { title, description, status };
      await tasksController.createTask(db, newTask);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  });

  router.put('/:id', async (req, res) => {
    const { title, description, status } = req.body;
    try {
      const updatedTask = { title, description, status };
      const result = await tasksController.updateTask(db, req.params.id, updatedTask);
      if (!result) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const result = await tasksController.deleteTask(db, req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });

  return router;
};
