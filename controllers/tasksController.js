// controllers/tasksController.js

const getTasks = async (db) => {
  return await db('tasks').select('*');
};

const getTaskById = async (db, id) => {
  return await db('tasks').where({ id }).first();
};

const createTask = async (db, task) => {
  return await db('tasks').insert(task);
};

const updateTask = async (db, id, task) => {
  return await db('tasks').where({ id }).update(task);
};

const deleteTask = async (db, id) => {
  return await db('tasks').where({ id }).del();
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
