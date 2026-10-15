import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';

const EMAIL = 'admin@edgeauto.com';
const PASSWORD = 'Edge2094!@';
const NAME = 'Admin User';
const ROLE = 'admin'; // 'admin' | 'technician'

await mongoose.connect(process.env.DB_URL);

const existing = await User.findOne({ email: EMAIL });
if (existing) {
  console.log(`User ${EMAIL} already exists`);
  process.exit(0);
}

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(PASSWORD, salt);

const user = new User({ email: EMAIL, password: hash, name: NAME, role: ROLE });
await user.save();

console.log(`Created user: ${EMAIL} / ${PASSWORD}`);
process.exit(0);
