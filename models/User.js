import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    password: { type: String },
    role: { type: String, default: 'technician' },
    isAdmin: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.genAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SEC, { expiresIn: '15m' });
};

UserSchema.methods.genRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_SEC, { expiresIn: '24h' });
};

const User = mongoose.model('User', UserSchema);

export default User;
