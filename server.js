const mongoose = require('mongoose');
const app = require('./app');

// const { DB_HOST } = process.env;
mongoose.set('strictQuery', true);

const DB_HOST =
  'mongodb+srv://project-BE7v6c5s:BE7v6c5s@cluster0.u2sazxy.mongodb.net/PetsShop?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
