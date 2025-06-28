const Task = require('../models/Task');

async function getTasks(req, res) {
  try {
    // מביא את כל המשימות מהמסד נתונים
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

async function addTask(req, res) {
  try {
    const { title } = req.body;
    
    // בדיקה שהכותרת קיימת ולא ריקה
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    // יצירת משימה חדשה
    const newTask = new Task({
      title: title.trim()
    });

    // שמירה במסד הנתונים
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
}

async function toggleTask(req, res) {
    try {
    const { id } = req.params;

    // מחפש את המשימה לפי ID
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // משנה את הסטטוס להפך
    task.done = !task.done;
    
    // שומר את השינוי
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({ error: 'Failed to toggle task' });
  }
}

async function deleteTask(req, res) {
  // TODO
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
