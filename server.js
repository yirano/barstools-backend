require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nbaRoutes = require('./routes/nba');
const mlbRoutes = require('./routes/mlb');
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());

app.use('/api/nba', nbaRoutes);
app.use('/api/mlb', mlbRoutes);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.error("MongoDB connection failed:", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  mongoose.disconnect(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});