const express = require('express');
const router = express.Router();

const {
getAllHabits,
addHabit,
deleteHabit,
updateHabit
} = require('../models/habitModel');

// GET all habits
router.get('/', (req, res) => {
const habits = getAllHabits();
res.json(habits);
});

// POST new habit
router.post('/', (req, res) => {
const newHabit = req.body;
addHabit(newHabit);
res.json({ message: 'Habit added successfully' });
});

// DELETE habit
router.delete('/:id', (req, res) => {
const id = req.params.id;
deleteHabit(id);
res.json({ message: 'Habit deleted successfully' });
});

// UPDATE habit
router.put('/:id', (req, res) => {
const id = req.params.id;
const updatedData = req.body;

updateHabit(id, updatedData);

res.json({ message: 'Habit updated successfully' });
});

module.exports = router;
