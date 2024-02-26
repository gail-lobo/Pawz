const mongoose = require('mongoose');

const connectionStr = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(connectionStr, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

  mongoose.connection.on('error', err => {
    console.log(err)
  })