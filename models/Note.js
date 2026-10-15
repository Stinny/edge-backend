import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    siteId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    content:    { type: String, required: true },
    authorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    authorName: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', NoteSchema);

export default Note;
