const express = require('express');
const userRouter = require('./routers/userRouter');
const userLogRouter = require('./routers/userLogRouter');
const eventRouter =  require('./routers/eventRouter');
const membersRouter =  require('./routers/membersRouter');
const attendanceRouter = require('./routers/attendanceRouter');
const dotenv = require('dotenv');
const connect = require('./db');

const app = express();

dotenv.config({ path: './config/config.env' });

connect();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/userLogs', userLogRouter);
app.use('/api/events', eventRouter)
app.use('/api/members',membersRouter);
app.use('/api/attendance', attendanceRouter);


// ERROR HANDLING
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send({
    errorMessage: err.message,
    errorStack: err.stack
  });
});

app.listen(4000, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`);
});
