import express from 'express';
import { getSeats, getTrendingMovies } from '../movie/movie.service.js';
import { bookSeat, getUserBookings } from '../booking/booking.service.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// GET /seats
router.get('/', async (req, res, next) => {
  try {
    const seats = await getSeats();
    res.json(seats);
  } catch (error) {
    next(error);
  }
});

// GET /seats/trending
router.get('/trending', async (req, res, next) => {
  try {
    const movies = await getTrendingMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// GET /seats/my-bookings
router.get('/my-bookings', protect, async (req, res, next) => {
  try {
    const bookings = await getUserBookings(req.user._id);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// PUT /seats/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const booking = await bookSeat(req.user._id, req.params.id);
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
});

export default router;
