require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));


// Routes
app.get('/', (req, res) => res.json({ message: 'Task App Backend Running!' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler
app.use(errorHandler);

// DB connect & sync
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

if (process.env.NODE_ENV !== 'production') {
  sequelize.sync({ alter: true })
    .then(() => console.log('DB synced'))
    .catch(err => console.error('DB sync error:', err));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


