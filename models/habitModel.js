const fs = require('fs');

// GET all habits
const getAllHabits = () => {
const data = fs.readFileSync('data.json');
return JSON.parse(data);
};

// ADD new habit
const addHabit = (newHabit) => {
const data = fs.readFileSync('data.json');
const habits = JSON.parse(data);

newHabit.streak = 0;

habits.push(newHabit);

fs.writeFileSync('data.json', JSON.stringify(habits, null, 2));
};

// DELETE habit
const deleteHabit = (id) => {
const data = fs.readFileSync('data.json');
let habits = JSON.parse(data);

habits = habits.filter(habit => habit && habit.id != id);

fs.writeFileSync('data.json', JSON.stringify(habits, null, 2));
};

// UPDATE habit
const updateHabit = (id, updatedData) => {
const data = fs.readFileSync('data.json');
let habits = JSON.parse(data);

habits = habits.map(habit => {
if (habit && habit.id == id) {

```
  if (updatedData.completed === true) {
    habit.streak = (habit.streak || 0) + 1;
  }

  return { ...habit, ...updatedData };
}
return habit;
```

});

fs.writeFileSync('data.json', JSON.stringify(habits, null, 2));
};

module.exports = {
getAllHabits,
addHabit,
deleteHabit,
updateHabit
};
