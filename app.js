const express = require('express');
const app = express();

const habitRoutes = require('./routes/habits');

const PORT = process.env.PORT || 3000;  // ✅ FIXED for Render

app.use(express.json());

// ✅ ADD THIS LINE (serve static files like index.html)
app.use(express.static(__dirname));

app.use('/habits', habitRoutes);

// ✅ OPTIONAL (but recommended)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 👉 EXPORT app (IMPORTANT)
module.exports = app;

// 👉 ONLY run server if NOT testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
