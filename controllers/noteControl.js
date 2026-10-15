import Note from '../models/Note.js';
import User from '../models/User.js';

const getForSite = async (req, res) => {
  try {
    const notes = await Note.find({ siteId: req.params.siteId }).sort({ createdAt: -1 });
    return res.json(notes);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name');
    if (!user) return res.status(404).json('User not found');

    const note = new Note({
      siteId:     req.body.siteId,
      content:    req.body.content,
      authorId:   req.user.id,
      authorName: user.name || 'Unknown',
    });
    const saved = await note.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const update = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: { content: req.body.content } },
      { new: true }
    );
    if (!note) return res.status(404).json('Note not found');
    return res.json(note);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const remove = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json('Note not found');
    return res.json('Note deleted');
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

export default { getForSite, create, update, remove };
