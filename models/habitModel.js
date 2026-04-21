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

// ADD new habit
const addHabit = (newHabit) => {
const habits = readData();

const habit = {
id: Number(newHabit.id),
name: newHabit.name || "Unnamed",
completed: newHabit.completed ?? false,
streak: newHabit.streak ?? 0
};

habits.push(habit);
writeData(habits);

return habit;
};

// DELETE habit
const deleteHabit = (id) => {
const habits = readData();
const numId = Number(id);

const updated = habits.filter(h => h.id !== numId);

writeData(updated);
};

// UPDATE habit
const updateHabit = (id, updatedData) => {
const habits = readData();
const numId = Number(id);

const updated = habits.map(habit => {
if (habit.id === numId) {

```
  if (updatedData.name !== undefined) {
    habit.name = updatedData.name;
  }

  if (updatedData.completed !== undefined) {
    if (updatedData.completed === true && habit.completed === false) {
      habit.streak = (habit.streak || 0) + 1;
    }
    habit.completed = updatedData.completed;
  }

  if (updatedData.streak !== undefined) {
    habit.streak = updatedData.streak;
  }
}
return habit;
```

});

writeData(updated);
};

module.exports = {
getAllHabits,
addHabit,
deleteHabit,
updateHabit
};
