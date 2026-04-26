import mongoose from 'mongoose';

/**
 * Movie Schema
 */
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    duration: {
      type: Number, // in minutes
      required: [true, 'Please add duration in minutes'],
    },
    genre: [String],
    poster: {
      type: String,
      default: 'no-photo.jpg',
    },
    releaseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
