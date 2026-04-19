const express = require('express');
const app = express();

const habitRoutes = require('./routes/habits');

const PORT = 3000;

app.use(express.json());
app.use('/habits', habitRoutes);

// 👉 EXPORT app (IMPORTANT)
module.exports = app;

// 👉 ONLY run server if NOT testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}