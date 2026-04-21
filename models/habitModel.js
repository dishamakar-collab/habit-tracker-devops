const fs = require('fs');

const FILE = 'data.json';

// Helper to read data
const readData = () => {
const data = fs.readFileSync(FILE);
return JSON.parse(data);
};

// Helper to write data
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
id: Number(newHabit.id), // ensure number
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
let habits = readData();

const numId = Number(id);

const newHabits = habits.filter(habit => habit.id !== numId);

writeData(newHabits);
};

// UPDATE habit
const updateHabit = (id, updatedData) => {
let habits = readData();

const numId = Number(id);

habits = habits.map(habit => {
if (habit.id === numId) {

```
  // update fields safely
  if (updatedData.name !== undefined) {
    habit.name = updatedData.name;
  }

  if (updatedData.completed !== undefined) {
    // increase streak only when marking true
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

writeData(habits);
};

module.exports = {
getAllHabits,
addHabit,
deleteHabit,
updateHabit
};
