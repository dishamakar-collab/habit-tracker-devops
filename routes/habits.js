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
const { name, completed, streak } = req.body;

if (!name) {
return res.status(400).json({ message: "Name is required" });
}

const newHabit = {
id: Date.now(), // ✅ UNIQUE ID
name,
completed: completed ?? false,
streak: streak ?? 0
};

addHabit(newHabit);

res.json(newHabit);
});

// DELETE habit
router.delete('/:id', (req, res) => {
const id = Number(req.params.id);

const habits = getAllHabits();
const exists = habits.find(h => h.id === id);

if (!exists) {
return res.status(404).json({ message: "Habit not found" });
}

deleteHabit(id);

res.json({ message: 'Habit deleted successfully' });
});

// UPDATE habit
router.put('/:id', (req, res) => {
const id = Number(req.params.id);
const { name, completed, streak } = req.body;

const habits = getAllHabits();
const habit = habits.find(h => h.id === id);

if (!habit) {
return res.status(404).json({ message: "Habit not found" });
}

const updatedData = {
...(name !== undefined && { name }),
...(completed !== undefined && { completed }),
...(streak !== undefined && { streak })
};

updateHabit(id, updatedData);

res.json({ message: 'Habit updated successfully' });
});

module.exports = router;
