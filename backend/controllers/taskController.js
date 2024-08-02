const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  try {
    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      status,
      priority,
      deadline
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch tasks' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
};
