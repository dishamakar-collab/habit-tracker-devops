const fs = require('fs');

const FILE = 'data.json';

// Read data safely
const readData = () => {
  try {
    const data = fs.readFileSync(FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

// Write data safely
const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// GET all habits
const getAllHabits = () => {
  return readData();
};

// ADD habit
const addHabit = (newHabit) => {
  const habits = readData();

  const habit = {
    id: Number(newHabit.id),
    name: newHabit.name || "Unnamed",
    completed: newHabit.completed ?? false,
    streak: 0
  };

  habits.push(habit);
  writeData(habits);

  return habit;
};

// DELETE habit
const deleteHabit = (id) => {
  const habits = readData();
  const updated = habits.filter(h => h.id !== Number(id));
  writeData(updated);
};

// UPDATE habit (with streak logic)
const updateHabit = (id, updatedData) => {
  const habits = readData();

  const updated = habits.map(habit => {
    if (habit.id === Number(id)) {
      return { ...habit, ...updatedData };
    }
    return habit;
  });

  writeData(updated);
};

module.exports = {
  getAllHabits,
  addHabit,
  deleteHabit,
  updateHabit
};
