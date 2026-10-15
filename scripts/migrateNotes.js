import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Site from '../models/Site.js';
import Note from '../models/Note.js';
import User from '../models/User.js';

await mongoose.connect(process.env.DB_URL);

// Use the first admin user as the migration author; fall back to any user
const author =
  (await User.findOne({ isAdmin: true }).select('_id name')) ||
  (await User.findOne().select('_id name'));

if (!author) {
  console.error('No users found — run addUser.js first');
  process.exit(1);
}

const sites = await Site.find({
  $or: [
    { notesOne: { $exists: true, $ne: '' } },
    { notesTwo: { $exists: true, $ne: '' } },
  ],
}).select('_id customer notesOne notesTwo');

if (!sites.length) {
  console.log('No sites with legacy notes found.');
  process.exit(0);
}

let created = 0;

for (const site of sites) {
  const label = site.customer || site._id.toString();

  for (const [field, content] of [
    ['notesOne', site.notesOne],
    ['notesTwo', site.notesTwo],
  ]) {
    if (!content || !content.trim()) continue;

    await Note.create({
      siteId: site._id,
      content: content.trim(),
      authorId: author._id,
      authorName: author.name || 'Admin',
    });

    console.log(`  [${label}] migrated ${field}`);
    created++;
  }
}

console.log(`\nDone — ${created} note(s) created from ${sites.length} site(s).`);
process.exit(0);
