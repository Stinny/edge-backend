import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB connection: ' + chalk.green.bold('Success'));
  } catch (err) {
    console.log('DB connection: ' + chalk.red.bold('Failed'));
    process.exit(1);
  }
};

export default connectToDB;
