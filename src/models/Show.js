import mongoose from 'mongoose';

/**
 * Show Schema
 * Represents a specific movie screening at a theater
 */
const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    theater: {
      type: String,
      required: [true, 'Please add a theater name'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please add a start time'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    totalSeats: {
      type: Number,
      default: 100,
    },
    availableSeats: [Number], // Array of available seat numbers
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model('Show', showSchema);
export default Show;
