import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ email, pass, msg: 'User does not exist' });

    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword)
      return res.status(400).json({ email, pass, msg: 'Email or password invalid' });

    const accessToken = user.genAccessToken();
    const refreshToken = user.genRefreshToken();

    const { password, ...otherInfo } = user._doc;

    return res.json({ accessToken, refreshToken, userInfo: otherInfo, msg: 'Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json('Server error');
  }
};

const newAccessTkn = async (req, res) => {
  const { refreshTkn } = req.params;

  try {
    jwt.verify(refreshTkn, process.env.REFRESH_SEC, async (err, decoded) => {
      if (err) return res.status(401).json('Access denied');

      const user = await User.findById(decoded?.id);
      const accessToken = user.genAccessToken();

      return res.json({ tkn: accessToken });
    });
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ msg: 'Current password is incorrect' });

    const same = await bcrypt.compare(newPassword, user.password);
    if (same) return res.status(400).json({ msg: 'New password must be different' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({ msg: 'Password changed' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name } },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { password, ...otherInfo } = user._doc;
    return res.json({ userInfo: otherInfo, msg: 'Profile updated' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export default { login, newAccessTkn, changePassword, updateProfile };
