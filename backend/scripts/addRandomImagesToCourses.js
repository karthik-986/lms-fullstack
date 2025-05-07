import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/course.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms';

const randomImages = [
  {
    public_id: 'random1',
    secure_url: 'https://source.unsplash.com/random/400x300?sig=1'
  },
  {
    public_id: 'random2',
    secure_url: 'https://source.unsplash.com/random/400x300?sig=2'
  },
  {
    public_id: 'random3',
    secure_url: 'https://source.unsplash.com/random/400x300?sig=3'
  },
  {
    public_id: 'random4',
    secure_url: 'https://source.unsplash.com/random/400x300?sig=4'
  },
  {
    public_id: 'random5',
    secure_url: 'https://source.unsplash.com/random/400x300?sig=5'
  }
];

async function addRandomImages() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const courses = await Course.find({});
    for (const course of courses) {
      const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
      course.thumbnail.public_id = randomImage.public_id;
      course.thumbnail.secure_url = randomImage.secure_url;
      // Ensure createdBy is preserved
      if (!course.createdBy) {
        course.createdBy = 'admin'; // fallback value if missing
      }
      await course.save();
      console.log(`Updated course ${course.title} with random image`);
    }

    console.log('All courses updated with random images');
    process.exit(0);
  } catch (error) {
    console.error('Error updating courses:', error);
    process.exit(1);
  }
}

addRandomImages();
