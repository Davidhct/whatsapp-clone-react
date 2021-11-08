const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
// const messageRouter = require('./routes/messageRoutes');
const privateConvRouter = require('./routes/privateConvRoutes');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

// app.use((req, res, next) => {
//   req.requetTime = new Date().toISOString();
//   next();
// });

//3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/conversations', conversationRouter);
// app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/private', privateConvRouter);

// 4) START SERVER

module.exports = app;
