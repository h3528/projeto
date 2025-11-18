// models/taskModel.js

const getAllTasks = async (db) => {
  return await db('tasks').select('*');
};

const getTaskById = async (db, id) => {
  return await db('tasks').where({ id }).first();
};

const createTask = async (db, task) => {
  const [newTaskId] = await db('tasks').insert(task);
  return await getTaskById(db, newTaskId);
};

const updateTask = async (db, id, updatedTask) => {
  const result = await db('tasks').where({ id }).update(updatedTask);
  if (result) {
    return await getTaskById(db, id);
  }
  return null; // Caso a tarefa não exista
};

const deleteTask = async (db, id) => {
  const result = await db('tasks').where({ id }).del();
  return result; // Retorna 1 se a tarefa foi deletada, 0 caso contrário
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
